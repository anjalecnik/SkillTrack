import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsOptional, IsNumber } from "class-validator"

export class OverviewMonthlyProductivityResponse {
	@ApiPropertyOptional({
		example: [120, 135, 150],
		description: "Monthly productivity data for the current year (in hours)"
	})
	@IsArray()
	@IsNumber({}, { each: true })
	@IsOptional()
	thisYear?: number[]

	@ApiPropertyOptional({
		example: [110, 140, 130],
		description: "Monthly productivity data for the previous year (in hours)"
	})
	@IsArray()
	@IsNumber({}, { each: true })
	@IsOptional()
	lastYear?: number[]
}
