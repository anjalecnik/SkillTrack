/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserEntity } from "../../../libs/db/entities/user.entity"
import { IAuthJwtPayload, IAuthJwtRefreshPayload } from "../interfaces"
import { AuthMapper } from "../mappers/auth.mapper"
import { Config } from "src/utils/config/config"

@Injectable()
export class AuthJwtService {
	constructor(private readonly jwtService: JwtService) {}

	signAccessJwt(uuid: string, user: UserEntity): string {
		return this.jwtService.sign(AuthMapper.mapSignAuthJwtAccessToken(uuid, user), {
			secret: Config.get<string>("JWT_SECRET_KEY"),
			expiresIn: Config.get<string>("JWT_EXPIRE_TIME")
		})
	}

	signRefreshJwt(uuid: string, user: UserEntity): string {
		return this.jwtService.sign(AuthMapper.mapSignAuthJwtRefreshToken(uuid, user), {
			secret: Config.get<string>("JWT_REFRESH_SECRET_KEY"),
			expiresIn: Config.get<string>("JWT_REFRESH_EXPIRE_TIME")
		})
	}

	decodeRefreshJwt<T extends IAuthJwtRefreshPayload>(token: string): T | null {
		return this.jwtService.decode(token) as T | null
	}

	decodeAuthJwt<T extends IAuthJwtPayload>(token: string): T | null {
		return this.jwtService.decode(token) as T | null
	}
}
