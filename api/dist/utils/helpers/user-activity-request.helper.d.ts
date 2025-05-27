import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { WithRequired } from "../types/interfaces";
export declare abstract class UserActivityRequestHelper {
    static validateUserRelation(activityRequest: UserActivityRequestEntity): WithRequired<UserActivityRequestEntity, "user">;
    static validateActivitiesRelation(activityRequest: UserActivityRequestEntity): WithRequired<UserActivityRequestEntity, "userActivities">;
}
