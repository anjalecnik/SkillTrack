import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { WorkPositionListItemResponse } from "./work-position-list-item.response";
export declare class WorkPositionPaginationListResponse {
    meta: PaginatedMetaResponse;
    data: WorkPositionListItemResponse[];
}
