import { ApiProperty } from "@nestjs/swagger"
import { UserVirtualActivityType } from "src/utils/types/enums/user-virtual-activity.enum"

export class ActivityVirtualListItemHalResponse {
	@ApiProperty({ example: UserVirtualActivityType.Empty, enum: UserVirtualActivityType })
	activityType!: UserVirtualActivityType

	@ApiProperty({ example: "Marijino vnebovzetje" })
	holidayName?: string

	@ApiProperty({ example: "2024-01-01" })
	date!: string
}
