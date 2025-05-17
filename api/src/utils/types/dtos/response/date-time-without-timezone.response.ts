import { ApiProperty } from "@nestjs/swagger"

export class DateTimeWithoutTimezoneResponse {
	@ApiProperty({ description: "Date part of DateTime object", example: "2024-01-01" })
	date!: string

	@ApiProperty({ description: "Time part of DateTime object", example: "07:58" })
	time!: string
}
