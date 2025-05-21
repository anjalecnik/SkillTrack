import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { UtilityService } from "src/modules/utility/services/utility.service"

@Injectable()
export class UserManagerGuard extends AuthGuard("jwtUser") implements CanActivate {
	constructor(private readonly utilityService: UtilityService) {
		super()
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		await super.canActivate(context)

		const request = context.switchToHttp().getRequest()
		const paramUserId = parseInt(request.params.userId)
		let userIds: number[] = []

		if (!isNaN(paramUserId)) {
			userIds = [paramUserId]
		} else {
			userIds = request.query?.userIds?.map(Number) || request.body?.userIds?.map(Number)

			if (!userIds) {
				return false
			}
		}

		const invokerId = request.user.id

		const subordinateIds = await this.utilityService.getSubordinateIdsRecursively(invokerId, new Set())

		const allAreSubordinates = userIds.every(id => subordinateIds.includes(id))

		if (allAreSubordinates) {
			return true
		}

		const isSelfSuperior = await this.utilityService.isUserSelfSuperior(invokerId)

		return isSelfSuperior && userIds.includes(invokerId)
	}
}
