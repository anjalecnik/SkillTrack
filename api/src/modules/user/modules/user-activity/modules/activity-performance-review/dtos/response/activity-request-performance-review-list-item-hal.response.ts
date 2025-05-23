import { ApiProperty } from "@nestjs/swagger"
import { ActivityRequestListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response"

export class ActivityRequestPerformanceReviewListItemHalResponse extends ActivityRequestListItemHalBaseResponse {
	@ApiProperty({ example: "2024-01-01" })
	date!: string
}
