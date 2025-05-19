import { ApiProperty } from "@nestjs/swagger"

export class WorkPositionPromotionListItemResponse {
	@ApiProperty({ description: "Work position id", example: 1 })
	id!: number

	@ApiProperty({ description: "Work position name", example: "Junior Backend Developer" })
	name!: string
}
