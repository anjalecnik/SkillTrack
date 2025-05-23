import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, Validate } from "class-validator"
import { ISortingFieldUserActivityPaginationRequest, sortingFieldUserActivityPaginationRequestValidationArray } from "../../interfaces"
import { IsoDateStringToUtcDate, ParseParamArray } from "src/utils/class-transformer"
import { IsAfterOrEqualDate } from "src/utils/class-validator"
import { PaginationPropsRequest } from "src/utils/types/dtos"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export class UserActivityRequestPaginationFilterRequest extends PaginationPropsRequest {
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

	@ApiPropertyOptional({ example: 0 })
	@IsOptional()
	@IsInt()
	@Min(0)
	@Type(() => Number)
	showSubordinatesByLevel: number = 0

	@ApiPropertyOptional({ default: "dateStart" })
	@IsString()
	@IsIn(sortingFieldUserActivityPaginationRequestValidationArray)
	@IsOptional()
	sort?: ISortingFieldUserActivityPaginationRequest = "dateStart"

	@ApiPropertyOptional({ default: "asc", enum: ["asc", "desc"] })
	@IsString()
	@IsOptional()
	sortingDir: "desc" | "asc" = "asc"

	@ApiPropertyOptional({ example: true })
	@IsBoolean()
	@IsOptional()
	@Type(() => Boolean)
	forceShowDataForUserInParams?: boolean = false
}
