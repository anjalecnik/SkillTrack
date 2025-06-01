import { UserWorkingHoursDailyCreateRequest } from "../../../../../user-working-hours/dtos/request/user-working-hours-daily-create.request";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum";
export declare class ActivityRequestDailyCreateRequest {
    activityType: UserActivityType.Daily;
    date: Date;
    workLocation: UserActivityWorkLocation;
    lunch: boolean;
    workingHours: UserWorkingHoursDailyCreateRequest[];
}
