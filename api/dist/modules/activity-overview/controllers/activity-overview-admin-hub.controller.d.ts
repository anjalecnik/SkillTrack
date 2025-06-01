import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { ActivityPerformanceReviewHalResponse } from "../dtos/response/activity-performance-review-hal.response";
import { ActivityPerformanceReviewFilterRequest } from "../dtos/request/activity-performance-review-filter.request";
import { ActivityOverviewService } from "../services/activity-overview.service";
export declare class ActivityOverviewAdminHubController {
    private readonly activityOverviewService;
    constructor(activityOverviewService: ActivityOverviewService);
    getPerformanceReviewRequestPagination(authPassport: IAuthJwtPassportUserRequest, filter: ActivityPerformanceReviewFilterRequest): Promise<ActivityPerformanceReviewHalResponse>;
}
