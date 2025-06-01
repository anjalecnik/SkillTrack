import { IPaginatedResponse } from "src/utils/types/interfaces";
import { ActivityPerformanceReviewFilterRequest } from "../dtos/request/activity-performance-review-filter.request";
import { UserWithActivitiesPerformanceReview } from "../dtos/response/activity-performance-review-user.response";
import { IActivityPerformanceReviewHalResponse } from "../interfaces/activity-performance-review-hal-response.interface";
export declare abstract class ActivityOverviewPerformanceReviewMapper {
    static mapActivityOverview(data: IPaginatedResponse<UserWithActivitiesPerformanceReview>, filter: ActivityPerformanceReviewFilterRequest): IActivityPerformanceReviewHalResponse;
}
