import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response";
import { UserWorkingHoursListItemResponse } from "../../../../../user-working-hours/dtos/response/user-working-hours-list-item.response";
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum";
export declare class ActivityDailyListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
    date: string;
    hours: number;
    workLocation: UserActivityWorkLocation;
    reviewedByUserId?: number;
    workingHours?: UserWorkingHoursListItemResponse;
}
