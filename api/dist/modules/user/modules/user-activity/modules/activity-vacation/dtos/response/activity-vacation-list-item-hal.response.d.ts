import { ActivityListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-list-item-hal-base.response";
export declare class ActivityVacationListItemHalResponse extends ActivityListItemHalBaseResponse {
    date: string;
    dateStart: string;
    dateEnd: string;
    description?: string;
    reviewedByUserId?: number;
}
