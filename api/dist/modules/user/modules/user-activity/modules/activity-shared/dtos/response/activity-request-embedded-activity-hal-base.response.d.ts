import { HalResourceResponse } from "src/utils/types/dtos";
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
export declare class ActivityRequestEmbeddedActivityHalBaseResponse extends HalResourceResponse {
    id: number;
    date: string;
    status: UserActivityStatus;
}
