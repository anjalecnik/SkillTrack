import { ApiProperty } from "@nestjs/swagger"
import { HalResourceResponse, DateTimeWithoutTimezoneResponse } from "src/utils/types/dtos"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export class ActivityRequestListItemHalBaseResponse extends HalResourceResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ enum: UserActivityType })
	activityType!: UserActivityType

	@ApiProperty({ enum: UserActivityStatus, example: UserActivityStatus.Approved })
	status!: UserActivityStatus

	@ApiProperty({ example: 1 })
	reportedByUserId!: number

	@ApiProperty({ type: DateTimeWithoutTimezoneResponse, example: "2024-01-01" })
	createdAt!: string
}
