import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ProjectStatus } from "src/utils/types/enums/project-status.enum"
import { ProjectParticipantShortResponse } from "./project-participant-short.response"

export class ProjectOverviewListItemResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ description: "Name of workspace project", example: "Jam system jam downtown studio project" })
	name!: string

	@ApiPropertyOptional({ example: ProjectStatus.Active })
	status?: ProjectStatus

	@ApiProperty({ example: "2024-11-11" })
	dateStart!: string

	@ApiPropertyOptional({ example: "2024-11-12" })
	dateEnd?: string

	@ApiPropertyOptional({ type: ProjectParticipantShortResponse, isArray: true })
	participants?: ProjectParticipantShortResponse[]

	@ApiPropertyOptional({ example: 1245 })
	totalHours?: number
}
