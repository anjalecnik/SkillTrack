import { UserActivityRequestListFilterRequest } from "../dtos/request/user-activity-request-list-filter.request";
import { UserActivityRequestPaginationFilterRequest } from "../dtos/request/user-activity-request-pagination-filter.request";
import { UserActivityRequestListHalResponse } from "../dtos/response/user-activity-request-list-hal.response";
import { UserActivityRequestPaginationHalResponse } from "../dtos/response/user-activity-request-pagination-hal.response";
import { IUserActivityRequestEnriched } from "../interfaces/user-activity-request-enriched.interface";
import { ActivityRequestBusinessTripListItemHalResponse } from "../modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response";
import { ActivityRequestDailyListItemHalResponse } from "../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response";
import { IActivitySharedMapperPathParams } from "../modules/activity-shared/interfaces";
import { ActivityRequestSickLeaveListItemHalResponse } from "../modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response";
import { ActivityRequestVacationListItemHalResponse } from "../modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response";
import { ActivityRequestPerformanceReviewListItemHalResponse } from "../modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response";
import { IPaginatedResponse } from "src/utils/types/interfaces";
export declare abstract class UserActivityRequestHalMapper {
    private static composeUserRequestListPath;
    private static composeUserRequestOverviewPaginationPath;
    static mapUserActivityRequestListHal(activityRequests: IUserActivityRequestEnriched[], filters: UserActivityRequestListFilterRequest, pathParams: IActivitySharedMapperPathParams): UserActivityRequestListHalResponse;
    static mapUserActivityRequestPaginationHal({ data: activityRequests, meta }: IPaginatedResponse<IUserActivityRequestEnriched>, filters: UserActivityRequestPaginationFilterRequest, pathParams: IActivitySharedMapperPathParams): UserActivityRequestPaginationHalResponse;
    static mapActivityRequestHal(activityRequest: IUserActivityRequestEnriched): ActivityRequestBusinessTripListItemHalResponse | ActivityRequestDailyListItemHalResponse | ActivityRequestSickLeaveListItemHalResponse | ActivityRequestVacationListItemHalResponse | ActivityRequestPerformanceReviewListItemHalResponse;
}
