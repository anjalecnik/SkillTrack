import { IActivityDailyCreateDBRequest, IActivityDailyDB, IActivityDailyWithWorkingHours } from "../../user-activity/modules/activity-daily/interfaces";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserWorkingHoursListItemResponse } from "../dtos/response/user-working-hours-list-item.response";
import { UserWorkingHoursResponse } from "../dtos/response/user-working-hours.response";
import { IUserWorkingHoursDateTimeCreateRequest, IActivityDailyCreateDBRequestNullable } from "../interfaces";
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity";
export declare abstract class UserWorkingHoursMapper {
    static mapUserWorkingHoursListItem(activity: IActivityDailyDB): UserWorkingHoursListItemResponse;
    static mapUserWorkingHoursList(activities: IActivityDailyDB[]): UserWorkingHoursListItemResponse[] | undefined;
    static mapAndCombineActivities(existingDailyActivities: UserActivityEntity[], createRequest: IUserWorkingHoursDateTimeCreateRequest): IActivityDailyCreateDBRequestNullable[];
    static mapWorkingHoursActivityCreateRequest(createRequest: IUserWorkingHoursDateTimeCreateRequest): UserWorkingHoursResponse;
    static mapActivitiesToWorkingHours(activities: IActivityDailyCreateDBRequest[] | IActivityDailyCreateDBRequestNullable[], workingHours: UserWorkingHoursResponse[]): IActivityDailyWithWorkingHours[];
    static mapWorkingHoursUpdateWorkEnd(createRequest: IUserWorkingHoursDateTimeCreateRequest, existingWorkingHours: UserWorkingHoursEntity): UserWorkingHoursEntity;
}
