import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class ActivityRequestVacationCreateRequest {
    activityType: UserActivityType.Vacation;
    dateStart: Date;
    dateEnd: Date;
    description?: string;
}
