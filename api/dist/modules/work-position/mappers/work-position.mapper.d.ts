import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity";
import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { WorkPositionListItemResponse } from "../dtos/response/work-position-list-item.response";
import { WorkPositionPaginationListResponse } from "../dtos/response/work-position-pagination-list.response";
export declare abstract class WorkPositionMapper {
    static mapWorkPositionPaginationList(workPositions: WorkPositionEntity[], meta: PaginatedMetaResponse): WorkPositionPaginationListResponse;
    static mapWorkPositionListItem(workPositionEntity: WorkPositionEntity): WorkPositionListItemResponse;
    private static mapOneWorkPositionPromotion;
}
