import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response"
import { ActivityRequestEmbeddedHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response"
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response"
import { DateTimeWithoutTimezoneResponse } from "src/utils/types/dtos"

class ActivityRequestBusinessTripActivityListItemEmbeddedActivityHalResponse extends ActivityRequestEmbeddedActivityHalBaseResponse {}

class ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse extends ActivityRequestEmbeddedHalBaseResponse {
	@ApiProperty({ type: ActivityRequestBusinessTripActivityListItemEmbeddedActivityHalResponse, isArray: true })
	activities!: ActivityRequestBusinessTripActivityListItemEmbeddedActivityHalResponse[]
}

export class ActivityRequestBusinessTripListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
	@ApiProperty({ type: DateTimeWithoutTimezoneResponse })
	dateStart!: DateTimeWithoutTimezoneResponse

	@ApiProperty({ type: DateTimeWithoutTimezoneResponse })
	dateEnd!: DateTimeWithoutTimezoneResponse

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

	@ApiProperty({ type: ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse })
	declare _embedded: ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse
}
