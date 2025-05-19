import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity"

export type IWorkPositionCreateDBRequest = Required<Pick<WorkPositionEntity, "createdByUserId" | "updatedByUserId" | "name" | "level" | "description">> &
	Partial<Pick<WorkPositionEntity, "workPositionPromotionId">>
