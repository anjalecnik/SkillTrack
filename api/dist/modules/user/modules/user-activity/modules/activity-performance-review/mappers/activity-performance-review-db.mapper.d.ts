import { IActivityRequestPerformanceReviewCreateRequest } from "../interfaces/activity-request-performance-review-create.interface";
import { IActivityPerformanceReviewCreateDBRequest } from "../interfaces/db/activity-performance-review-create-db.interface";
import { IActivityRequestPerformanceReviewCreateDBRequest } from "../interfaces/db/activity-request-performance-review-create-db.interface";
export declare abstract class ActivityPerformanceReviewDBMapper {
    static createActivityRequest(createActivityRequest: IActivityRequestPerformanceReviewCreateRequest): {
        activityRequest: IActivityRequestPerformanceReviewCreateDBRequest;
        activity: IActivityPerformanceReviewCreateDBRequest;
    };
}
