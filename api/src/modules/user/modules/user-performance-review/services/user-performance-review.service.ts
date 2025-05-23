import { Injectable } from "@nestjs/common"
import { UserPerformanceReviewRepository } from "../repository/user-performance-review.repository"
import { IUserPerformanceReviewCreateRequest } from "../interfaces/user-performance-review-create.interface"
import { IUserPerformanceReviewUpdateRequest } from "../interfaces/user-performance-review-update.interface"
import { IUserPerformanceReviewDeleteRequest } from "../interfaces/user-performance-review-delete.interface"
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity"

@Injectable()
export class UserPerformanceReviewService {
	constructor(private readonly userPerformanceReviewRepository: UserPerformanceReviewRepository) {}

	async getPerformanceReviewsById(performanceReviewIds: number[]): Promise<UserPerformanceReviewEntity[]> {
		return this.userPerformanceReviewRepository.getPerformanceReviewsById(performanceReviewIds)
	}

	async getPerformanceReviewIdByRequestId(activityRequestId: number): Promise<number> {
		return this.userPerformanceReviewRepository.getPerformanceReviewIdByRequestId(activityRequestId)
	}

	async createPerformanceReview(performanceReviewCreateRequest: IUserPerformanceReviewCreateRequest): Promise<UserPerformanceReviewEntity> {
		return this.userPerformanceReviewRepository.createPerformanceReview(performanceReviewCreateRequest)
	}

	async updatePerformanceReview(performanceReviewUpdateRequest: IUserPerformanceReviewUpdateRequest): Promise<UserPerformanceReviewEntity> {
		return this.userPerformanceReviewRepository.updatePerformanceReview(performanceReviewUpdateRequest)
	}

	async deletePerformanceReview(performanceReviewUpdateRequest: IUserPerformanceReviewDeleteRequest): Promise<void> {
		await this.userPerformanceReviewRepository.deletePerformanceReview(performanceReviewUpdateRequest)
	}
}
