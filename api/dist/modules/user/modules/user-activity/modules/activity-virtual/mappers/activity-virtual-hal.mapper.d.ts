import { ActivityVirtualListItemHalResponse } from "../dtos/response/activity-virtual-list-item-hal.response";
import { IUserVirtualActivity } from "../interfaces";
export declare abstract class ActivityVirtualHalMapper {
    static mapActivityListItem(data: IUserVirtualActivity): ActivityVirtualListItemHalResponse;
}
