import { ApiProperty } from "@nestjs/swagger"
import { ProjectUserRole } from "src/utils/types/enums/project-user-role.enum"

export class UserProjectsShortResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ description: "Name of project", example: "Jam system jam downtown studio project" })
	name!: string

	@ApiProperty({ description: "User role", example: ProjectUserRole.Lead })
	role!: ProjectUserRole

	@ApiProperty({ description: "Assigner percentage for project", example: 50 })
	assignedPercentage!: number

	@ApiProperty({ example: "2024-10-20" })
	startDate!: string

	@ApiProperty({ example: "2024-11-11" })
	endDate?: string
}
