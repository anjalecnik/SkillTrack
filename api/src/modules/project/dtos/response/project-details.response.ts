import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ProjectStatus } from "src/utils/types/enums/project-status.enum"
import { ProjectType } from "src/utils/types/enums/project.enum"
import { ProjectParticipantShortResponse } from "./project-participant-short.response"

export class ProjectDetailsResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ description: "Name of project", example: "Jam system jam downtown studio project" })
	name!: string

	@ApiProperty({ example: ProjectStatus.Active, enum: ProjectStatus })
	status!: ProjectStatus

	@ApiPropertyOptional({ example: ProjectType.Internal, enum: ProjectType })
	type?: ProjectType

	@ApiProperty({ example: "2024-11-11" })
	dateStart!: string

	@ApiPropertyOptional({ example: "2024-11-12" })
	dateEnd?: string

	@ApiProperty({ type: ProjectParticipantShortResponse, isArray: true })
	participants?: ProjectParticipantShortResponse[]

	@ApiProperty({ example: 1245 })
	totalHours!: number

	@ApiProperty({ example: 139 })
	totalDays!: number
}
