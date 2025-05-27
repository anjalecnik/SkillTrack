import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export interface IActivitySharedFilterDB {
    excludeActivityIds?: number[];
    userId?: number;
    activityTypes?: UserActivityType[];
    statuses?: UserActivityStatus[];
}
