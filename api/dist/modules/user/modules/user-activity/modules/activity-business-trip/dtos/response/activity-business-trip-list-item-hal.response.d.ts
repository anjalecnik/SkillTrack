import { ActivityListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-list-item-hal-base.response";
import { DateTimeWithoutTimezoneResponse } from "src/utils/types/dtos";
export declare class ActivityBusinessTripListItemHalResponse extends ActivityListItemHalBaseResponse {
    dateStart: DateTimeWithoutTimezoneResponse;
    dateEnd: DateTimeWithoutTimezoneResponse;
    date: string;
    description?: string;
    location: string;
    distanceInKM?: number;
    reviewedByWorkspaceUserId?: number;
    projectId?: number;
    projectName?: string;
}
