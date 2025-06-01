import { HalResourceStandardResponse, UserShortHalResponse } from "src/utils/types/dtos";
import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum";
export declare class ActivityRequestEmbeddedHalBaseResponse extends HalResourceStandardResponse {
    user: UserShortHalResponse;
    actions?: UserActivityRequestActions[];
}
