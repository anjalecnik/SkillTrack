import { ProjectEntity } from "src/libs/db/entities/project.entity";
export interface IProjectDeleteDBRequest extends Required<Pick<ProjectEntity, "deletedByUserId">> {
    ids: number[];
}
