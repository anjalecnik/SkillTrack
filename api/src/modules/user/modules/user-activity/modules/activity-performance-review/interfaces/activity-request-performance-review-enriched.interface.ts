import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum"
import { IPerformanceReview } from "../../../dtos/response/user-activity-performance-review.response"
import { IActivityRequestPerformanceReviewDB } from "./db/activity-request-performance-review-db.interface"

export interface IActivityRequestPerformanceReviewEntityEnriched extends IActivityRequestPerformanceReviewDB {
	id: number
	name: string
	surname: string
	email: string
	scores: IPerformanceReview[]
	actions?: UserActivityRequestActions[]
}

export interface IActivityPerformanceReviewEntityEnriched extends IActivityRequestPerformanceReviewDB {
	actions: UserActivityRequestActions[]
}
