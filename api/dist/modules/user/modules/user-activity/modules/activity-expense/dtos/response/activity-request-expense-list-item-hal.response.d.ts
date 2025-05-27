import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response";
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response";
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response";
declare class ActivityRequestExpenseActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {
}
declare class ActivityRequestExpenseListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
    activities: ActivityRequestExpenseActivityListItemEmbeddedActivityHalResponse[];
}
export declare class ActivityRequestExpenseListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
    date: string;
    description?: string;
    fileName?: string;
    fileUrl?: string;
    valueInEuro: number;
    isPaidWithCompanyCard: boolean;
    reviewedByUserId?: number;
    projectId?: number;
    projectName?: string;
    _embedded: ActivityRequestExpenseListItemEmbeddedItemsHalResponse;
}
export {};
