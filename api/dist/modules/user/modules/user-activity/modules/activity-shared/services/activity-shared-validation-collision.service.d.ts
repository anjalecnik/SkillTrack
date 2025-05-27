import { IActivitySharedCollisionRules } from "../interfaces";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export declare class ActivitySharedValidationCollisionService {
    validateCollisions(collisionActivities: UserActivityEntity[], collisionRules: IActivitySharedCollisionRules): void;
    private validateCollisionForDay;
}
