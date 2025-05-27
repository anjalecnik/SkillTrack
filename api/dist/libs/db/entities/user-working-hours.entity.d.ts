import { UserWorkingHoursType } from "../../../utils/types/enums/user-working-hours.enum";
import { UserEntity } from "./user.entity";
import { UserActivityEntity } from "./user-activity.entity";
export declare class UserWorkingHoursEntity {
    id: number;
    type: UserWorkingHoursType;
    fromDateStart: Date;
    toDateEnd: Date | null;
    userId: number;
    user?: UserEntity;
    userActivities?: UserActivityEntity;
}
