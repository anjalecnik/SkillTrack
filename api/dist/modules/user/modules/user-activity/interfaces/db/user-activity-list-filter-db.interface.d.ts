import { PaginationPropsRequest } from "src/utils/types/dtos";
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { IUserCommon } from "src/utils/types/interfaces";
export declare const sortingFieldUserActivityValidationArray: readonly ["dateStart"];
export type ISortingFieldUserActivity = (typeof sortingFieldUserActivityValidationArray)[number];
export interface IUserActivityListFilterDBRequest extends IUserCommon, Pick<PaginationPropsRequest, "sortingDir"> {
    fromDateStart: Date;
    toDateEnd: Date;
    statuses?: UserActivityStatus[];
    types?: UserActivityType[];
    reportedByUserIds?: number[];
    projectIds?: number[];
    virtualActivities: boolean;
    ids?: number[];
    sort?: ISortingFieldUserActivity;
}
