import { WorkPositionLevel } from "../../../utils/types/enums/work-position.enum";
import { UserEntity } from "./user.entity";
import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity";
import { ICreatedByUserIdEntity, IUpdatedByUserIdEntity } from "./interfaces/user-id.interface.entity";
export declare class WorkPositionEntity implements ICreatedByUserIdEntity, IUpdatedByUserIdEntity, ICreatedAtEntity, IUpdatedAtEntity {
    id: number;
    name: string;
    level: WorkPositionLevel;
    description: string;
    workPositionPromotionId?: number | null;
    createdByUserId: number;
    updatedByUserId: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: UserEntity;
    updatedBy?: UserEntity;
    user?: UserEntity[];
    parentWorkPosition?: WorkPositionEntity;
    childWorkPosition?: WorkPositionEntity[];
}
