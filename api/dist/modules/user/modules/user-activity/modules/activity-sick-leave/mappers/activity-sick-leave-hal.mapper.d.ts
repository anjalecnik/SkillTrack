import { ActivityRequestSickLeaveListItemHalResponse } from "../dtos/response/activity-request-sick-leave-list-item-hal.response";
import { ActivitySickLeaveListItemHalResponse } from "../dtos/response/activity-sick-leave-list-item-hal.response";
import { IActivityRequestSickLeaveEntityEnriched } from "../interfaces";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export declare abstract class ActivitySickLeaveHalMapper {
    static mapActivityListItem(data: UserActivityEntity): ActivitySickLeaveListItemHalResponse;
    static mapActivityRequestListItem(activityRequest: IActivityRequestSickLeaveEntityEnriched): ActivityRequestSickLeaveListItemHalResponse;
}
