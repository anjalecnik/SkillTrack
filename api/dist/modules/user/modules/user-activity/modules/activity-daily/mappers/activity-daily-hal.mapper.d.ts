import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserActivityLastDailyRequestResponse } from "../../../dtos/response/user-activity-last-daily-request.response";
import { ActivityDailyListItemHalResponse } from "../dtos/response/activity-daily-list-item-hal.response";
import { ActivityRequestDailyListItemHalResponse } from "../dtos/response/activity-request-daily-list-item-hal.response";
import { IActivityRequestDailyEntityEnriched } from "../interfaces";
import { IUserActivityDailyEnriched } from "../interfaces/db/activity-daily-enriched.interface";
export declare abstract class ActivityDailyHalMapper {
    static mapActivityListItem(data: UserActivityEntity | IUserActivityDailyEnriched): ActivityDailyListItemHalResponse;
    static mapActivityRequestListItem(activityRequest: IActivityRequestDailyEntityEnriched): ActivityRequestDailyListItemHalResponse;
    static mapPrefillActivityRequestListItem(activityRequest: IActivityRequestDailyEntityEnriched): ActivityRequestDailyListItemHalResponse;
    static mapLastDailyActivityRequestHal(lastDaily: IActivityRequestDailyEntityEnriched | undefined): UserActivityLastDailyRequestResponse | undefined;
}
