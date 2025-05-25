import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ProjectStatus } from "src/utils/types/enums/project-status.enum"

export interface IProjectOverviewPaginationItemResponse extends ProjectEntity {
	participants?: UserEntity[]
	status?: ProjectStatus
	totalHours?: number
}
