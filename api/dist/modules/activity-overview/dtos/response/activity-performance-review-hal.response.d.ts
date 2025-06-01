import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { IActivityPerformanceReviewHalResponse } from "../../interfaces/activity-performance-review-hal-response.interface";
import { UserWithActivitiesPerformanceReview } from "./activity-performance-review-user.response";
export declare class ActivityPerformanceReviewHalResponse implements IActivityPerformanceReviewHalResponse {
    _links: {
        self: {
            href: string;
        };
    };
    data: UserWithActivitiesPerformanceReview[];
    meta: PaginatedMetaResponse;
}
