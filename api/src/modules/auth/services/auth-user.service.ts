/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { Cache } from "cache-manager"
import { OAuth2Client } from "google-auth-library"
import _ from "lodash"
import * as ms from "ms"
import { v4 as uuidv4 } from "uuid"
import { UserEntity } from "../../../libs/db/entities/user.entity"
import { AuthUserGoogleLoginRequest } from "../dtos/request/auth-user-google-login.request"
import { AuthUserRefreshTokenRequest } from "../dtos/request/auth-user-refresh-token.request"
import { AuthSignedJwtResponse } from "../dtos/response/auth-signed-jwt.response"
import { IAuthJwtPayload } from "../interfaces"
import { AuthRepository } from "../repository/auth.repository"
import { AuthJwtService } from "./auth-jwt.service"
import { Config } from "src/utils/config/config"
import { CacheHelper } from "src/utils/helpers/cache.helper"
import { RedisHelper } from "src/utils/helpers/redis.helper"

@Injectable()
export class AuthUserService {
	private readonly googleAuth: OAuth2Client = new OAuth2Client({
		clientId: Config.get<string>("GOOGLE_CLIENT_ID"),
		clientSecret: Config.get<string>("GOOGLE_CLIENT_SECRET")
	})

	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly authRepository: AuthRepository,
		private readonly authJwtService: AuthJwtService
	) {}

	async googleLogin({ idToken }: AuthUserGoogleLoginRequest): Promise<AuthSignedJwtResponse> {
		const authResponse = await this.googleAuth.verifyIdToken({ idToken }).catch(() => {
			throw new UnauthorizedException("Invalid google  idToken")
		})
		const payload = authResponse.getPayload()
		if (!payload || !payload.email) throw new UnauthorizedException(`Something went wrong, please try again later`)
		const user = await this.authRepository.getOrCreateUserByEmail(payload.email)

		return this.createTokenPair(user)
	}

	async utilizeRefreshToken({ refreshToken }: AuthUserRefreshTokenRequest): Promise<AuthSignedJwtResponse> {
		const refreshTokenDecoded = this.authJwtService.decodeRefreshJwt(refreshToken)
		if (!refreshTokenDecoded) throw new UnauthorizedException("Invalid refresh token")
		if (!refreshTokenDecoded.userId && !refreshTokenDecoded.uuid)
			throw new UnauthorizedException("Invalid refresh token", "Refresh token is missing required fields (userId or UUID)")
		const cachedToken = await this.cacheManager.get(`${CacheHelper.getPathJwtRefreshToken(refreshTokenDecoded.userId, refreshTokenDecoded.uuid)}`)
		if (!cachedToken)
			throw new UnauthorizedException(
				"Invalid or expired refresh token",
				`No cached token found for user ID: '${refreshTokenDecoded.userId}' and UUID:'${refreshTokenDecoded.uuid}'`
			)
		const userEntity = await this.authRepository.getUserById(refreshTokenDecoded.userId)
		if (!userEntity) throw new UnauthorizedException("User account not found", `No user found with ID: '${refreshTokenDecoded.userId}'`)

		await CacheHelper.invalidateRefreshToken(this.cacheManager, refreshTokenDecoded.userId, refreshTokenDecoded.uuid)
		await CacheHelper.invalidateAccessToken(this.cacheManager, refreshTokenDecoded.userId, refreshTokenDecoded.uuid)
		return this.createTokenPair(userEntity)
	}

	async validateIsValidTokenJwtPayload(payload: IAuthJwtPayload): Promise<void> {
		if (!payload?.user?.email) throw new UnauthorizedException("User is not logged in", "User email missing from JWT payload")
		if (!payload?.uuid) throw new UnauthorizedException("Invalid authentication token", "UUID missing from JWT payload")
		const savedToken = await this.cacheManager.get<string>(CacheHelper.getPathJwtAccessToken(payload.user.id, payload.uuid))
		if (!savedToken) throw new UnauthorizedException("Authentication session expired", `No saved token found for user ID: '${payload.user.id}'`)
		if (!_.isEqual(this.authJwtService.decodeAuthJwt(savedToken), payload))
			throw new UnauthorizedException("Invalid authentication token", "Mismatch between saved token data and provided payload")
	}

	private async createTokenPair(user: UserEntity): Promise<AuthSignedJwtResponse> {
		const uuid = uuidv4()
		const accessToken = this.authJwtService.signAccessJwt(uuid, user)
		const refreshToken = this.authJwtService.signRefreshJwt(uuid, user)

		const rawAccessTtl = Config.get<string>("JWT_EXPIRE_TIME") ?? "7d"
		const rawRefreshTtl = Config.get<string>("JWT_REFRESH_EXPIRE_TIME") ?? "30d"

		function parseMs(input: string, fallback: string): number {
			const parsed = ms(Number(input) || Number(fallback))
			if (typeof parsed !== "number") {
				throw new Error(`Invalid ms value: ${input}`)
			}
			return parsed
		}

		const accessTokenTTL = parseMs(rawAccessTtl, "7d")
		const refreshTokenTTL = parseMs(rawRefreshTtl, "30d")

		if (typeof accessTokenTTL !== "number" || typeof refreshTokenTTL !== "number") {
			throw new Error("Invalid TTL format")
		}

		await this.cacheManager.set(CacheHelper.getPathJwtAccessToken(user.id, uuid), accessToken, RedisHelper.setTTL(accessTokenTTL))
		await this.cacheManager.set(CacheHelper.getPathJwtRefreshToken(user.id, uuid), refreshToken, RedisHelper.setTTL(refreshTokenTTL))
		return {
			accessToken,
			refreshToken
		}
	}
}
