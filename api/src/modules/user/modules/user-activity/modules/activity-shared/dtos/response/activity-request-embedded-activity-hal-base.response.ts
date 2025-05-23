import { ApiProperty } from "@nestjs/swagger"
import { HalResourceResponse } from "src/utils/types/dtos"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"

export class ActivityRequestEmbeddedActivityHalBaseResponse extends HalResourceResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: "2024-01-01" })
	date!: string

	@ApiProperty({ enum: UserActivityStatus, example: UserActivityStatus.Approved })
	status!: UserActivityStatus
}
