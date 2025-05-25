import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response"
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response"
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response"

class ActivityRequestVacationActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {}

class ActivityRequestVacationListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
	@ApiProperty({ type: ActivityRequestVacationActivityListItemEmbeddedActivityHalResponse, isArray: true })
	activities!: ActivityRequestVacationActivityListItemEmbeddedActivityHalResponse[]
}

export class ActivityRequestVacationListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
	@ApiProperty({ example: "2024-01-01" })
	dateStart!: string

	@ApiProperty({ example: "2024-01-01" })
	dateEnd!: string

	@ApiPropertyOptional({ example: "Vacation time" })
	description?: string

	@ApiPropertyOptional({ example: 1 })
	reviewedByWorkspaceUserId?: number

	@ApiProperty({ type: ActivityRequestVacationListItemEmbeddedItemsHalResponse })
	declare _embedded: ActivityRequestVacationListItemEmbeddedItemsHalResponse
}
