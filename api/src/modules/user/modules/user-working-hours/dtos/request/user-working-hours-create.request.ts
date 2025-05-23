import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator"
import { IsoDateObjectToUtcDate } from "src/utils/class-transformer"
import { DateTimeWithoutTimezoneRequest } from "src/utils/types/dtos"
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum"

export class UserWorkingHoursCreateRequest {
	@ApiPropertyOptional({ description: "Project id", example: 1 })
	@IsOptional()
	@IsNumber()
	@IsPositive()
	projectId!: number | null

	@ApiPropertyOptional({ description: "Work location", enum: UserActivityWorkLocation, example: UserActivityWorkLocation.Home })
	@IsOptional()
	@IsEnum(UserActivityWorkLocation)
	workLocation!: UserActivityWorkLocation

	@ApiProperty({ description: "Date and time for the action of working hours", type: DateTimeWithoutTimezoneRequest })
	@IsoDateObjectToUtcDate()
	@IsDate()
	dateTime!: Date
}
