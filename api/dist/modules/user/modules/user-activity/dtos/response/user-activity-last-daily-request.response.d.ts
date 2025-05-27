import { ActivityRequestDailyListItemEmbeddedItemsHalResponse, ActivityRequestDailyListItemHalResponse } from "../../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response";
import { UserWorkingHoursListItemResponse } from "../../../user-working-hours/dtos/response/user-working-hours-list-item.response";
export declare class UserActivityLastDailyRequestResponseEmbedded extends ActivityRequestDailyListItemEmbeddedItemsHalResponse {
    workHours?: UserWorkingHoursListItemResponse[];
}
export declare class UserActivityLastDailyRequestResponse extends ActivityRequestDailyListItemHalResponse {
    _embedded: UserActivityLastDailyRequestResponseEmbedded;
}
