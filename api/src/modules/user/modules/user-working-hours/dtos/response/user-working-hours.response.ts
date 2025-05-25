import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { UserWorkingHoursType } from "src/utils/types/enums/user-working-hours.enum"

export class UserWorkingHoursResponse {
	@ApiProperty({ example: UserWorkingHoursType.Work })
	type!: UserWorkingHoursType

	@ApiProperty({ example: "2000-01-01T07:58:10.085Z" })
	fromDateStart!: Date

	@ApiPropertyOptional({ example: "2000-01-01T07:58:10.085Z" })
	toDateEnd!: Date | null

	@ApiProperty({ example: "2000-01-01T07:58:10.085Z" })
	projectId!: number
}
