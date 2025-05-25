import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { RequiredNotNull } from "src/utils/types/interfaces"

export interface IActivityRequestSickLeaveDB
	extends RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "userId" | "reportedByUserId" | "status" | "dateStart" | "dateEnd" | "createdAt" | "updatedAt" | "hours">>,
		Partial<Pick<UserActivityRequestEntity, "description" | "userActivities">> {
	activityType: UserActivityType.SickLeave
}
