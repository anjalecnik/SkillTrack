import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, Min, Validate } from "class-validator"
import { IsoDateStringToUtcDate } from "src/utils/class-transformer"
import { IsAfterOrEqualDate } from "src/utils/class-validator"
import { DB_VARCHAR_LENGTH_1024, DB_VARCHAR_LENGTH_256 } from "src/utils/constants"
import { DateTimeWithoutTimezoneRequest } from "src/utils/types/dtos"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export class ActivityRequestBusinessTripCreateRequest {
	@ApiProperty({ description: "Activity type", enum: UserActivityType, example: UserActivityType.BusinessTrip })
	@IsEnum(UserActivityType)
	@IsIn([UserActivityType.BusinessTrip])
	activityType!: UserActivityType.BusinessTrip

	@ApiProperty({ description: "Start date of activity", type: DateTimeWithoutTimezoneRequest })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	dateStart!: Date

	@ApiProperty({ description: "End date of activity", type: DateTimeWithoutTimezoneRequest })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	@Validate(IsAfterOrEqualDate, ["dateStart"])
	dateEnd!: Date

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

	@ApiProperty({ description: "Location of business trip", example: "Maribor Slovenia" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_256)
	location!: string

	@ApiPropertyOptional({ description: "Distance of business trip", example: 10 })
	@IsOptional()
	@IsInt()
	@Min(0)
	distanceInKM?: number

	@ApiPropertyOptional({ description: "Accommodation cost in EUR", example: 120.5 })
	@IsOptional()
	@IsPositive()
	accommodationCost?: number

	@ApiPropertyOptional({ description: "Food cost in EUR", example: 45.0 })
	@IsOptional()
	@IsPositive()
	foodCost?: number

	@ApiPropertyOptional({ description: "Other costs in EUR", example: 30.0 })
	@IsOptional()
	@IsPositive()
	otherCost?: number
}
