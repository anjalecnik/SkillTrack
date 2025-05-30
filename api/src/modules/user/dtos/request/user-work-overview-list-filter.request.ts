import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsInt, IsOptional, IsPositive, ValidateIf } from "class-validator"
import { ParseParamArray } from "src/utils/class-transformer"

export class UserWorkOverviewListFilterRequest {
	@ApiPropertyOptional({ example: [1], isArray: true })
	@ParseParamArray()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	@ValidateIf(object => !object.projectIds || object.workspaceUserIds)
	userIds?: number[]

	@ApiPropertyOptional({ example: [1], isArray: true })
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
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
