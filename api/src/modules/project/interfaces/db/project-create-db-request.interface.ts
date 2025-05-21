import { ProjectEntity } from "src/libs/db/entities/project.entity"

export interface IProjectCreateDBRequest extends Pick<ProjectEntity, "name" | "createdByUserId"> {}
