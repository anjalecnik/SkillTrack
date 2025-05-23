import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivityRequestPerformanceReviewDB } from "./db/activity-request-performance-review-db.interface"
import { IPerformanceReviewCreateDBRequest } from "./db/performance-review-create-db-request.interface"

export interface IActivityRequestPerformanceReviewCreateRequest
	extends RequiredNotNull<Pick<IActivityRequestPerformanceReviewDB, "userId" | "reportedByUserId" | "activityType" | "dateStart">>,
		Partial<Pick<IActivityRequestPerformanceReviewDB, "projectId">>,
		RequiredNotNull<Pick<IPerformanceReviewCreateDBRequest, "answer1" | "answer2" | "answer3" | "answer4" | "year" | "quartal">> {}
