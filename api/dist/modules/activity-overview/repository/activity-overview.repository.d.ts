import { Repository } from "typeorm";
import { ActivityPerformanceReviewPaginationFilterDBRequest } from "../interfaces/db/activity-performance-review-filter-db.interface";
import { IPaginatedResponse } from "src/utils/types/interfaces";
import { UserWithActivitiesPerformanceReview } from "../dtos/response/activity-performance-review-user.response";
import { IUserWithActivitiesPerformanceReview } from "../interfaces/activity-performance-review-hal-response.interface";
export declare class ActivityOverviewRepository {
    private readonly userPerformanceReviewRepository;
    constructor(userPerformanceReviewRepository: Repository<IUserWithActivitiesPerformanceReview>);
    getPerformanceReviewListPagination(filters: ActivityPerformanceReviewPaginationFilterDBRequest): Promise<IPaginatedResponse<UserWithActivitiesPerformanceReview>>;
    private setOrder;
}
