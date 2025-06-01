import { Repository } from "typeorm";
import { IUserPerformanceReviewCreateRequest } from "../interfaces/user-performance-review-create.interface";
import { IUserPerformanceReviewCreateDBRequest } from "../interfaces/db/user-performance-review-create-db-request.interface";
import { IUserPerformanceReviewUpdateDBRequest } from "../interfaces/db/user-performance-review-update-db.request.interface";
import { IUserPerformanceReviewDeleteDBRequest } from "../interfaces/db/user-performance-review-delete-db-request.interface";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity";
export declare class UserPerformanceReviewRepository {
    private readonly performanceReviewRepository;
    private readonly userActivityRepository;
    constructor(performanceReviewRepository: Repository<UserPerformanceReviewEntity>, userActivityRepository: Repository<UserActivityEntity>);
    getPerformanceReviewForQuartal(filters: IUserPerformanceReviewCreateRequest, performanceReviewIds: number[]): Promise<UserPerformanceReviewEntity[]>;
    getPerformanceReviewsById(performanceReviewIds: number[]): Promise<UserPerformanceReviewEntity[]>;
    getPerformanceReviewIdByRequestId(activityRequestId: number): Promise<number>;
    createPerformanceReview(userPerformanceReview: IUserPerformanceReviewCreateDBRequest): Promise<UserPerformanceReviewEntity>;
    updatePerformanceReview(userPerformanceReview: IUserPerformanceReviewUpdateDBRequest): Promise<UserPerformanceReviewEntity>;
    deletePerformanceReview(userPerformanceReview: IUserPerformanceReviewDeleteDBRequest): Promise<void>;
}
