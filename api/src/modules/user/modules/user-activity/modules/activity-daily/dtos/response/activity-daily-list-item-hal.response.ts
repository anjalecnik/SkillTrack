import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response"
import { UserWorkingHoursListItemResponse } from "../../../../../user-working-hours/dtos/response/user-working-hours-list-item.response"
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum"

export class ActivityDailyListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
	@ApiProperty({ example: "2024-01-01" })
	date!: string

	@ApiProperty({ example: 1 })
	hours!: number

	@ApiProperty({ example: UserActivityWorkLocation.Home, enum: UserActivityWorkLocation })
	workLocation!: UserActivityWorkLocation

	@ApiPropertyOptional({ example: 1 })
	reviewedByUserId?: number

	@ApiPropertyOptional({ type: UserWorkingHoursListItemResponse })
	workingHours?: UserWorkingHoursListItemResponse
}
