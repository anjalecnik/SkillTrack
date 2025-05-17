/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt"
import { IAuthJwtPassportUserRequest, IAuthJwtPayload } from "../interfaces"
import { AuthMapper } from "../mappers/auth.mapper"
import { AuthUserService } from "../services/auth-user.service"
import { Config } from "src/utils/config/config"

@Injectable()
export class JwtWorkspaceUserStrategy extends PassportStrategy(Strategy, "jwtUser") {
	constructor(private readonly authUserService: AuthUserService) {
		super({
			ignoreExpiration: false,
			secretOrKey: Config.get<string>("JWT_SECRET_KEY"),
			passReqToCallback: true
		})
	}

	/**
	 * @override Overrides express/fastify Request object and adds user property of AuthPassportWorkspaceUserRequest
	 */
	async validate(payload: IAuthJwtPayload): Promise<IAuthJwtPassportUserRequest> {
		await this.authUserService.validateIsValidTokenJwtPayload(payload)

		return AuthMapper.mapAuthPassportUserRequestFromPayload(payload)
	}
}
