import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsInt, IsOptional, IsPositive, ValidateIf } from "class-validator"
import { ParseParamArray } from "src/utils/class-transformer"

export class UserWorkOverviewListFilterRequest {
	@ApiPropertyOptional({ example: [1], isArray: true })
	@ParseParamArray()
	@IsArray()
	@Type(() => Number)
	@IsOptional()
	@ValidateIf(object => !object.projectIds || object.userIds)
	userIds?: number[]

	@ApiPropertyOptional({ example: [1], isArray: true })
	@IsArray()
	@Type(() => Number)
	@IsOptional()
	projectIds?: number[]

	@ApiPropertyOptional({ example: "2024-01-10" })
	@IsDate()
	@IsOptional()
	@Type(() => Date)
	fromDateStart?: Date

	@ApiPropertyOptional({ example: "2024-02-10" })
	@IsDate()
	@IsOptional()
	@Type(() => Date)
	toDateEnd?: Date
}
