import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { RequiredNotNull } from "src/utils/types/interfaces"

export interface IActivityRequestPerformanceReviewDB
	extends RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "userId" | "reportedByUserId" | "status" | "dateStart" | "createdAt" | "updatedAt">>,
		Partial<Pick<UserActivityRequestEntity, "projectId" | "project" | "userActivities" | "reviewedByUserId">> {
	activityType: UserActivityType.PerformanceReview
}
