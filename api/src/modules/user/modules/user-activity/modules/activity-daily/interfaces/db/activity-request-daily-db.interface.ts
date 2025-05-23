import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { RequiredNotNull } from "src/utils/types/interfaces"

export interface IActivityRequestDailyDB
	extends RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "userId" | "reportedByUserId" | "dateStart" | "status" | "createdAt" | "updatedAt">>,
		Partial<Pick<UserActivityRequestEntity, "description" | "userActivities" | "reviewedByUserId">> {
	activityType: UserActivityType.Daily
}
