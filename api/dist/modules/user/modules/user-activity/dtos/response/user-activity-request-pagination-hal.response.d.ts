import { ActivityRequestBusinessTripListItemHalResponse } from "../../modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response";
import { ActivityRequestDailyListItemHalResponse } from "../../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response";
import { ActivityRequestSickLeaveListItemHalResponse } from "../../modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response";
import { ActivityRequestVacationListItemHalResponse } from "../../modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response";
import { ActivityRequestPerformanceReviewListItemHalResponse } from "../../modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response";
import { HalResourcePaginationResponse, HalResourceStandardResponse } from "src/utils/types/dtos";
export declare class UserActivityRequestPaginationEmbeddedHalResponse extends HalResourceStandardResponse {
    requests: (ActivityRequestBusinessTripListItemHalResponse | ActivityRequestDailyListItemHalResponse | ActivityRequestSickLeaveListItemHalResponse | ActivityRequestVacationListItemHalResponse | ActivityRequestPerformanceReviewListItemHalResponse)[];
}
export declare class UserActivityRequestPaginationHalResponse extends HalResourcePaginationResponse {
    _embedded: UserActivityRequestPaginationEmbeddedHalResponse;
}
