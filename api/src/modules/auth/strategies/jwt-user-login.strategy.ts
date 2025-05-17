/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { IAuthJwtPassportUserRequest, IAuthJwtPayload } from "../interfaces"
import { AuthMapper } from "../mappers/auth.mapper"
import { AuthUserService } from "../services/auth-user.service"
import { Config } from "src/utils/config/config"

@Injectable()
export class JwtUserLoginStrategy extends PassportStrategy(Strategy, "jwtUserLogin") {
	constructor(private readonly authUserService: AuthUserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: Config.get<string>("JWT_SECRET_KEY")
		})
	}

	/**
	 * @override Overrides express/fastify Request object and adds user property type of AuthPassportUserRequest
	 */
	async validate(payload: IAuthJwtPayload): Promise<IAuthJwtPassportUserRequest> {
		await this.authUserService.validateIsValidTokenJwtPayload(payload)
		return AuthMapper.mapAuthPassportUserRequestFromPayload(payload)
	}
}
