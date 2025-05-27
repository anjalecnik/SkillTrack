import { IActivityRequestBusinessTripDB } from "src/modules/user/modules/user-activity/modules/activity-business-trip/interfaces";
import { IActivityRequestDailyDB } from "src/modules/user/modules/user-activity/modules/activity-daily/interfaces";
import { IActivityRequestPerformanceReviewDB } from "src/modules/user/modules/user-activity/modules/activity-performance-review/interfaces/db/activity-request-performance-review-db.interface";
import { IActivityRequestSickLeaveDB } from "src/modules/user/modules/user-activity/modules/activity-sick-leave/interfaces";
import { IActivityRequestVacationDB } from "src/modules/user/modules/user-activity/modules/activity-vacation/interfaces";
import { UserActivityType } from "../types/enums/user-activity.enum";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
type ActivityRequestResponseMap = {
    [UserActivityType.BusinessTrip]: IActivityRequestBusinessTripDB;
    [UserActivityType.Daily]: IActivityRequestDailyDB;
    [UserActivityType.SickLeave]: IActivityRequestSickLeaveDB;
    [UserActivityType.Vacation]: IActivityRequestVacationDB;
    [UserActivityType.PerformanceReview]: IActivityRequestPerformanceReviewDB;
    [UserActivityType.Unassigned]: never;
    [UserActivityType.PublicHoliday]: never;
    [UserActivityType.Lunch]: never;
};
interface ActivityRequestInput<T extends UserActivityType> extends UserActivityRequestEntity {
    activityType: T;
}
export declare abstract class ActivityRequestTypeHelper {
    static isBusinessTripRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestBusinessTripDB;
    static isDailyRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestDailyDB;
    static isSickLeaveRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestSickLeaveDB;
    static isVacationRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestVacationDB;
    static isPerformanceReviewRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestPerformanceReviewDB;
    static isActivityRequest<T extends UserActivityType>(activityRequest: ActivityRequestInput<T>): ActivityRequestResponseMap[T];
    static setAsActivityRequest<T extends UserActivityType>(activityRequest: UserActivityRequestEntity, activityType: T): ActivityRequestResponseMap[T];
}
export {};
