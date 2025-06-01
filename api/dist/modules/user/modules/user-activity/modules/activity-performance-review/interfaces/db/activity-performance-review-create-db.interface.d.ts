import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityPerformanceReviewDB } from "./activity-performance-review-db.interface";
export type IActivityPerformanceReviewCreateDBRequest = RequiredNotNull<Pick<IActivityPerformanceReviewDB, "userId" | "reportedByUserId" | "activityType" | "status" | "date">>;
