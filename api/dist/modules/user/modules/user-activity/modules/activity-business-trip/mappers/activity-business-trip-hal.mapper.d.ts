import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { ActivityBusinessTripListItemHalResponse } from "../dtos/response/activity-business-trip-list-item-hal.response";
import { ActivityRequestBusinessTripListItemHalResponse } from "../dtos/response/activity-request-business-trip-list-item-hal.response";
import { IActivityRequestBusinessTripEntityEnriched } from "../interfaces";
export declare abstract class ActivityBusinessTripHalMapper {
    static mapActivityListItem(data: UserActivityEntity): ActivityBusinessTripListItemHalResponse;
    static mapActivityRequestListItem(activityRequest: IActivityRequestBusinessTripEntityEnriched): ActivityRequestBusinessTripListItemHalResponse;
}
