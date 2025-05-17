import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum"
import { WorkPositionPromotionListItemResponse } from "./work-position-promotion-list-item.response"

export class WorkPositionListItemResponse {
	@ApiProperty({ description: "Work position id", example: 1 })
	id!: number

	@ApiProperty({ description: "Work position name", example: "Junior Backend Developer" })
	name!: string

	@ApiProperty({ description: "Work position level [L01 - L10]", example: WorkPositionLevel.L03, enum: WorkPositionLevel })
	level!: WorkPositionLevel

	@ApiProperty({ description: "Description of work position", example: "Responsible for building REST Api" })
	description!: string

	@ApiPropertyOptional({ description: "Reference to promotion work position id", example: 1 })
	workPromotion?: WorkPositionPromotionListItemResponse
}
