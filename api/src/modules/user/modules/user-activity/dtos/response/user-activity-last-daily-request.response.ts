import { ApiPropertyOptional } from "@nestjs/swagger"
import {
	ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse,
	ActivityRequestDailyListItemEmbeddedItemsHalResponse,
	ActivityRequestDailyListItemHalResponse
} from "../../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response"
import { UserWorkingHoursListItemResponse } from "../../../user-working-hours/dtos/response/user-working-hours-list-item.response"

export class UserActivityLastDailyRequestResponseEmbedded extends ActivityRequestDailyListItemEmbeddedItemsHalResponse {
	@ApiPropertyOptional({ type: ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse, isArray: true })
	workHours?: UserWorkingHoursListItemResponse[]
}
export class UserActivityLastDailyRequestResponse extends ActivityRequestDailyListItemHalResponse {
	@ApiPropertyOptional({ type: UserActivityLastDailyRequestResponseEmbedded })
	declare _embedded: UserActivityLastDailyRequestResponseEmbedded
}
