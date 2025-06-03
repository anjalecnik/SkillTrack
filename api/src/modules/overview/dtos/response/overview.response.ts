import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsPositive, IsOptional, IsNumber, ValidateNested } from "class-validator"
import { OverviewPositionDistributionResponse } from "./overview-position-distribution.response"

export class OverviewResponse {
	@ApiPropertyOptional({ example: 42, description: "Total number of active members or employees in the organization" })
	@IsInt()
	@IsPositive()
	members: number

	@ApiPropertyOptional({ example: 7, description: "Total number of ongoing or registered projects" })
	@IsInt()
	@IsPositive()
	projects: number

	@ApiPropertyOptional({ example: 76.5, description: "Overall task completion rate (percentage of completed tasks from Jira or task system)" })
	@IsPositive()
	taskProgress: number

	@ApiPropertyOptional({ type: OverviewPositionDistributionResponse, description: "Breakdown of employees by job position" })
	@IsOptional()
	@ValidateNested()
	@Type(() => OverviewPositionDistributionResponse)
	positionDistribution?: OverviewPositionDistributionResponse
}
