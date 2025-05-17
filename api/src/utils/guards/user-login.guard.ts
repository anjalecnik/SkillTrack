/* eslint-disable @typescript-eslint/only-throw-error */
import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { IAuthJwtPassportUserRequest } from "../../modules/auth/interfaces"

@Injectable()
export class UserLoginGuard extends AuthGuard("jwtUserLogin") implements CanActivate {
	constructor() {
		super()
	}

	handleRequest<JWTPassportUser = IAuthJwtPassportUserRequest>(err: unknown, reqUser: JWTPassportUser): JWTPassportUser {
		if (err || !reqUser) {
			throw err || new UnauthorizedException()
		}
		return reqUser
	}
}
