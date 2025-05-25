import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from "class-validator"
import { IsoDateStringToUtcDate } from "src/utils/class-transformer"
import { IsAfterOrEqualDate } from "src/utils/class-validator"
import { DB_VARCHAR_LENGTH_1024 } from "src/utils/constants"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export class ActivityRequestVacationCreateRequest {
	@ApiProperty({ description: "Activity type", enum: UserActivityType, example: UserActivityType.Vacation })
	@IsEnum(UserActivityType)
	@IsIn([UserActivityType.Vacation])
	activityType!: UserActivityType.Vacation

	@ApiProperty({ description: "Start date of activity", example: "2024-01-01" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	dateStart!: Date

	@ApiProperty({ description: "End date of activity", example: "2024-01-01" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	@Validate(IsAfterOrEqualDate, ["dateStart"])
	dateEnd!: Date

	@ApiProperty({ description: "Description of vacation", example: "Walk the plank on seven seas" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_1024)
	description?: string
}
