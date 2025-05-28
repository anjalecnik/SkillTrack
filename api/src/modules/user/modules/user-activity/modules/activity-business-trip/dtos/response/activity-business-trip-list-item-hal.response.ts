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

	@ApiPropertyOptional({ example: 120.5, description: "Accommodation cost in EUR" })
	accommodationCost?: number

	@ApiPropertyOptional({ example: 45.0, description: "Food cost in EUR" })
	foodCost?: number

	@ApiPropertyOptional({ example: 30.0, description: "Other costs in EUR" })
	otherCost?: number

	@ApiPropertyOptional({ example: 1 })
	reviewedByWorkspaceUserId?: number

	@ApiPropertyOptional({ example: 1 })
	projectId?: number

	@ApiPropertyOptional({ example: "Bob's project" })
	projectName?: string
}
