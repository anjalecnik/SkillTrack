import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivityRequestPerformanceReviewDB } from "./activity-request-performance-review-db.interface"

export type IActivityRequestPerformanceReviewCreateDBRequest = RequiredNotNull<
	Pick<IActivityRequestPerformanceReviewDB, "userId" | "reportedByUserId" | "activityType" | "dateStart" | "status">
> &
	Partial<Pick<IActivityRequestPerformanceReviewDB, "projectId">>
