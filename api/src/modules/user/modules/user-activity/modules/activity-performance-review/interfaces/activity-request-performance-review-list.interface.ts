import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivityRequestPerformanceReviewDB } from "./db/activity-request-performance-review-db.interface"

export interface IActivityRequestPerformanceReviewListRequest extends RequiredNotNull<Pick<IActivityRequestPerformanceReviewDB, "userId">> {}
