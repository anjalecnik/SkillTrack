import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ActivityListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-list-item-hal-base.response"

export class ActivitySickLeaveListItemHalResponse extends ActivityListItemHalBaseResponse {
	@ApiProperty({ example: "2024-01-01" })
	date!: string

	@ApiProperty({ example: "2024-01-01" })
	dateStart!: string

	@ApiProperty({ example: "2024-01-01" })
	dateEnd!: string

	@ApiPropertyOptional({ example: "I am sick" })
	description?: string

	@ApiProperty({ example: 4 })
	hours!: number
}
