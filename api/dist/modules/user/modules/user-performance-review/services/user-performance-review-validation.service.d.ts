import { UserPerformanceReviewRepository } from "../repository/user-performance-review.repository";
import { IUserPerformanceReviewCreateRequest } from "../interfaces/user-performance-review-create.interface";
export declare class UserPerformanceReviewValidationService {
    private readonly userPerformanceReviewRepository;
    constructor(userPerformanceReviewRepository: UserPerformanceReviewRepository);
    preCreateSaveValidation(performanceReviewRequest: IUserPerformanceReviewCreateRequest, performanceReviewIds: number[]): Promise<void>;
}
