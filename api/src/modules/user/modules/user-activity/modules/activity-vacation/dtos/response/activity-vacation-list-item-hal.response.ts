import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ActivityListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-list-item-hal-base.response"

export class ActivityVacationListItemHalResponse extends ActivityListItemHalBaseResponse {
	@ApiProperty({ example: "2024-01-01" })
	date!: string

	@ApiProperty({ example: "2024-01-01" })
	dateStart!: string

	@ApiProperty({ example: "2024-01-01" })
	dateEnd!: string

	@ApiPropertyOptional({ example: "Vacation time" })
	description?: string

	@ApiPropertyOptional({ example: 1 })
	reviewedByUserId?: number
}
