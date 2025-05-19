import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsInt, IsOptional, IsPositive, MaxLength, Min, MinDate, Validate } from "class-validator"
import { DateToMMDDFormat, IsoDateStringToUtcDate } from "src/utils/class-transformer"
import { IsLessThanOrEqual } from "src/utils/class-validator/IsLessThanOrEqual"
import { DB_VARCHAR_LENGTH_128 } from "src/utils/constants"
import { DateHelper } from "src/utils/helpers/date.helper"

const previousYear = DateHelper.subtract(new Date(), 1, "years")
const startOfPreviousYear = DateHelper.getStartOfYear(previousYear)

export class UserAssignedVacationPatchRequest {
	@ApiPropertyOptional({ example: 1 })
	@IsInt()
	@IsPositive()
	@IsOptional()
	id?: number

	@ApiProperty({ example: 2024 })
	@IsInt()
	@IsPositive()
	@Min(1970)
	year!: number

	@ApiProperty({ example: 20 })
	@IsInt()
	@IsPositive()
	assignedDays!: number

	@ApiPropertyOptional({ example: "Description for assigned vacation" })
	@MaxLength(DB_VARCHAR_LENGTH_128)
	@IsOptional()
	description?: string

	@ApiPropertyOptional({ example: "02-01", description: "Date when old vacation expires (day and month are relevant and year is irrelevant)" })
	@IsOptional()
	@DateToMMDDFormat()
	oldVacationExpiration?: string

	@ApiPropertyOptional({ example: 17 })
	@IsOptional()
	@IsInt()
	@Min(0)
	@Validate(IsLessThanOrEqual, ["assignedDays"])
	initialUsedDays?: number

	@ApiPropertyOptional({ example: "2024-11-01" })
	@IsOptional()
	@IsoDateStringToUtcDate(10)
	@MinDate(startOfPreviousYear)
	initialDate?: Date
}
