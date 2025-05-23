import { ApiProperty } from "@nestjs/swagger"
import { ActivityRequestListItemHalBaseResponse } from "./activity-request-list-item-hal-base.response"

export class ActivityListItemHalBaseResponse extends ActivityRequestListItemHalBaseResponse {
	@ApiProperty({ example: 1 })
	activityRequestId!: number
}
