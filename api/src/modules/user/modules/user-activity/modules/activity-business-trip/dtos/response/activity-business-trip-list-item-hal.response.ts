import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ActivityListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-list-item-hal-base.response"
import { DateTimeWithoutTimezoneResponse } from "src/utils/types/dtos"

export class ActivityBusinessTripListItemHalResponse extends ActivityListItemHalBaseResponse {
	@ApiProperty({ type: DateTimeWithoutTimezoneResponse })
	dateStart!: DateTimeWithoutTimezoneResponse

	@ApiProperty({ type: DateTimeWithoutTimezoneResponse })
	dateEnd!: DateTimeWithoutTimezoneResponse

	@ApiProperty({ example: "2024-01-01" })
	date!: string

	@ApiPropertyOptional({ example: "Q1 Planning" })
	description?: string

	@ApiProperty({ example: "Maribor Slovenia" })
	location!: string

	@ApiPropertyOptional({ example: 10 })
	distanceInKM?: number

	@ApiPropertyOptional({ example: 1 })
	reviewedByWorkspaceUserId?: number

	@ApiPropertyOptional({ example: 1 })
	projectId?: number

	@ApiPropertyOptional({ example: "Bob's project" })
	projectName?: string
}
