import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { ActivityPerformanceReviewListItemHalResponse } from "../dtos/response/activity-performance-review-list-item-hal.response";
import { ActivityRequestPerformanceReviewListItemHalResponse } from "../dtos/response/activity-request-performance-review-list-item-hal.response";
import { IActivityPerformanceReviewEntityEnriched, IActivityRequestPerformanceReviewEntityEnriched } from "../interfaces/activity-request-performance-review-enriched.interface";
export declare abstract class ActivityPerformanceReviewHalMapper {
    static mapActivityListItem(data: UserActivityEntity): ActivityPerformanceReviewListItemHalResponse;
    static mapActivityRequestListItem(activityRequest: IActivityRequestPerformanceReviewEntityEnriched | IActivityPerformanceReviewEntityEnriched): ActivityRequestPerformanceReviewListItemHalResponse;
}
