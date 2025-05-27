import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { ActivityPerformanceReviewResponse } from "../dtos/response/activity-performance-review.response";
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity";
export declare class ActivityPerformanceReviewMapper {
    static mapPerformanceReviews(performanceReviews: UserPerformanceReviewEntity[], userId: number, activities: UserActivityEntity[]): ActivityPerformanceReviewResponse[];
}
