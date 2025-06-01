import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { ActivityRequestVacationListItemHalResponse } from "../dtos/response/activity-request-vacation-list-item-hal.response";
import { ActivityVacationListItemHalResponse } from "../dtos/response/activity-vacation-list-item-hal.response";
import { IActivityRequestVacationEntityEnriched } from "../interfaces";
export declare abstract class ActivityVacationHalMapper {
    static mapActivityListItem(data: UserActivityEntity): ActivityVacationListItemHalResponse;
    static mapActivityRequestListItem(activityRequest: IActivityRequestVacationEntityEnriched): ActivityRequestVacationListItemHalResponse;
}
