import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { UserPerformanceReviewQuartal } from "src/utils/types/enums/user-performance-review-quartal.enum";
export declare class ActivityRequestPerformanceReviewUpdateRequest {
    activityType: UserActivityType.PerformanceReview;
    quartal: UserPerformanceReviewQuartal;
    year: number;
    answer1: number;
    answer2: number;
    answer3: boolean;
    answer4: boolean;
}
