import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { ActivityExpenseListItemHalResponse } from "../dtos/response/activity-expense-list-item-hal.response";
import { ActivityRequestExpenseListItemHalResponse } from "../dtos/response/activity-request-expense-list-item-hal.response";
import { IActivityRequestExpenseEntityEnriched } from "../interfaces";
export declare abstract class ActivityExpenseHalMapper {
    static mapActivityListItem(data: UserActivityEntity): ActivityExpenseListItemHalResponse;
    static mapActivityRequestListItem(activityRequest: IActivityRequestExpenseEntityEnriched): ActivityRequestExpenseListItemHalResponse;
}
