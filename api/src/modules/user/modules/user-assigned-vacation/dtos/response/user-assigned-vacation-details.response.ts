import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class UserAssignedVacationDetailsResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: 2024 })
	year!: number

	@ApiPropertyOptional({ example: 20 })
	assignedDays?: number

	@ApiPropertyOptional({ example: "Description for assigned vacation" })
	description?: string

	@ApiPropertyOptional({ example: "06-30" })
	oldVacationExpiration?: string

	@ApiPropertyOptional({ example: 17 })
	initialUsedDays?: number

	@ApiPropertyOptional({ example: "2024-11-01" })
	initialDate?: Date
}
