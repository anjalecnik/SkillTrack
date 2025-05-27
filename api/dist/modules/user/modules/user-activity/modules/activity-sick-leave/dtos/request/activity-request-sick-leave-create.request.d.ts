import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class ActivityRequestSickLeaveCreateRequest {
    activityType: UserActivityType.SickLeave;
    dateStart: Date;
    dateEnd: Date;
    description?: string;
}
