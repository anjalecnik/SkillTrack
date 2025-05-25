import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsOptional } from "class-validator"
import { IsoDateStringToUtcDate } from "src/utils/class-transformer"

export class ActivityRequestLastDailyRequestFilterRequest {
	@ApiPropertyOptional({ example: "2024-01-01" })
	@IsOptional()
	@IsoDateStringToUtcDate(10)
	@IsDate()
	date?: Date
}
