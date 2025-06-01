import { IDatesAllEntity } from "./interfaces/date.interface.entity";
import { ICreatedUpdatedDeletedByUserIdEntity } from "./interfaces/user-id.interface.entity";
import { ProjectType } from "../../../utils/types/enums/project.enum";
import { UserEntity } from "./user.entity";
import { UserActivityEntity } from "./user-activity.entity";
import { ProjectUserEntity } from "./project-user.entity";
import { UserActivityRequestEntity } from "./user-activity-request.entity";
export declare class ProjectEntity implements IDatesAllEntity, ICreatedUpdatedDeletedByUserIdEntity {
    id: number;
    name: string;
    type?: ProjectType | null;
    dateStart: Date;
    dateEnd: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    createdByUserId: number;
    updatedByUserId: number;
    deletedByUserId?: number | null;
    createdByUser?: UserEntity;
    updatedByUser?: UserEntity;
    deletedByUser?: UserEntity;
    users?: ProjectUserEntity[];
    userActivity?: UserActivityEntity[];
    activityRequests?: UserActivityRequestEntity[];
}
