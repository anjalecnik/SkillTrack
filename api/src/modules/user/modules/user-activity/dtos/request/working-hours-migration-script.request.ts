import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsInt, IsOptional, IsPositive } from "class-validator"
import { ParseParamArray, IsoDateStringToUtcDate } from "src/utils/class-transformer"

export class WorkingHoursMigrationScriptRequest {
	@ApiPropertyOptional({ example: [1], isArray: true })
	@IsOptional()
	@ParseParamArray()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	userIds?: number[]

	@ApiPropertyOptional({ example: "2025-01-01" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	fromDate?: Date
}
