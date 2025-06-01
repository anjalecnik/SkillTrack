import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export interface IActivitySharedCollisionRules {
    collidingActivityOnDay?: UserActivityType[];
    collidingActivityWorkHoursOnDay?: UserActivityType[];
}
