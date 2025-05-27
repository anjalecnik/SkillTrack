import { HalResourceResponse } from "src/utils/types/dtos";
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class ActivityRequestListItemHalBaseResponse extends HalResourceResponse {
    id: number;
    activityType: UserActivityType;
    status: UserActivityStatus;
    reportedByUserId: number;
    createdAt: string;
}
