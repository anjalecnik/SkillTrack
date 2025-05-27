import { UserPerformanceReviewRepository } from "../repository/user-performance-review.repository";
import { IUserPerformanceReviewCreateRequest } from "../interfaces/user-performance-review-create.interface";
import { IUserPerformanceReviewUpdateRequest } from "../interfaces/user-performance-review-update.interface";
import { IUserPerformanceReviewDeleteRequest } from "../interfaces/user-performance-review-delete.interface";
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity";
export declare class UserPerformanceReviewService {
    private readonly userPerformanceReviewRepository;
    constructor(userPerformanceReviewRepository: UserPerformanceReviewRepository);
    getPerformanceReviewsById(performanceReviewIds: number[]): Promise<UserPerformanceReviewEntity[]>;
    getPerformanceReviewIdByRequestId(activityRequestId: number): Promise<number>;
    createPerformanceReview(performanceReviewCreateRequest: IUserPerformanceReviewCreateRequest): Promise<UserPerformanceReviewEntity>;
    updatePerformanceReview(performanceReviewUpdateRequest: IUserPerformanceReviewUpdateRequest): Promise<UserPerformanceReviewEntity>;
    deletePerformanceReview(performanceReviewUpdateRequest: IUserPerformanceReviewDeleteRequest): Promise<void>;
}
