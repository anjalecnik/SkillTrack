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

	@ApiProperty({ type: ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse })
	declare _embedded: ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse
}
