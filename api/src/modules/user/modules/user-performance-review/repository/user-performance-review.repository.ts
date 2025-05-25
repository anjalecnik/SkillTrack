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
		return this.performanceReviewRepository.save({
			...userPerformanceReview
		})
	}

	async updatePerformanceReview(userPerformanceReview: IUserPerformanceReviewUpdateDBRequest): Promise<UserPerformanceReviewEntity> {
		const filteredUserPerformanceReview = Object.fromEntries(
			Object.entries(userPerformanceReview).filter(([key]) => ["answer1", "answer2", "answer3", "answer4", "quartal", "year"].includes(key as keyof UserPerformanceReviewEntity))
		)
		await this.performanceReviewRepository.update(userPerformanceReview.id, {
			...filteredUserPerformanceReview
		})

		return this.performanceReviewRepository.findOneOrFail({ where: { id: userPerformanceReview.id } })
	}

	async deletePerformanceReview(userPerformanceReview: IUserPerformanceReviewDeleteDBRequest): Promise<void> {
		await this.performanceReviewRepository.delete(userPerformanceReview.id)
	}
}
