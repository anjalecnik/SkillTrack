import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { ISortingFieldUserActivity } from "../../interfaces";
export declare class UserActivityListFilterRequest {
    ids?: number[];
    reportedByUserIds?: number[];
    fromDateStart: Date;
    toDateEnd: Date;
    statuses?: UserActivityStatus[];
    types?: UserActivityType[];
    projectIds?: number[];
    fullName?: string;
    virtualActivities: boolean;
    sort?: ISortingFieldUserActivity;
    sortingDir: "desc" | "asc";
}
