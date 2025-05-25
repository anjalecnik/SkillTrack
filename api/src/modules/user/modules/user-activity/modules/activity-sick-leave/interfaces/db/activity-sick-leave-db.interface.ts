import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { RequiredNotNull } from "src/utils/types/interfaces"

export interface IActivitySickLeaveDB
	extends RequiredNotNull<Pick<UserActivityEntity, "id" | "status" | "date" | "createdAt" | "updatedAt" | "userId" | "reportedByUserId" | "activityRequestId" | "hours">>,
		Partial<Pick<UserActivityEntity, "reportedByUser" | "activityRequest" | "user">> {
	activityType: UserActivityType.SickLeave
}
