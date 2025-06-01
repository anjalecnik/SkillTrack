import { ProjectEntity } from "src/libs/db/entities/project.entity";
export interface IProjectPatchDBRequest extends Required<Pick<ProjectEntity, "id" | "updatedByUserId">>, Partial<Pick<ProjectEntity, "name" | "type" | "dateStart" | "dateEnd">> {
}
