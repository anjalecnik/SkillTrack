import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response"
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response"
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response"

class ActivityRequestSickLeaveActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {}

class ActivityRequestSickLeaveListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
	@ApiProperty({ type: ActivityRequestSickLeaveActivityListItemEmbeddedActivityHalResponse, isArray: true })
	activities!: ActivityRequestSickLeaveActivityListItemEmbeddedActivityHalResponse[]
}

export class ActivityRequestSickLeaveListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
	@ApiProperty({ example: "2024-01-01" })
	dateStart!: string

	@ApiProperty({ example: "2024-01-01" })
	dateEnd!: string

	@ApiPropertyOptional({ example: "I am sick" })
	description?: string

	@ApiProperty({ example: 4 })
	hours!: number

	@ApiProperty({ type: ActivityRequestSickLeaveListItemEmbeddedItemsHalResponse })
	declare _embedded: ActivityRequestSickLeaveListItemEmbeddedItemsHalResponse
}
