import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { UserPerformanceReviewQuartal } from "src/utils/types/enums/user-performance-review-quartal.enum";
import { UserWithActivitiesPerformanceReview } from "../dtos/response/activity-performance-review-user.response";
export interface IPerformanceReviewActivity {
    id: number;
    quartal: UserPerformanceReviewQuartal;
    year: number;
    answer1: number;
    answer2: number;
    answer3: boolean;
    answer4: boolean;
    score: number;
    activityId: number | null;
    activities?: {
        activityRequestId: number;
    }[];
}
export interface IUserWithActivitiesPerformanceReview {
    id: number;
    name: string;
    surname: string;
    email: string;
    performanceReviews: IPerformanceReviewActivity[];
}
export interface IActivityPerformanceReviewHalResponse {
    _links: {
        self: {
            href: string;
        };
    };
    data: UserWithActivitiesPerformanceReview[];
    meta: PaginatedMetaResponse;
}
