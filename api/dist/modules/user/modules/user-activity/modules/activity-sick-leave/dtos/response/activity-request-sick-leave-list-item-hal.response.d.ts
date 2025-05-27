import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response";
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response";
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response";
declare class ActivityRequestSickLeaveActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {
}
declare class ActivityRequestSickLeaveListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
    activities: ActivityRequestSickLeaveActivityListItemEmbeddedActivityHalResponse[];
}
export declare class ActivityRequestSickLeaveListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
    dateStart: string;
    dateEnd: string;
    description?: string;
    hours: number;
    _embedded: ActivityRequestSickLeaveListItemEmbeddedItemsHalResponse;
}
export {};
