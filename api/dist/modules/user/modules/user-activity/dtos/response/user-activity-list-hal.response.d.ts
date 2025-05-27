import { ActivityBusinessTripListItemHalResponse } from "../../modules/activity-business-trip/dtos/response/activity-business-trip-list-item-hal.response";
import { ActivityDailyListItemHalResponse } from "../../modules/activity-daily/dtos/response/activity-daily-list-item-hal.response";
import { ActivitySickLeaveListItemHalResponse } from "../../modules/activity-sick-leave/dtos/response/activity-sick-leave-list-item-hal.response";
import { ActivityVacationListItemHalResponse } from "../../modules/activity-vacation/dtos/response/activity-vacation-list-item-hal.response";
import { ActivityVirtualListItemHalResponse } from "../../modules/activity-virtual/dtos/response/activity-virtual-list-item-hal.response";
import { ActivityPerformanceReviewListItemHalResponse } from "../../modules/activity-performance-review/dtos/response/activity-performance-review-list-item-hal.response";
import { ActivityLunchListItemHalResponse } from "../../modules/activity-lunch/dtos/response/activity-lunch-list-item-hal.response";
import { HalResourceResponse } from "src/utils/types/dtos";
export declare class UserActivityListHalResponse extends HalResourceResponse {
    activities: (ActivityBusinessTripListItemHalResponse | ActivityDailyListItemHalResponse | ActivitySickLeaveListItemHalResponse | ActivityVacationListItemHalResponse | ActivityVirtualListItemHalResponse | ActivityPerformanceReviewListItemHalResponse | ActivityLunchListItemHalResponse)[];
}
