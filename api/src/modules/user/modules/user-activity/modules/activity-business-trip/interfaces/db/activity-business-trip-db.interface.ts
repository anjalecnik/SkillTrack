import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { RequiredNotNull } from "src/utils/types/interfaces"

export interface IActivityBusinessTripDB
	extends RequiredNotNull<
			Pick<UserActivityEntity, "id" | "status" | "date" | "createdAt" | "updatedAt" | "hours" | "userId" | "reportedByUserId" | "activityRequestId" | "projectId">
		>,
		Partial<Pick<UserActivityEntity, "reportedByUser" | "reviewedByUserId" | "reviewedByUser" | "activityRequest" | "user" | "project">> {
	activityType: UserActivityType.BusinessTrip
}
