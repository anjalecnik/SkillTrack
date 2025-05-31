import { Injectable } from "@nestjs/common"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { UserActivityRepository } from "src/modules/user/modules/user-activity/repository/user-activity.repository"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { UserWithActivitiesPerformanceReview } from "../dtos/response/activity-performance-review-user.response"
import { ActivityPerformanceReviewPaginationFilterDBRequest } from "../interfaces/db/activity-performance-review-filter-db.interface"
import { ActivityOverviewRepository } from "../repository/activity-overview.repository"

@Injectable()
export class ActivityOverviewService {
	constructor(
		private readonly activityOverviewRepository: ActivityOverviewRepository,
		private readonly userActivityRepository: UserActivityRepository,
		private readonly utilityService: UtilityService
	) {}

	async getPerformanceReviewPaginationUserHub(
		userInvoker: IAuthJwtPassportUserRequest,
		filters: ActivityPerformanceReviewPaginationFilterDBRequest
	): Promise<IPaginatedResponse<UserWithActivitiesPerformanceReview>> {
		const userId = userInvoker.user.id

		const userIds = await this.filterUsersUserHub(userId, filters.showSubordinatesByLevel)

		return this.getPerformanceReviewPagination(filters, userIds)
	}

	async getPerformanceReviewPaginationAdminHub(
		userInvoker: IAuthJwtPassportUserRequest,
		filters: ActivityPerformanceReviewPaginationFilterDBRequest
	): Promise<IPaginatedResponse<UserWithActivitiesPerformanceReview>> {
		const userId = userInvoker.user.id

		const userIds = await this.filterUsersAdminHub(userId, filters.showSubordinatesByLevel)

		return this.getPerformanceReviewPagination(filters, userIds)
	}

	private async getPerformanceReviewPagination(
		filters: ActivityPerformanceReviewPaginationFilterDBRequest,
		userIds: number[]
	): Promise<IPaginatedResponse<UserWithActivitiesPerformanceReview>> {
		const { data: dataRaw, meta } = await this.activityOverviewRepository.getPerformanceReviewListPagination({
			...filters,
			userIds
		})

		const data = await Promise.all(dataRaw)

		return {
			data,
			meta
		}
	}

	private async filterUsersAdminHub(userId: number, showSubordinatesByLevel: number): Promise<number[]> {
		if (showSubordinatesByLevel === 1) {
			return (await this.userActivityRepository.getAllUsers()).map(user => user.id)
		}
		return [userId]
	}

	private async filterUsersUserHub(userId: number, showSubordinatesByLevel: number): Promise<number[]> {
		if (showSubordinatesByLevel === 1) {
			const subordinateUserIds = await this.utilityService.getSubordinateIdsRecursively(userId, new Set())
			return [userId, ...subordinateUserIds]
		}
		return [userId]
	}
}
