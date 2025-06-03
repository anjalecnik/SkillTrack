import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsInt, IsPositive, IsOptional } from "class-validator"

export class OverviewPositionDistributionResponse {
	@ApiPropertyOptional({ example: 30, description: "Number of employees working as Cloud Infrastructure Engineers" })
	@IsInt()
	@IsPositive()
	@IsOptional()
	cloud?: number

	@ApiPropertyOptional({ example: 20, description: "Number of employees working as Database Engineers" })
	@IsInt()
	@IsPositive()
	@IsOptional()
	database?: number

	@ApiPropertyOptional({ example: 50, description: "Number of employees in other roles not categorized above" })
	@IsInt()
	@IsPositive()
	@IsOptional()
	other?: number
}
