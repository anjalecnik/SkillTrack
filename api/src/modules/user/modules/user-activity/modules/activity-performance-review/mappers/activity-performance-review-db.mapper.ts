import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { IActivityRequestPerformanceReviewCreateRequest } from "../interfaces/activity-request-performance-review-create.interface"
import { IActivityPerformanceReviewCreateDBRequest } from "../interfaces/db/activity-performance-review-create-db.interface"
import { IActivityRequestPerformanceReviewCreateDBRequest } from "../interfaces/db/activity-request-performance-review-create-db.interface"

export abstract class ActivityPerformanceReviewDBMapper {
	static createActivityRequest(createActivityRequest: IActivityRequestPerformanceReviewCreateRequest): {
		activityRequest: IActivityRequestPerformanceReviewCreateDBRequest
		activity: IActivityPerformanceReviewCreateDBRequest
	} {
		const activityRequest: IActivityRequestPerformanceReviewCreateDBRequest = {
			userId: createActivityRequest.userId,
			reportedByUserId: createActivityRequest.reportedByUserId,
			activityType: createActivityRequest.activityType,
			dateStart: createActivityRequest.dateStart,
			status: UserActivityStatus.Approved
		}

		const activity: IActivityPerformanceReviewCreateDBRequest = {
			userId: createActivityRequest.userId,
			reportedByUserId: createActivityRequest.reportedByUserId,
			activityType: UserActivityType.PerformanceReview,
			date: createActivityRequest.dateStart,
			status: UserActivityStatus.Approved
		}

		return { activityRequest, activity }
	}
}
