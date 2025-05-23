import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsEnum, IsIn, ValidateNested } from "class-validator"
import { UserWorkingHoursDailyCreateRequest } from "../../../../../user-working-hours/dtos/request/user-working-hours-daily-create.request"
import { IsoDateStringToUtcDate } from "src/utils/class-transformer"
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export class ActivityRequestDailyUpdateRequest {
	@ApiProperty({ description: "Activity type", enum: UserActivityType, example: UserActivityType.Daily })
	@IsEnum(UserActivityType)
	@IsIn([UserActivityType.Daily])
	activityType!: UserActivityType.Daily

	@ApiProperty({ description: "Date of activity", example: "2024-01-01" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	date!: Date

	@ApiProperty({ description: "Work location", enum: UserActivityWorkLocation, example: UserActivityWorkLocation.Office })
	@IsEnum(UserActivityWorkLocation)
	workLocation!: UserActivityWorkLocation

	@ApiProperty()
	@IsBoolean()
	lunch: boolean = false

	@ApiProperty({ description: "Working hours", type: UserWorkingHoursDailyCreateRequest })
	@IsArray()
	@Type(() => UserWorkingHoursDailyCreateRequest)
	@ValidateNested()
	@ArrayMinSize(1)
	workingHours!: UserWorkingHoursDailyCreateRequest[]
}
