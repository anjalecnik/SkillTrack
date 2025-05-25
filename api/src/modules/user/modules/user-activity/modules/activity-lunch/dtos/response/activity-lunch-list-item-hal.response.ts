import { ApiProperty } from "@nestjs/swagger"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export class ActivityLunchListItemHalResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ type: UserActivityType })
	activityType!: UserActivityType

	@ApiProperty()
	date!: string
}
