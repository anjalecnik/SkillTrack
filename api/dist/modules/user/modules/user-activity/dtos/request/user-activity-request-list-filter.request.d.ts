import { ISortingFieldUserActivityRequest } from "../../interfaces";
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class UserActivityRequestListFilterRequest {
    ids?: number[];
    reportedByUserIds?: number[];
    fromDateStart?: Date;
    toDateEnd?: Date;
    statuses?: UserActivityStatus[];
    types?: UserActivityType[];
    projectIds?: number[];
    fullName?: string;
    sort?: ISortingFieldUserActivityRequest;
    sortingDir: "desc" | "asc";
}
