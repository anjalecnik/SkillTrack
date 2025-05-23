import { BadRequestException, Injectable } from "@nestjs/common"
import { UserPerformanceReviewRepository } from "../repository/user-performance-review.repository"
import { IUserPerformanceReviewCreateRequest } from "../interfaces/user-performance-review-create.interface"

@Injectable()
export class UserPerformanceReviewValidationService {
	constructor(private readonly userPerformanceReviewRepository: UserPerformanceReviewRepository) {}

	async preCreateSaveValidation(performanceReviewRequest: IUserPerformanceReviewCreateRequest, performanceReviewIds: number[]): Promise<void> {
		const reviews = await this.userPerformanceReviewRepository.getPerformanceReviewForQuartal(performanceReviewRequest, performanceReviewIds)
		if (reviews.length) throw new BadRequestException(`This user already has a review for ${performanceReviewRequest.quartal} of ${performanceReviewRequest.year}.`)
	}
}
