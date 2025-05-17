import { ApiProperty } from "@nestjs/swagger"
import { IsDate, Validate } from "class-validator"
import { IsoDateObjectToUtcDate } from "../../class-transformer"
import { IsBeforeDate } from "../../class-validator"
import { IDateRange } from "../interfaces"

export class DateRange implements IDateRange {
	@ApiProperty()
	@IsoDateObjectToUtcDate()
	@IsDate()
	@Validate(IsBeforeDate, ["toDateEnd"])
	fromDateStart!: Date

	@ApiProperty()
	@IsoDateObjectToUtcDate()
	@IsDate()
	toDateEnd!: Date
}
