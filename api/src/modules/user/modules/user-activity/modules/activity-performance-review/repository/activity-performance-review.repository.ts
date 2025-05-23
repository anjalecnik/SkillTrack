import { Injectable } from "@nestjs/common"
import { EntityManager, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm"
import { IActivityRequestPerformanceReviewCreateDBRequest } from "../interfaces/db/activity-request-performance-review-create-db.interface"
import { IActivityPerformanceReviewCreateDBRequest } from "../interfaces/db/activity-performance-review-create-db.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { IActivityRequestPerformanceReviewCreateRequest } from "../interfaces/activity-request-performance-review-create.interface"
import { IActivityRequestPerformanceReviewListRequest } from "../interfaces/activity-request-performance-review-list.interface"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

const LOAD_RELATIONS: FindOptionsRelations<UserActivityRequestEntity> = {
	userActivities: true,
	project: true,
	user: { workPosition: true }
}

@Injectable()
export class ActivityPerformanceReviewRepository {
	constructor(
		@InjectRepository(UserPerformanceReviewEntity) private readonly masterDataSource: MasterDataSource,
		@InjectRepository(UserActivityEntity) private readonly activityRepository: Repository<UserActivityEntity>
	) {}

	async createActivityRequest(
		createActivityRequest: IActivityRequestPerformanceReviewCreateDBRequest,
		createActivity: IActivityPerformanceReviewCreateDBRequest,
		performanceReviewId: number
	): Promise<UserActivityRequestEntity> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const activityRepository = entityManager.getRepository(UserActivityEntity)

			const newActivityRequest = await activityRequestRepository.save({ ...createActivityRequest })

			await activityRepository.save({ ...createActivity, activityRequestId: newActivityRequest.id, performanceReviewId: performanceReviewId })

			return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS })
		})
	}

	async updateActivityRequest(activityRequestId: number): Promise<UserActivityRequestEntity> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)

			return activityRequestRepository.findOneOrFail({ where: { id: activityRequestId }, relations: LOAD_RELATIONS })
		})
	}

	async getPerformanceReviewActivities(filters: IActivityRequestPerformanceReviewCreateRequest): Promise<number[]> {
		const where: FindOptionsWhere<UserActivityEntity> = {}
		if (filters.userId) where.userId = filters.userId
		if (filters.activityType) where.activityType = filters.activityType

		const activities = await this.activityRepository.find({
			where
		})

		if (!activities.length) {
			return []
		}

		return activities.flatMap(activity => activity.performanceReviewId ?? [])
	}

	async getPerformanceReviewActivitiesForUser(filters: IActivityRequestPerformanceReviewListRequest): Promise<UserActivityEntity[]> {
		const activities = await this.activityRepository
			.createQueryBuilder("activity")
			.leftJoinAndSelect("activity.reportedByUser", "reporter")
			.where("activity.activityType = :activityType", { activityType: UserActivityType.PerformanceReview })
			.andWhere("activity.userId = :userId", { userId: filters.userId })
			.getMany()

		if (!activities.length) {
			return []
		}

		return activities
	}
}
