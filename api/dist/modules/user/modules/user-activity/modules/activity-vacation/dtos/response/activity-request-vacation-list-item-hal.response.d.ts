import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response";
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response";
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response";
declare class ActivityRequestVacationActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {
}
declare class ActivityRequestVacationListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
    activities: ActivityRequestVacationActivityListItemEmbeddedActivityHalResponse[];
}
export declare class ActivityRequestVacationListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
    dateStart: string;
    dateEnd: string;
    description?: string;
    reviewedByWorkspaceUserId?: number;
    _embedded: ActivityRequestVacationListItemEmbeddedItemsHalResponse;
}
export {};
