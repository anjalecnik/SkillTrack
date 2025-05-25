import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDefined, IsInt, IsPositive, ValidateNested } from "class-validator"
import { DateTimeWithoutTimezoneRequest, TimeRange } from "src/utils/types/dtos"

export class UserWorkingHoursDailyCreateRequest {
	@ApiProperty({ description: "Start and end times of working hours for the day", type: Array<DateTimeWithoutTimezoneRequest> })
	@Type(() => TimeRange)
	@ValidateNested()
	@IsDefined()
	timeRange!: TimeRange

	@ApiProperty({ description: "Activity id", example: 1 })
	@IsInt()
	@IsPositive()
	projectId!: number
}
