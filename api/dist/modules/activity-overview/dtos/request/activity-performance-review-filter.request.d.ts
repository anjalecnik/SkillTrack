import { PaginationPropsRequest } from "src/utils/types/dtos";
import { ISortingFieldUserActivityPerformanceReviewPaginationRequest } from "../../interfaces/db/activity-performance-review-filter-db.interface";
export declare class ActivityPerformanceReviewFilterRequest extends PaginationPropsRequest implements PaginationPropsRequest {
    fullName?: string;
    year?: number;
    showSubordinatesByLevel: number;
    sort?: ISortingFieldUserActivityPerformanceReviewPaginationRequest;
}
