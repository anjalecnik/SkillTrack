import { ICreatedAtEntity, IDeletedAtEntity } from "./interfaces/date.interface.entity";
import { ProjectUserRole } from "../../../utils/types/enums/project-user-role.enum";
import { ProjectEntity } from "./project.entity";
import { UserEntity } from "./user.entity";
export declare class ProjectUserEntity implements ICreatedAtEntity, IDeletedAtEntity {
    id: number;
    role: ProjectUserRole;
    assignedPercentage: number;
    createdAt: Date;
    deletedAt?: Date | null;
    projectId: number;
    userId: number;
    project?: ProjectEntity;
    user?: UserEntity;
}
