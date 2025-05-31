import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { ActivityPerformanceReviewPaginationFilterDBRequest } from "../interfaces/db/activity-performance-review-filter-db.interface"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { PaginationHelper } from "src/utils/helpers/pagination.helper"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { UserWithActivitiesPerformanceReview } from "../dtos/response/activity-performance-review-user.response"
import { IUserWithActivitiesPerformanceReview } from "../interfaces/activity-performance-review-hal-response.interface"

@Injectable()
export class ActivityOverviewRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userPerformanceReviewRepository: Repository<IUserWithActivitiesPerformanceReview>
	) {}

	async getPerformanceReviewListPagination(filters: ActivityPerformanceReviewPaginationFilterDBRequest): Promise<IPaginatedResponse<UserWithActivitiesPerformanceReview>> {
		const alias = "user"
		const orderCriteria = this.setOrder(filters, alias)

		const queryBuilder = this.userPerformanceReviewRepository
			.createQueryBuilder(alias)
			.leftJoinAndSelect(`${alias}.performanceReviews`, "performanceReview")
			.leftJoinAndSelect("performanceReview.activities", "userActivity")
			.select([
				`${alias}.id`,
				`${alias}.name`,
				`${alias}.surname`,
				`${alias}.email`,
				"performanceReview.id",
				"performanceReview.quartal",
				"performanceReview.year",
				"performanceReview.answer1",
				"performanceReview.answer2",
				"performanceReview.answer3",
				"performanceReview.answer4",
				"performanceReview.score",
				"userActivity.activityRequestId"
			])

		orderCriteria.forEach(({ orderName, orderSortingDir }) => {
			queryBuilder.addOrderBy(orderName, orderSortingDir)
		})

		if (filters.userIds) queryBuilder.andWhere({ id: In(filters.userIds) })

		if (filters.fullName) {
			const query =
				filters.fullName
					.split(" ")
					.filter(name => name.length > 0)
					.join(" & ") + ":*"

			queryBuilder.andWhere(`to_tsvector('simple', "user"."name" || ' ' || "user"."surname") @@ to_tsquery('simple', :query)`, { query })
		}

		const { skip, take } = PaginationHelper.calculateSkipAndTake(filters)
		const [users, count] = await queryBuilder.skip(skip).take(take).getManyAndCount()

		const usersData: UserWithActivitiesPerformanceReview[] = users.map(user => ({
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			scores:
				user.performanceReviews
					?.filter(review => review.year === filters.year)
					.map(review => ({
						id: review.id,
						activityId: review.activities?.[0]?.activityRequestId || null,
						quartal: review.quartal,
						year: review.year,
						answer1: review.answer1,
						answer2: review.answer2,
						answer3: review.answer3,
						answer4: review.answer4,
						score: review.score
					})) || []
		}))

		return {
			data: usersData,
			meta: PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count)
		}
	}

	private setOrder(filters: ActivityPerformanceReviewPaginationFilterDBRequest, alias: string): { orderName: string; orderSortingDir: "ASC" | "DESC" }[] {
		const orderSortingDir: "ASC" | "DESC" = filters.sortingDir === "asc" ? "ASC" : "DESC"

		switch (filters.sort) {
			case "name":
				return [
					{ orderName: `${alias}.name`, orderSortingDir },
					{ orderName: `${alias}.surname`, orderSortingDir }
				]
			default:
				return [{ orderName: `${alias}.id`, orderSortingDir }]
		}
	}
}
