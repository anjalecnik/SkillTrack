import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { DateTimeWithoutTimezoneResponse } from "src/utils/types/dtos"
import { UserWorkingHoursType } from "src/utils/types/enums/user-working-hours.enum"

export class UserWorkingHoursListItemResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: UserWorkingHoursType.Work })
	type!: UserWorkingHoursType

	@ApiProperty({ type: DateTimeWithoutTimezoneResponse })
	fromDateStart!: DateTimeWithoutTimezoneResponse

	@ApiPropertyOptional({ type: DateTimeWithoutTimezoneResponse })
	toDateEnd?: DateTimeWithoutTimezoneResponse

	@ApiProperty({ example: "Kr en projekt" })
	projectName!: string | null

	@ApiProperty({ example: 1 })
	projectId!: number | null
}
