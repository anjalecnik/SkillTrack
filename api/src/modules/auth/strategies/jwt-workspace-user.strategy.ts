import { BadRequestException, Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthMapper } from "../mappers/auth.mapper"
import { AuthUserService } from "../services/auth-user.service"
import { Config } from "src/utils/config/config"
import { IAuthJwtPassportUserRequest, IAuthJwtPayload } from "../interfaces"

interface RequestParams {
	params?: {
		workspaceId: string
	}
}

@Injectable()
export class JwtWorkspaceUserStrategy extends PassportStrategy(Strategy, "jwtUser") {
	constructor(private readonly authUserService: AuthUserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: Config.get<string>("JWT_SECRET_KEY"),
			passReqToCallback: true
		})
	}

	/**
	 * @override Overrides express/fastify Request object and adds user property of AuthPassportUserRequest
	 */
	async validate(req: Request, payload: IAuthJwtPayload): Promise<IAuthJwtPassportUserRequest> {
		const workspaceId = this.getWorkspaceIdFromRequest(req)
		await this.authUserService.validateIsValidTokenJwtPayload(payload)
		return AuthMapper.mapAuthPassportUserRequestFromPayload(payload)
	}

	private getWorkspaceIdFromRequest<R extends Request & RequestParams>(req: R): number {
		// Unsafe assumption of workspace id in parameters (in that case the guard in in the wrong place or there is a typo in parameters)
		const params = req.params
		if (!params) throw new BadRequestException("Invalid request", "Request parameters are missing or undefined")
		if (!params.workspaceId) throw new BadRequestException("Invalid request", "The workspaceId parameter is required but was not provided in the request")
		return parseInt(params.workspaceId)
	}
}
