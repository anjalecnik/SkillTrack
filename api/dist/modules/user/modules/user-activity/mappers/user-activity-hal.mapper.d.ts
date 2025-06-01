import { UserActivityListFilterRequest } from "../dtos/request/user-activity-list-filter.request";
import { UserActivityListHalResponse } from "../dtos/response/user-activity-list-hal.response";
import { ActivityBusinessTripListItemHalResponse } from "../modules/activity-business-trip/dtos/response/activity-business-trip-list-item-hal.response";
import { ActivityDailyListItemHalResponse } from "../modules/activity-daily/dtos/response/activity-daily-list-item-hal.response";
import { IActivitySharedMapperPathParams } from "../modules/activity-shared/interfaces";
import { ActivitySickLeaveListItemHalResponse } from "../modules/activity-sick-leave/dtos/response/activity-sick-leave-list-item-hal.response";
import { ActivityVacationListItemHalResponse } from "../modules/activity-vacation/dtos/response/activity-vacation-list-item-hal.response";
import { ActivityVirtualListItemHalResponse } from "../modules/activity-virtual/dtos/response/activity-virtual-list-item-hal.response";
import { IUserVirtualActivity } from "../modules/activity-virtual/interfaces";
import { IUserActivityDailyEnriched } from "../modules/activity-daily/interfaces/db/activity-daily-enriched.interface";
import { ActivityPerformanceReviewListItemHalResponse } from "../modules/activity-performance-review/dtos/response/activity-performance-review-list-item-hal.response";
import { ActivityLunchListItemHalResponse } from "../modules/activity-lunch/dtos/response/activity-lunch-list-item-hal.response";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export declare abstract class UserActivityHalMapper {
    static mapUserActivityListHal(data: (UserActivityEntity | IUserVirtualActivity | IUserActivityDailyEnriched)[], filters: UserActivityListFilterRequest, pathParams: IActivitySharedMapperPathParams): UserActivityListHalResponse;
    static mapActivityHal(activity: UserActivityEntity | IUserVirtualActivity | IUserActivityDailyEnriched): ActivityBusinessTripListItemHalResponse | ActivityDailyListItemHalResponse | ActivitySickLeaveListItemHalResponse | ActivityVacationListItemHalResponse | ActivityVirtualListItemHalResponse | ActivityPerformanceReviewListItemHalResponse | ActivityLunchListItemHalResponse;
    private static composeUserActivityListPath;
}
