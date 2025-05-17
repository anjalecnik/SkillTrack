/* eslint-disable @typescript-eslint/only-throw-error */
import { CanActivate, ForbiddenException, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { UserRole } from "../types/enums/user-role.enum"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"

export const UserGuard = (...roles: UserRole[]) => new UserGuardAuth(roles)

class UserGuardAuth extends AuthGuard("jwtUser") implements CanActivate {
	constructor(private roles: UserRole[]) {
		super()
	}

	handleRequest<ReqUser extends IAuthJwtPassportUserRequest = IAuthJwtPassportUserRequest>(err: unknown, reqUser: ReqUser): ReqUser {
		if (err || !reqUser || !reqUser.user) {
			throw err || new UnauthorizedException()
		}

		if (this.roles.length > 0 && !this.roles.includes(reqUser.user.role)) {
			throw new ForbiddenException("You do not have the required role for this action", `User does not have requied role: ${reqUser.user.role}`)
		}

		return reqUser
	}
}
