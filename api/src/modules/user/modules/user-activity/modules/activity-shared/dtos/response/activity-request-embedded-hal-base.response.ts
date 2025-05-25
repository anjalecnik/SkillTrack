import { ApiProperty } from "@nestjs/swagger"
import { HalResourceStandardResponse, UserShortHalResponse } from "src/utils/types/dtos"
import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum"

export class ActivityRequestEmbeddedHalBaseResponse extends HalResourceStandardResponse {
	@ApiProperty({ type: UserShortHalResponse })
	user!: UserShortHalResponse

	@ApiProperty({ enum: UserActivityRequestActions, isArray: true })
	actions?: UserActivityRequestActions[]
}
