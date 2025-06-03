import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { And, FindOperator, FindOptionsOrder, FindOptionsWhere, In, IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm"
import { IUserActivityRequestListFilterDBRequest, IUserActivityRequestPaginationFilterDBRequest } from "../interfaces"
import { IUserActivityListFilterDBRequest } from "../interfaces/db/user-activity-list-filter-db.interface"
import { NotificationEntity } from "src/libs/db/entities/notification.entity"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { PaginationHelper } from "src/utils/helpers/pagination.helper"
import { NotificationType } from "src/utils/types/enums/notficiation.enum"
import { NotificationStatus } from "src/utils/types/enums/notification-status.enum"
import { IPaginatedResponse, IUserCommon } from "src/utils/types/interfaces"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { OverviewMonthlyProductivityResponse } from "src/modules/overview/dtos/response/overview-monthly-productivity.response"

@Injectable()
export class UserActivityRepository {
	constructor(
		@InjectRepository(UserActivityEntity)
		private readonly userActivityRepository: Repository<UserActivityEntity>,
		@InjectRepository(UserActivityRequestEntity)
		private readonly userActivityRequestRepository: Repository<UserActivityRequestEntity>,
		@InjectRepository(NotificationEntity)
		private readonly notificationRepository: Repository<NotificationEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async getPendingActivityRequests(checkDate: Date): Promise<UserActivityRequestEntity[]> {
		const where: FindOptionsWhere<UserActivityRequestEntity> = {
			status: UserActivityStatus.PendingApproval,
			createdAt: LessThanOrEqual(checkDate)
		}

		return this.userActivityRequestRepository.find({ where, relations: { user: { manager: { manager: true } }, userActivities: true, project: true } })
	}

	async getDistinctPendingUnassignedActivities(checkDate: Date): Promise<UserActivityEntity[]> {
		return this.userActivityRepository
			.createQueryBuilder("userActivity")
			.distinctOn(["userActivity.userId"])
			.leftJoinAndSelect("userActivity.user", "user")
			.leftJoinAndSelect("user", "user")
			.leftJoinAndSelect("user.manager", "manager")
			.where({ activityType: UserActivityType.Unassigned, date: LessThanOrEqual(checkDate) })
			.getMany()
	}

	async getUserActivityByIdOrThrow({ userId }: IUserCommon, id: number): Promise<UserActivityEntity> {
		return this.userActivityRepository.findOneOrFail({ where: { id, userId }, relations: { activityRequest: { project: true }, project: true } })
	}

	async getUserLastActivityDailyRequest({ userId }: IUserCommon, date: Date): Promise<UserActivityRequestEntity | undefined> {
		const result = await this.userActivityRequestRepository.findOne({
			where: { dateStart: LessThanOrEqual(date), userId, activityType: UserActivityType.Daily },
			relations: { userActivities: { project: true }, user: { workPosition: true } },
			order: { dateStart: "DESC" }
		})
		return result ?? undefined
	}

	async getUserActivityList(filters: IUserActivityListFilterDBRequest): Promise<UserActivityEntity[]> {
		const where: FindOptionsWhere<UserActivityEntity> = {
			userId: filters.userId
		}

		if (filters.ids) where.id = In(filters.ids)
		if (filters.types) where.activityType = In(filters.types)
		if (filters.projectIds) where.projectId = In(filters.projectIds)
		if (filters.reportedByUserIds) where.reportedByUserId = In(filters.reportedByUserIds)
		const defaultStatuses = [UserActivityStatus.Approved, UserActivityStatus.PendingApproval]
		where.status = In(filters.statuses || defaultStatuses)

		const whereRequestDateAnd: FindOperator<Date>[] = []
		if (filters.fromDateStart) {
			whereRequestDateAnd.push(MoreThanOrEqual(filters.fromDateStart))
		}
		if (filters.toDateEnd) {
			whereRequestDateAnd.push(LessThanOrEqual(filters.toDateEnd))
		}
		where.date = whereRequestDateAnd.length > 0 ? And(...whereRequestDateAnd) : undefined

		const order = this.getActivityOrder(filters)
		return this.userActivityRepository.find({ where, relations: { activityRequest: { project: true }, project: true, workingHours: true }, order })
	}

	private getActivityOrder(filters: IUserActivityListFilterDBRequest): FindOptionsOrder<UserActivityEntity> {
		switch (filters.sort) {
			case "dateStart":
				return { date: { direction: filters.sortingDir } }
			default:
				return { createdAt: { direction: filters.sortingDir } }
		}
	}

	async getUserActivityRequestByIdOrThrow({ userId }: IUserCommon, id: number): Promise<UserActivityRequestEntity> {
		return this.userActivityRequestRepository.findOneOrFail({
			where: { id, userId },
			relations: { userActivities: { project: true }, project: true, user: { workPosition: true } }
		})
	}

	async getUserActivityRequestList(filters: IUserActivityRequestListFilterDBRequest): Promise<UserActivityRequestEntity[]> {
		const queryBuilder = this.userActivityRequestRepository
			.createQueryBuilder("userActivityRequest")
			.leftJoinAndSelect("userActivityRequest.user", "user")
			.leftJoinAndSelect("user.workPosition", "workPosition")
			.leftJoinAndSelect("userActivityRequest.project", "project")
			.leftJoinAndSelect("userActivityRequest.userActivities", "userActivities")
			.leftJoinAndSelect("userActivities.project", "relatedProject")

		if (filters.userIds) queryBuilder.andWhere({ workspaceUserId: In(filters.userIds) })
		if (filters.ids) queryBuilder.andWhere({ id: In(filters.ids) })
		if (filters.types) queryBuilder.andWhere({ activityType: In(filters.types) })
		if (filters.projectIds) queryBuilder.andWhere({ projectId: In(filters.projectIds) })
		if (filters.reportedByUserIds) queryBuilder.andWhere({ reportedByWorkspaceUserId: In(filters.reportedByUserIds) })
		if (filters.statuses) queryBuilder.andWhere({ status: In(filters.statuses) })
		if (filters.fromDateStart || filters.toDateEnd) {
			queryBuilder.andWhere(`(userActivityRequest.dateStart <= :toDateEnd AND :fromDateStart <= COALESCE(userActivityRequest.dateEnd, userActivityRequest.dateStart))`, {
				fromDateStart: filters.fromDateStart ? filters.fromDateStart : DateHelper.getYearZero(),
				toDateEnd: filters.toDateEnd ? filters.toDateEnd : DateHelper.getPlusInfinity()
			})
		}
		if (filters.fullName) {
			const query =
				filters.fullName
					.split(" ")
					.filter(name => name.length > 0)
					.join(" & ") + ":*"

			queryBuilder.andWhere(`to_tsvector('simple', "user"."name" || ' ' || "user"."surname") @@ to_tsquery('simple', :query)`, { query })
		}

		const order = this.getActivityRequestOrder(filters)
		for (const [column] of Object.entries(order)) {
			queryBuilder.addOrderBy(column, order[column])
		}
		return queryBuilder.getMany()
	}

	async getUserActivityRequestListPagination(filters: IUserActivityRequestPaginationFilterDBRequest): Promise<IPaginatedResponse<UserActivityRequestEntity>> {
		const queryBuilder = this.userActivityRequestRepository
			.createQueryBuilder("userActivityRequest")
			.leftJoinAndSelect("userActivityRequest.user", "user")
			.leftJoinAndSelect("user.workPosition", "workPosition")
			.leftJoinAndSelect("userActivityRequest.project", "project")
			.leftJoinAndSelect("userActivityRequest.userActivities", "userActivities")
			.leftJoinAndSelect("userActivities.project", "relatedProject")

		if (filters.userIds) queryBuilder.andWhere({ userId: In(filters.userIds) })
		if (filters.ids) queryBuilder.andWhere({ id: In(filters.ids) })
		if (filters.types) queryBuilder.andWhere({ activityType: In(filters.types) })
		if (filters.projectIds) queryBuilder.andWhere({ projectId: In(filters.projectIds) })
		if (filters.reportedByUserIds) queryBuilder.andWhere({ reportedByUserId: In(filters.reportedByUserIds) })
		if (filters.statuses) queryBuilder.andWhere({ status: In(filters.statuses) })
		if (filters.fromDateStart || filters.toDateEnd) {
			queryBuilder.andWhere(`(userActivityRequest.dateStart <= :toDateEnd AND :fromDateStart <= COALESCE(userActivityRequest.dateEnd, userActivityRequest.dateStart))`, {
				fromDateStart: filters.fromDateStart ? filters.fromDateStart : DateHelper.getYearZero(),
				toDateEnd: filters.toDateEnd ? filters.toDateEnd : DateHelper.getPlusInfinity()
			})
		}
		if (filters.fullName && filters.fullName.trim().length > 0) {
			const query =
				filters.fullName
					.split(" ")
					.filter(name => name.length > 0)
					.join(" & ") + ":*"

			queryBuilder.andWhere(`to_tsvector('simple', "user"."name" || ' ' || "user"."surname") @@ to_tsquery('simple', :query)`, { query })
		}

		const order = this.getActivityRequestPaginationOrder(filters)
		for (const [column] of Object.entries(order)) {
			queryBuilder.addOrderBy(column, order[column])
		}

		const { skip, take } = PaginationHelper.calculateSkipAndTake(filters)
		const [data, count] = await queryBuilder.skip(skip).take(take).getManyAndCount()

		return {
			data,
			meta: PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count)
		}
	}

	async getMonthlyUserProductivity(): Promise<OverviewMonthlyProductivityResponse> {
		const thisYear = new Date().getFullYear()
		const lastYear = thisYear - 1

		const results = await this.userActivityRepository
			.createQueryBuilder("activity")
			.select(["EXTRACT(YEAR FROM activity.date) AS year", "EXTRACT(MONTH FROM activity.date) AS month", "SUM(activity.hours) AS total"])
			.where("activity.activityType IN (:...activityTypes)", { activityTypes: [UserActivityType.Daily, UserActivityType.BusinessTrip] })
			.andWhere("activity.status IN (:...statusFilter)", { statusFilter: [UserActivityStatus.Approved, UserActivityStatus.PendingApproval] })
			.andWhere("EXTRACT(YEAR FROM activity.date) IN (:...years)", { years: [thisYear, lastYear] })
			.andWhere("activity.hours IS NOT NULL")
			.groupBy("year, month")
			.orderBy("year, month")
			.getRawMany()

		const thisYearHours = Array(12).fill(0)
		const lastYearHours = Array(12).fill(0)

		for (const row of results) {
			const year = Number(row.year)
			const month = Number(row.month)
			const hours = Number(row.total)

			if (year === thisYear) {
				thisYearHours[month - 1] = hours
			} else if (year === lastYear) {
				lastYearHours[month - 1] = hours
			}
		}

		return {
			thisYear: thisYearHours,
			lastYear: lastYearHours
		}
	}

	private getActivityRequestOrder(filters: IUserActivityRequestListFilterDBRequest): { [key: string]: "ASC" | "DESC" } {
		type sortDirUpper = "ASC" | "DESC"
		const sortingDir: sortDirUpper = filters.sortingDir.toUpperCase() as sortDirUpper
		switch (filters.sort) {
			case "id":
				return { "userActivityRequest.id": sortingDir }
			case "dateStart":
				return { "userActivityRequest.dateStart": sortingDir }
			case "dateEnd":
				return { "userActivityRequest.dateEnd": sortingDir }
			case "name":
				return { "user.name": sortingDir }
			default:
				return { "userActivityRequest.createdAt": sortingDir }
		}
	}

	async getAllUsers(): Promise<UserEntity[]> {
		return this.userRepository.find()
	}

	async getManagerOfManagerSentNotifications(activityRequestIds: number[]): Promise<NotificationEntity[]> {
		return this.notificationRepository.find({
			where: {
				userActivityRequestId: In(activityRequestIds),
				type: NotificationType.ActivityRequest,
				status: NotificationStatus.Finished
			}
		})
	}

	private getActivityRequestPaginationOrder(filters: IUserActivityRequestPaginationFilterDBRequest): { [key: string]: "ASC" | "DESC" } {
		type sortDirUpper = "ASC" | "DESC"
		const sortingDir: sortDirUpper = filters.sortingDir.toUpperCase() as sortDirUpper
		switch (filters.sort) {
			case "id":
				return { "userActivityRequest.id": sortingDir }
			case "dateStart":
				return { "userActivityRequest.dateStart": sortingDir }
			case "activityType":
				return { "userActivityRequest.activityType": sortingDir }
			case "name":
				return { "user.name": sortingDir }
			default:
				return { "userActivityRequest.createdAt": sortingDir }
		}
	}
}
