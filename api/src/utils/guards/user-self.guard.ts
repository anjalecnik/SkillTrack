import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class UserSelfGuard extends AuthGuard("jwtUser") implements CanActivate {
	constructor() {
		super()
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		await super.canActivate(context)
		const request = context.switchToHttp().getRequest()

		const userId = parseInt(request.params.userId)

		return request.user.id === userId
	}
}
