import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { WorkPositionListItemResponse } from "../dtos/response/work-position-list-item.response"
import { WorkPositionPaginationListResponse } from "../dtos/response/work-position-pagination-list.response"
import { WorkPositionPromotionListItemResponse } from "../dtos/response/work-position-promotion-list-item.response"

export abstract class WorkPositionMapper {
	static mapWorkPositionPaginationList(workPositions: WorkPositionEntity[], meta: PaginatedMetaResponse): WorkPositionPaginationListResponse {
		return {
			meta,
			data: workPositions.map(workPosition => this.mapWorkPositionListItem(workPosition))
		}
	}

	static mapWorkPositionListItem(workPositionEntity: WorkPositionEntity): WorkPositionListItemResponse {
		return {
			id: workPositionEntity.id,
			name: workPositionEntity.name,
			level: workPositionEntity.level,
			description: workPositionEntity.description,
			workPromotion: workPositionEntity.parentWorkPosition ? this.mapOneWorkPositionPromotion(workPositionEntity.parentWorkPosition) : undefined
		}
	}

	private static mapOneWorkPositionPromotion(workPositionEntity: WorkPositionEntity): WorkPositionPromotionListItemResponse {
		return {
			id: workPositionEntity.id,
			name: workPositionEntity.name
		}
	}
}
