import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { UserActivityRepository } from "src/modules/user/modules/user-activity/repository/user-activity.repository";
import { UtilityService } from "src/modules/utility/services/utility.service";
import { IPaginatedResponse } from "src/utils/types/interfaces";
import { UserWithActivitiesPerformanceReview } from "../dtos/response/activity-performance-review-user.response";
import { ActivityPerformanceReviewPaginationFilterDBRequest } from "../interfaces/db/activity-performance-review-filter-db.interface";
import { ActivityOverviewRepository } from "../repository/activity-overview.repository";
export declare class ActivityOverviewService {
    private readonly activityOverviewRepository;
    private readonly userActivityRepository;
    private readonly utilityService;
    constructor(activityOverviewRepository: ActivityOverviewRepository, userActivityRepository: UserActivityRepository, utilityService: UtilityService);
    getPerformanceReviewPaginationUserHub(userInvoker: IAuthJwtPassportUserRequest, filters: ActivityPerformanceReviewPaginationFilterDBRequest): Promise<IPaginatedResponse<UserWithActivitiesPerformanceReview>>;
    getPerformanceReviewPaginationAdminHub(userInvoker: IAuthJwtPassportUserRequest, filters: ActivityPerformanceReviewPaginationFilterDBRequest): Promise<IPaginatedResponse<UserWithActivitiesPerformanceReview>>;
    private getPerformanceReviewPagination;
    private filterUsersAdminHub;
    private filterUsersUserHub;
}
