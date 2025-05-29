import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { IUserPerformanceReviewCreateRequest } from "../interfaces/user-performance-review-create.interface"
import { IUserPerformanceReviewCreateDBRequest } from "../interfaces/db/user-performance-review-create-db-request.interface"
import { IUserPerformanceReviewUpdateDBRequest } from "../interfaces/db/user-performance-review-update-db.request.interface"
import { IUserPerformanceReviewDeleteDBRequest } from "../interfaces/db/user-performance-review-delete-db-request.interface"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity"

@Injectable()
export class UserPerformanceReviewRepository {
	constructor(
		@InjectRepository(UserPerformanceReviewEntity)
		private readonly performanceReviewRepository: Repository<UserPerformanceReviewEntity>,
		@InjectRepository(UserActivityEntity)
		private readonly userActivityRepository: Repository<UserActivityEntity>
	) {}

	async getPerformanceReviewForQuartal(filters: IUserPerformanceReviewCreateRequest, performanceReviewIds: number[]): Promise<UserPerformanceReviewEntity[]> {
		return await this.performanceReviewRepository.find({
			where: {
				id: In(performanceReviewIds),
				year: filters.year,
				quartal: filters.quartal
			}
		})
	}

	async getPerformanceReviewsById(performanceReviewIds: number[]): Promise<UserPerformanceReviewEntity[]> {
		return await this.performanceReviewRepository.find({
			where: { id: In(performanceReviewIds) },
			order: {
				year: "DESC",
				quartal: "DESC"
			}
		})
	}

	async getPerformanceReviewIdByRequestId(activityRequestId: number): Promise<number> {
		const alias = "userActivity"
		const { performancereviewid: performanceReviewId } = await this.userActivityRepository
			.createQueryBuilder(alias)
			.select([`${alias}.performanceReviewId as performanceReviewId`])
			.where(`${alias}.activityRequestId = :activityRequestId`, { activityRequestId })
			.getRawOne()
		return performanceReviewId
	}

	async createPerformanceReview(userPerformanceReview: IUserPerformanceReviewCreateDBRequest): Promise<UserPerformanceReviewEntity> {
		const { answer1, answer2, answer3, answer4, quartal, year } = userPerformanceReview

		const scoreAnswer1 = ((5 - answer1) / 4) * 25 // 1 = 25pts, 5 = 0pts
		const scoreAnswer2 = ((5 - answer2) / 4) * 25
		const scoreAnswer3 = answer3 ? 0 : 25 // false = 25pts, true = 0pts
		const scoreAnswer4 = answer4 ? 25 : 0 // true = 25pts, false = 0pts

		const totalScore = scoreAnswer1 + scoreAnswer2 + scoreAnswer3 + scoreAnswer4

		return this.performanceReviewRepository.save({
			...userPerformanceReview,
			score: totalScore
		})
	}

	async updatePerformanceReview(userPerformanceReview: IUserPerformanceReviewUpdateDBRequest): Promise<UserPerformanceReviewEntity> {
		const filteredUserPerformanceReview = Object.fromEntries(
			Object.entries(userPerformanceReview).filter(([key]) => ["answer1", "answer2", "answer3", "answer4", "quartal", "year"].includes(key as keyof UserPerformanceReviewEntity))
		)

		const { answer1, answer2, answer3, answer4 } = filteredUserPerformanceReview as Pick<UserPerformanceReviewEntity, "answer1" | "answer2" | "answer3" | "answer4">

		const scoreAnswer1 = ((5 - answer1) / 4) * 25
		const scoreAnswer2 = ((5 - answer2) / 4) * 25
		const scoreAnswer3 = answer3 ? 0 : 25
		const scoreAnswer4 = answer4 ? 25 : 0

		const score = scoreAnswer1 + scoreAnswer2 + scoreAnswer3 + scoreAnswer4

		await this.performanceReviewRepository.update(userPerformanceReview.id, {
			...filteredUserPerformanceReview,
			score
		})

		return this.performanceReviewRepository.findOneOrFail({ where: { id: userPerformanceReview.id } })
	}

	async deletePerformanceReview(userPerformanceReview: IUserPerformanceReviewDeleteDBRequest): Promise<void> {
		await this.performanceReviewRepository.delete(userPerformanceReview.id)
	}
}
