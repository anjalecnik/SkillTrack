import { UserWorkingHoursListItemResponse } from "../../../../../user-working-hours/dtos/response/user-working-hours-list-item.response";
import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response";
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response";
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response";
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum";
export declare class ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {
    projectId?: number;
    projectName?: string;
    hours: number;
    workLocation?: UserActivityWorkLocation;
    workingHour?: UserWorkingHoursListItemResponse;
}
export declare class ActivityRequestDailyListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
    activities?: ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse[];
}
export declare class ActivityRequestDailyListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
    date: string;
    lunch?: boolean;
    _embedded: ActivityRequestDailyListItemEmbeddedItemsHalResponse;
}
