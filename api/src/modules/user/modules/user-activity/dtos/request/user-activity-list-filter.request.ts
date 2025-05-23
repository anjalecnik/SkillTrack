import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Transform, Type } from "class-transformer"
import { IsArray, IsBoolean, IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Validate } from "class-validator"
import { ParseParamArray, IsoDateStringToUtcDate } from "src/utils/class-transformer"
import { IsAfterOrEqualDate } from "src/utils/class-validator"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { sortingFieldUserActivityValidationArray, ISortingFieldUserActivity } from "../../interfaces"

export class UserActivityListFilterRequest {
	@ApiPropertyOptional({ example: [1], isArray: true })
	@IsOptional()
	@ParseParamArray()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	ids?: number[]

	@ApiPropertyOptional({ example: [1], isArray: true })
	@IsOptional()
	@ParseParamArray()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	reportedByUserIds?: number[]

	@ApiProperty({ example: "2024-01-01" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	fromDateStart!: Date

	@ApiProperty({ example: "2024-01-01" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	@Validate(IsAfterOrEqualDate, ["fromDateStart"])
	@Transform(({ value }) => DateHelper.getEndOfDay(value))
	toDateEnd!: Date

	@ApiPropertyOptional({ enum: UserActivityStatus, enumName: "UserActivityStatus", isArray: true })
	@IsOptional()
	@ParseParamArray()
	@IsEnum(UserActivityStatus, { each: true })
	@IsArray()
	statuses?: UserActivityStatus[]

	@ApiPropertyOptional({ enum: UserActivityType, enumName: "UserActivityType", isArray: true })
	@IsOptional()
	@ParseParamArray()
	@IsEnum(UserActivityType, { each: true })
	@IsArray()
	types?: UserActivityType[]

	@ApiPropertyOptional({ example: [1], isArray: true })
	@IsOptional()
	@ParseParamArray()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	projectIds?: number[]

	@ApiPropertyOptional({ example: "Bob" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	fullName?: string

	@ApiPropertyOptional({ example: true, description: "Indicates whether to include or exclude virtual activities" })
	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => value === "true", { toClassOnly: true })
	virtualActivities: boolean = true

	@ApiPropertyOptional({ default: "dateStart" })
	@IsString()
	@IsIn(sortingFieldUserActivityValidationArray)
	@IsOptional()
	sort?: ISortingFieldUserActivity = "dateStart"

	@ApiPropertyOptional({ default: "desc", enum: ["asc", "desc"] })
	@IsString()
	@IsOptional()
	sortingDir: "desc" | "asc" = "desc"
}
