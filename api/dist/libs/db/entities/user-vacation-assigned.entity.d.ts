import { IDatesAllEntity } from "./interfaces/date.interface.entity";
import { ICreatedUpdatedDeletedByUserIdEntity } from "./interfaces/user-id.interface.entity";
import { UserActivityEntity } from "./user-activity.entity";
import { UserEntity } from "./user.entity";
export declare class UserVacationAssignedEntity implements IDatesAllEntity, ICreatedUpdatedDeletedByUserIdEntity {
    id: number;
    year: number;
    assignedDays: number | null;
    description?: string;
    oldVacationExpiration: string | null;
    initialUsedDays: number | null;
    initialDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    createdByUserId?: number | null;
    updatedByUserId?: number | null;
    vacations?: UserActivityEntity[];
    user?: UserEntity;
    createdByUser?: UserEntity;
    updatedByUser?: UserEntity;
}
