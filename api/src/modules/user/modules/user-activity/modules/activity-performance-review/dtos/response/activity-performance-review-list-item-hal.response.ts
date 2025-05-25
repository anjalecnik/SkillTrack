import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ActivityListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-list-item-hal-base.response"

export class ActivityPerformanceReviewListItemHalResponse extends ActivityListItemHalBaseResponse {
	@ApiProperty({ example: "2024-01-01" })
	date!: string

	@ApiPropertyOptional({ example: "Performance Review" })
	description?: string

	@ApiPropertyOptional({ example: 1 })
	reviewedByUserId?: number
}
