import { PaginationPropsRequest } from "src/utils/types/dtos";
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { IUserCommonFilters } from "src/utils/types/interfaces";
export declare const sortingFieldUserActivityPaginationRequestValidationArray: readonly ["id", "dateStart", "activityType", "name", "createdAt"];
export type ISortingFieldUserActivityPaginationRequest = (typeof sortingFieldUserActivityPaginationRequestValidationArray)[number];
export interface IUserActivityRequestPaginationFilterDBRequest extends IUserCommonFilters, PaginationPropsRequest {
    showSubordinatesByLevel: number;
    fromDateStart?: Date;
    toDateEnd?: Date;
    statuses?: UserActivityStatus[];
    types?: UserActivityType[];
    reportedByUserIds?: number[];
    projectIds?: number[];
    fullName?: string;
    ids?: number[];
    sort?: ISortingFieldUserActivityPaginationRequest;
    forceShowDataForUserInParams?: boolean;
}
