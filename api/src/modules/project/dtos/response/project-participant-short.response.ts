import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ProjectUserRole } from "src/utils/types/enums/project-user-role.enum"

export class ProjectParticipantShortResponse {
	@ApiProperty({ description: "Participant id", example: 1 })
	id!: number

	@ApiProperty({ description: "Participant name", example: "Joe" })
	name!: string

	@ApiProperty({ description: "Participant surname", example: "The" })
	surname!: string

	@ApiPropertyOptional({ description: "Participant middle name", example: "Mishica" })
	middleName?: string

	@ApiProperty({ description: "Participant role", example: ProjectUserRole.Lead })
	projectRole!: ProjectUserRole
}
