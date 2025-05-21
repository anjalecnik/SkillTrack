import { ProjectEntity } from "src/libs/db/entities/project.entity"

export type IProjectGetDBRequest = Pick<ProjectEntity, "id">
