import { ApiProperty } from "@nestjs/swagger"
import { IsISO8601, IsMilitaryTime, Length } from "class-validator"

export class DateTimeWithoutTimezoneRequest {
	@ApiProperty({ description: "Date part of DateTime object", example: "2024-01-01" })
	@IsISO8601({ strict: true })
	@Length(10, 10)
	date!: string

	@ApiProperty({ description: "Time part of DateTime object", example: "07:58" })
	@IsMilitaryTime()
	time!: string
}
