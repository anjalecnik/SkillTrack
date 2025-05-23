import { Injectable } from "@nestjs/common"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserRole } from "src/utils/types/enums/user-role.enum"

const UserType: Record<UserActivityStatus, UserActivityRequestActions[]> = {
	[UserActivityStatus.PendingApproval]: [UserActivityRequestActions.Cancel],
	[UserActivityStatus.Approved]: [UserActivityRequestActions.Cancel],
	[UserActivityStatus.Canceled]: [],
	[UserActivityStatus.Rejected]: []
}

const SubordinateType: Record<UserActivityStatus, UserActivityRequestActions[]> = {
	[UserActivityStatus.PendingApproval]: [UserActivityRequestActions.Approve, UserActivityRequestActions.Reject],
	[UserActivityStatus.Approved]: [],
	[UserActivityStatus.Canceled]: [],
	[UserActivityStatus.Rejected]: []
}

const AdminType: Record<UserActivityStatus, UserActivityRequestActions[]> = {
	[UserActivityStatus.PendingApproval]: [UserActivityRequestActions.Approve, UserActivityRequestActions.Reject, UserActivityRequestActions.Cancel],
	[UserActivityStatus.Approved]: [UserActivityRequestActions.Cancel],
	[UserActivityStatus.Canceled]: [],
	[UserActivityStatus.Rejected]: []
}

type IUserActionType = "Admin" | "SelfSuperior" | "RegularUser" | "Reviewer" | "None"

@Injectable()
export class ActivitySharedRequestActionsService {
	constructor(private readonly utilityService: UtilityService) {}

	private getUserTypeSelf(UserEntity: UserEntity): IUserActionType {
		if (UserEntity.managerId === null || UserEntity.managerId === UserEntity.id) return "SelfSuperior"
		return "RegularUser"
	}

	private async getUserTypeForRequest(
		userInvokerEntity: UserEntity,
		currentType: IUserActionType,
		activityRequest: Pick<UserActivityRequestEntity, "userId" | "activityType">,
		subordinateIds: number[]
	): Promise<IUserActionType> {
		if (userInvokerEntity.id === activityRequest.userId) return currentType

		if (subordinateIds.includes(activityRequest.userId)) {
			return "Reviewer"
		}

		return "None"
	}

	async getUserType(
		userInvoker: number | UserEntity,
		activityRequest: Pick<UserActivityRequestEntity, "userId" | "activityType">,
		subordinateIds: number[]
	): Promise<IUserActionType> {
		const userInvokerEntity = typeof userInvoker === "number" ? await this.utilityService.getUserById(userInvoker) : userInvoker

		if ([UserRole.Admin, UserRole.Owner].includes(userInvokerEntity.role)) return "Admin"

		const invokerUserTypeSelf = this.getUserTypeSelf(userInvokerEntity)
		const invokerUserType = await this.getUserTypeForRequest(userInvokerEntity, invokerUserTypeSelf, activityRequest, subordinateIds)

		return invokerUserType
	}

	async getActivityRequestActions(
		userInvoker: number | UserEntity,
		activityRequest: Pick<UserActivityRequestEntity, "userId" | "activityType" | "status">,
		subordinateIds: number[]
	): Promise<UserActivityRequestActions[]> {
		// TODO look for activity type
		const currentActivityStatus = activityRequest.status
		const invokerUserType = await this.getUserType(userInvoker, activityRequest, subordinateIds)

		switch (invokerUserType) {
			case "Admin":
				return AdminType[currentActivityStatus]
			case "SelfSuperior":
				return [...UserType[currentActivityStatus], ...SubordinateType[currentActivityStatus]]
			case "RegularUser":
				return [...UserType[currentActivityStatus]]
			case "Reviewer":
				return SubordinateType[currentActivityStatus]
			default:
				return []
		}
	}
}
