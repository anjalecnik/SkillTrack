import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response";
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response";
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response";
import { DateTimeWithoutTimezoneResponse } from "src/utils/types/dtos";
declare class ActivityRequestBusinessTripActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {
}
declare class ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
    activities: ActivityRequestBusinessTripActivityListItemEmbeddedActivityHalResponse[];
}
export declare class ActivityRequestBusinessTripListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
    dateStart: DateTimeWithoutTimezoneResponse;
    dateEnd: DateTimeWithoutTimezoneResponse;
    description?: string;
    location: string;
    distanceInKM?: number;
    reviewedByWorkspaceUserId?: number;
    projectId?: number;
    projectName?: string;
    _embedded: ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse;
}
export {};
