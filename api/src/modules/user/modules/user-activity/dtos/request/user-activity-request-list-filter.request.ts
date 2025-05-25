import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Validate } from "class-validator"
import { ISortingFieldUserActivityRequest, sortingFieldUserActivityRequestValidationArray } from "../../interfaces"
import { ParseParamArray, IsoDateStringToUtcDate } from "src/utils/class-transformer"
import { IsAfterOrEqualDate } from "src/utils/class-validator"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export class UserActivityRequestListFilterRequest {
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

	@ApiPropertyOptional({ example: "2024-01-01" })
	@IsOptional()
	@IsoDateStringToUtcDate(10)
	@IsDate()
	fromDateStart?: Date

	@ApiPropertyOptional({ example: "2024-01-01" })
	@IsOptional()
	@IsoDateStringToUtcDate(10)
	@IsDate()
	@Validate(IsAfterOrEqualDate, ["fromDateStart"])
	toDateEnd?: Date

	@ApiPropertyOptional({ enum: UserActivityStatus, isArray: true })
	@IsOptional()
	@ParseParamArray()
	@IsEnum(UserActivityStatus, { each: true })
	@IsArray()
	statuses?: UserActivityStatus[]

	@ApiPropertyOptional({ enum: UserActivityType, isArray: true })
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

	@ApiPropertyOptional({ default: "dateStart" })
	@IsString()
	@IsIn(sortingFieldUserActivityRequestValidationArray)
	@IsOptional()
	sort?: ISortingFieldUserActivityRequest = "dateStart"

	@ApiPropertyOptional({ default: "desc", enum: ["asc", "desc"] })
	@IsString()
	@IsOptional()
	sortingDir: "desc" | "asc" = "desc"
}
