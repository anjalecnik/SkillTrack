import { PaginationPropsRequest } from "src/utils/types/dtos";
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { IUserCommonFilters } from "src/utils/types/interfaces";
export declare const sortingFieldUserActivityRequestValidationArray: readonly ["id", "dateStart", "dateEnd", "name"];
export type ISortingFieldUserActivityRequest = (typeof sortingFieldUserActivityRequestValidationArray)[number];
export interface IUserActivityRequestListFilterDBRequest extends IUserCommonFilters, Pick<PaginationPropsRequest, "sortingDir"> {
    fromDateStart?: Date;
    toDateEnd?: Date;
    statuses?: UserActivityStatus[];
    types?: UserActivityType[];
    reportedByUserIds?: number[];
    projectIds?: number[];
    fullName?: string;
    ids?: number[];
    sort?: ISortingFieldUserActivityRequest;
}
