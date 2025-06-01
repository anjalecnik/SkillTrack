import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { ActivityLunchListItemHalResponse } from "../dtos/response/activity-lunch-list-item-hal.response";
export declare abstract class ActivityLunchHalMapper {
    static mapActivityListItem(activity: UserActivityEntity): ActivityLunchListItemHalResponse;
}
