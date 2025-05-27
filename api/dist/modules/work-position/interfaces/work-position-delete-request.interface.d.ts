import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity";
export interface IWorkPositionDeleteRequest extends Required<Pick<WorkPositionEntity, "id">> {
    userId: number;
}
