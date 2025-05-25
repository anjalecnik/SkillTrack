import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ProjectStatus } from "src/utils/types/enums/project-status.enum"

export interface IProjectOverviewResponse {
	projectEntity: ProjectEntity
	projectParticipantEntities: UserEntity[]
	status: ProjectStatus
	totalHours: number
}
