import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity"

export type IWorkPositionPatchDBRequest = Required<Pick<WorkPositionEntity, "id" | "updatedByUserId">> &
	Partial<Pick<WorkPositionEntity, "name" | "level" | "description" | "workPositionPromotionId">>
