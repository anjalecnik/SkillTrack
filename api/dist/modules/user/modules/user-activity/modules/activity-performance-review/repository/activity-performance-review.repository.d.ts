import { Repository } from "typeorm";
import { IActivityRequestPerformanceReviewCreateDBRequest } from "../interfaces/db/activity-request-performance-review-create-db.interface";
import { IActivityPerformanceReviewCreateDBRequest } from "../interfaces/db/activity-performance-review-create-db.interface";
import { IActivityRequestPerformanceReviewCreateRequest } from "../interfaces/activity-request-performance-review-create.interface";
import { IActivityRequestPerformanceReviewListRequest } from "../interfaces/activity-request-performance-review-list.interface";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
export declare class ActivityPerformanceReviewRepository {
    private readonly masterDataSource;
    private readonly activityRepository;
    constructor(masterDataSource: MasterDataSource, activityRepository: Repository<UserActivityEntity>);
    createActivityRequest(createActivityRequest: IActivityRequestPerformanceReviewCreateDBRequest, createActivity: IActivityPerformanceReviewCreateDBRequest, performanceReviewId: number): Promise<UserActivityRequestEntity>;
    updateActivityRequest(activityRequestId: number): Promise<UserActivityRequestEntity>;
    getPerformanceReviewActivities(filters: IActivityRequestPerformanceReviewCreateRequest): Promise<number[]>;
    getPerformanceReviewActivitiesForUser(filters: IActivityRequestPerformanceReviewListRequest): Promise<UserActivityEntity[]>;
}
