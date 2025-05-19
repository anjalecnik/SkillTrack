import { ApiProperty } from "@nestjs/swagger"

export class UserVacationStatisticDataResponse {
	@ApiProperty({ description: "Used vacation days", example: 5 })
	usedDays!: number

	@ApiProperty({ description: "Total available vacation days", example: 15 })
	availableDays?: number

	@ApiProperty({ description: "Total assigned vacation days", example: 20 })
	assignedDays?: number
}
