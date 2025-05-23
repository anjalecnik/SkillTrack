import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsInt, IsOptional, IsPositive } from "class-validator"
import { IsoDateStringToUtcDate, ParseParamArray } from "src/utils/class-transformer"

export class InsertUnassignedActivitiesFilterRequest {
	@ApiPropertyOptional({ example: [1], isArray: true })
	@IsOptional()
	@ParseParamArray()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	userIds?: number[]

	@ApiProperty({ example: "2025-01-01" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	fromDate!: Date

	@ApiProperty({ example: "2025-01-31" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	toDate!: Date
}
