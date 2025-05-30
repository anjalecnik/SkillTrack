import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"

export interface IRawData {
	usersWithProjects: UserWithProject[]
	activitiesWithoutProject: UserActivityEntity[]
	activitiesWithProject: UserActivityEntity[]
}

export interface UserWithProject {
	user: UserEntity
	projects: ProjectEntity[]
}
