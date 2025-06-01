import { ActivityListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-list-item-hal-base.response";
export declare class ActivityPerformanceReviewListItemHalResponse extends ActivityListItemHalBaseResponse {
    date: string;
    description?: string;
    reviewedByUserId?: number;
}
