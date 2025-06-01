import { IPerformanceReviewActivity } from "../../interfaces/activity-performance-review-hal-response.interface";
export declare class UserWithActivitiesPerformanceReview {
    name: string;
    surname: string;
    middleName?: string | null;
    email: string;
    scores: IPerformanceReviewActivity[];
}
