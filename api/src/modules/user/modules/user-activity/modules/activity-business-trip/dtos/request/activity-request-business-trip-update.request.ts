import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, Min, Validate } from "class-validator"
import { IsoDateObjectToUtcDate } from "src/utils/class-transformer"
import { IsAfterOrEqualDate } from "src/utils/class-validator"
import { DB_VARCHAR_LENGTH_1024, DB_VARCHAR_LENGTH_256 } from "src/utils/constants"
import { DateTimeWithoutTimezoneRequest } from "src/utils/types/dtos"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
export class ActivityRequestBusinessTripUpdateRequest {
	@ApiProperty({ description: "Activity type", enum: UserActivityType, example: UserActivityType.BusinessTrip })
	@IsEnum(UserActivityType)
	@IsIn([UserActivityType.BusinessTrip])
	activityType!: UserActivityType.BusinessTrip

	@ApiPropertyOptional({ description: "Start date of activity", type: DateTimeWithoutTimezoneRequest })
	@IsOptional()
	@IsoDateObjectToUtcDate()
	@IsDate()
	dateStart?: Date

	@ApiPropertyOptional({ description: "End date of activity", type: DateTimeWithoutTimezoneRequest })
	@IsOptional()
	@IsoDateObjectToUtcDate()
	@IsDate()
	@Validate(IsAfterOrEqualDate, ["dateStart"])
	dateEnd?: Date

	@ApiPropertyOptional({ description: "Project id", example: 1 })
	@IsOptional()
	@IsInt()
	@IsPositive()
	projectId?: number

	@ApiPropertyOptional({ description: "Description of business trip", example: "Q1 planning" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_1024)
	description?: string

	@ApiPropertyOptional({ description: "Location of business trip", example: "Maribor Slovenia" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_256)
	location?: string

	@ApiPropertyOptional({ description: "Distance of business trip", example: 10 })
	@IsOptional()
	@IsInt()
	@Min(0)
	distanceInKM?: number
}
