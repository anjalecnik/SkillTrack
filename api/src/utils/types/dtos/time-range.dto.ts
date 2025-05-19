import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsMilitaryTime, IsOptional, Validate } from "class-validator"
import { IsAfterTime } from "../../class-validator/IsAfterTime"
import { ITimeRange } from "../interfaces/time-range.interface"

export class TimeRange implements ITimeRange {
	@ApiProperty()
	@IsMilitaryTime()
	fromTimeStart!: string

	@ApiPropertyOptional()
	@IsMilitaryTime()
	@IsOptional()
	@Validate(IsAfterTime, ["fromTimeStart"])
	toTimeEnd: string | null = null
}
