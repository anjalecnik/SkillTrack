import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { IActivitySharedCancelDBRequest, IActivitySharedRequestCancelDBRequest, IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewDBRequest, IActivitySharedRequestReviewRequest, IActivitySharedReviewDBRequest } from "../interfaces";
export declare abstract class ActivitySharedDBMapper {
    static cancelActivity(activityRequestCancelRequest: IActivitySharedRequestCancelRequest, activities: UserActivityEntity[] | undefined | null): {
        activityRequest: IActivitySharedRequestCancelDBRequest;
        activityDaily: IActivitySharedCancelDBRequest[];
    };
    static reviewActivity(activityRequestReviewRequest: IActivitySharedRequestReviewRequest, activities: UserActivityEntity[] | undefined | null): {
        activityRequest: IActivitySharedRequestReviewDBRequest;
        activityDaily: IActivitySharedReviewDBRequest[];
    };
}
