import { ApiProperty } from "@nestjs/swagger"
import { UserWorkingHoursListItemResponse } from "../../../../../user-working-hours/dtos/response/user-working-hours-list-item.response"
import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response"
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response"
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response"
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum"

export class ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {
	@ApiProperty({ example: 1 })
	projectId?: number

	@ApiProperty({ example: "bob's project" })
	projectName?: string

	@ApiProperty({ example: 1 })
	hours!: number

	@ApiProperty({ example: UserActivityWorkLocation.Home, enum: UserActivityWorkLocation })
	workLocation?: UserActivityWorkLocation

	@ApiProperty({ type: UserWorkingHoursListItemResponse })
	workingHour?: UserWorkingHoursListItemResponse
}

export class ActivityRequestDailyListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
	@ApiProperty({ type: ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse, isArray: true })
	activities?: ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse[]
}

export class ActivityRequestDailyListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
	@ApiProperty({ example: "2024-01-01" })
	date!: string

	@ApiProperty({ example: true })
	lunch?: boolean

	@ApiProperty({ type: ActivityRequestDailyListItemEmbeddedItemsHalResponse })
	declare _embedded: ActivityRequestDailyListItemEmbeddedItemsHalResponse
}
