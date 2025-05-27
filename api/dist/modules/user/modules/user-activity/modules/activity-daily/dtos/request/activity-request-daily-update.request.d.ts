import { UserWorkingHoursDailyCreateRequest } from "../../../../../user-working-hours/dtos/request/user-working-hours-daily-create.request";
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class ActivityRequestDailyUpdateRequest {
    activityType: UserActivityType.Daily;
    date: Date;
    workLocation: UserActivityWorkLocation;
    lunch: boolean;
    workingHours: UserWorkingHoursDailyCreateRequest[];
}
