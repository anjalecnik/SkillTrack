import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, ValidateNested } from "class-validator"
import { OverviewMonthlyProductivityResponse } from "./overview-monthly-productivity.response"

export class OverviewWorkingHoursResponse {
	@ApiPropertyOptional({ type: OverviewMonthlyProductivityResponse, description: "Monthly productivity metric (average hours worked)" })
	@IsOptional()
	@ValidateNested()
	@Type(() => OverviewMonthlyProductivityResponse)
	monthlyUserProductivity?: OverviewMonthlyProductivityResponse
}
