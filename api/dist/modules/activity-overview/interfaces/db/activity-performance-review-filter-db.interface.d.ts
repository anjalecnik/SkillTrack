import { PaginationPropsRequest } from "src/utils/types/dtos";
import { IUserCommonFilters } from "src/utils/types/interfaces";
export declare const sortingFieldUserActivityPerformanceReviewPaginationRequestValidationArray: readonly ["id", "name"];
export type ISortingFieldUserActivityPerformanceReviewPaginationRequest = (typeof sortingFieldUserActivityPerformanceReviewPaginationRequestValidationArray)[number];
export interface ActivityPerformanceReviewPaginationFilterDBRequest extends IUserCommonFilters, PaginationPropsRequest {
    showSubordinatesByLevel: number;
    fullName?: string;
    year?: number;
    sort?: ISortingFieldUserActivityPerformanceReviewPaginationRequest;
}
