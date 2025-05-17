import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { UtilityService } from "src/modules/utility/services/utility.service"

@Injectable()
export class UserSelfOrManagerGuard extends AuthGuard("jwtUser") implements CanActivate {
	constructor(private readonly utilityService: UtilityService) {
		super()
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		await super.canActivate(context)
		const request = context.switchToHttp().getRequest()

		const userId = parseInt(request.params.userId)
		const invokerUserId = request.user.id

		if (userId === invokerUserId) {
			return true
		}

		const subordinateIds = await this.utilityService.getSubordinateIdsRecursively(invokerUserId, new Set())

		if (subordinateIds.includes(userId)) {
			return true
		}

		return false
	}
}
