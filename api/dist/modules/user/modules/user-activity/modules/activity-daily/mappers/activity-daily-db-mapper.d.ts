import { IActivityDailyCreateDBRequest, IActivityDailyWithWorkingHours, IActivityRequestDailyCreateDBRequest, IActivityRequestDailyCreateRequest, IActivityRequestDailyUpdateRequest } from "../interfaces";
import { UserWorkingHoursResponse } from "../../../../user-working-hours/dtos/response/user-working-hours.response";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export declare abstract class ActivityDailyDBMapper {
    static createActivityRequest(createActivityRequest: IActivityRequestDailyCreateRequest): {
        activityRequest: IActivityRequestDailyCreateDBRequest;
        activities: IActivityDailyCreateDBRequest[];
    };
    static mapUpdateActivityRequest(updateActivityRequest: IActivityRequestDailyUpdateRequest, existingActivityRequest: UserActivityRequestEntity, workingHours: UserWorkingHoursResponse[]): IActivityDailyWithWorkingHours[];
    static mapActivitiesToWorkingHours(activities: UserActivityEntity[], workingHours: UserWorkingHoursResponse[]): IActivityDailyWithWorkingHours[];
    static createNewActivitiesFromRemainingHours(updateRequest: IActivityRequestDailyUpdateRequest, remainingWorkingHours: UserWorkingHoursResponse[]): IActivityDailyWithWorkingHours[];
}
