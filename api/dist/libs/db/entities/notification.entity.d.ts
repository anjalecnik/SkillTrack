import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity";
import { UserEntity } from "./user.entity";
import { NotificationStatus } from "../../../utils/types/enums/notification-status.enum";
import { NotificationType } from "../../../utils/types/enums/notficiation.enum";
import { UserActivityRequestEntity } from "./user-activity-request.entity";
export declare class NotificationEntity implements ICreatedAtEntity, IUpdatedAtEntity {
    id: number;
    sendSchedule: string | null;
    scheduledJobName: string | null;
    status: NotificationStatus;
    type: NotificationType;
    errorMessage?: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId?: number | null;
    userActivityRequestId?: number | null;
    user?: UserEntity;
    userActivityRequest?: UserActivityRequestEntity;
}
