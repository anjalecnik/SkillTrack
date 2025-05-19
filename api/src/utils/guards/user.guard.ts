import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException, mixin, Type } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { UserRole } from "../types/enums/user-role.enum"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"

export function UserGuard(...roles: UserRole[]): Type<CanActivate> {
	const JwtAuthGuard = AuthGuard("jwtUser")

	@Injectable()
	class UserGuardMixin extends JwtAuthGuard {
		handleRequest<ReqUser extends IAuthJwtPassportUserRequest = IAuthJwtPassportUserRequest>(err: unknown, reqUser: ReqUser): ReqUser {
			if (err || !reqUser || !reqUser.user) {
				throw err || new UnauthorizedException()
			}

			if (roles.length > 0 && !roles.includes(reqUser.user.role)) {
				throw new ForbiddenException("You do not have the required role for this action", `User does not have required role: ${reqUser.user.role}`)
			}

			return reqUser
		}
	}

	return mixin(UserGuardMixin)
}
