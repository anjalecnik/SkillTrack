import { ISortingFieldUserActivityPaginationRequest } from "../../interfaces";
import { PaginationPropsRequest } from "src/utils/types/dtos";
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class UserActivityRequestPaginationFilterRequest extends PaginationPropsRequest {
    fromDateStart?: Date;
    toDateEnd?: Date;
    statuses?: UserActivityStatus[];
    types?: UserActivityType[];
    projectIds?: number[];
    fullName?: string;
    showSubordinatesByLevel: number;
    sort?: ISortingFieldUserActivityPaginationRequest;
    sortingDir: "desc" | "asc";
    forceShowDataForUserInParams?: boolean;
}
