import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { And, Between, EntityManager, FindOneOptions, FindOptionsRelations, FindOptionsWhere, In, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from "typeorm"
import {
	IActivitySharedCancelDBRequest,
	IActivitySharedFilterDB,
	IActivitySharedGetDatesActivity,
	IActivitySharedRequestCancelDBRequest,
	IActivitySharedRequestReviewDBRequest,
	IActivitySharedReviewDBRequest
} from "../interfaces"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { TypeHelper } from "src/utils/helpers/type.helper"

const LOAD_RELATIONS: FindOptionsRelations<UserActivityRequestEntity> = {
	userActivities: { project: true },
	project: true,
	user: { workPosition: true }
}
@Injectable()
export class ActivitySharedRepository {
	constructor(
		@InjectRepository(UserActivityEntity) private readonly activityRepository: Repository<UserActivityEntity>,
		@InjectRepository(UserActivityRequestEntity) private readonly activityRequestRepository: Repository<UserActivityRequestEntity>,
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
		@InjectRepository(HolidayEntity) private readonly holidayRepository: Repository<HolidayEntity>
	) {}

	async getUserById(id: number) {
		return this.userRepository.findOneOrFail({
			where: { id },
			relations: ["manager"]
		})
	}

	async getUserByIdOrThrow(id: number) {
		return this.userRepository.findOneOrFail({ where: { id } })
	}

	async getProjectOrThrow(id: number): Promise<ProjectEntity> {
		return this.projectRepository.findOneOrFail({ where: { id } })
	}

	async getActivitiesOnDay(dayDate: Date, filters: IActivitySharedFilterDB): Promise<UserActivityEntity[]> {
		const where: FindOptionsWhere<UserActivityEntity> = {}
		if (filters.excludeActivityIds) where.id = Not(In(filters.excludeActivityIds))
		if (filters.activityTypes) where.activityType = In(filters.activityTypes)
		if (filters.statuses) where.status = In(filters.statuses)
		if (filters.userId) where.userId = filters.userId
		where.date = And(LessThanOrEqual(DateHelper.getEndOfDay(dayDate)), MoreThanOrEqual(DateHelper.getStartOfDay(dayDate)))
		return this.activityRepository.find({
			where
		})
	}

	async getActivityRequestById(ids: number[]) {
		const activityRequests = await this.activityRequestRepository.find({ where: { id: In(ids) }, relations: { userActivities: true } })
		return activityRequests.map(activity => TypeHelper.validateRelation(activity, "userActivities"))
	}

	async getActivitiesOnDayInRange(filters: IActivitySharedFilterDB & { dates: Date[] }): Promise<UserActivityEntity[]> {
		const where: FindOptionsWhere<UserActivityEntity> = {}
		if (filters.excludeActivityIds) where.id = Not(In(filters.excludeActivityIds))
		if (filters.activityTypes) where.activityType = In(filters.activityTypes)
		if (filters.statuses) where.status = In(filters.statuses)
		if (filters.userId) where.userId = filters.userId
		where.date = In(filters.dates)
		return this.activityRepository.find({
			where
		})
	}

	async getActivitiesRequestsOnDayInRange(filters: IActivitySharedFilterDB & { dates: Date[] }): Promise<UserActivityRequestEntity[]> {
		const where: FindOptionsWhere<UserActivityRequestEntity> = {}
		if (filters.excludeActivityIds) where.id = Not(In(filters.excludeActivityIds))
		if (filters.activityTypes) where.activityType = In(filters.activityTypes)
		if (filters.statuses) where.status = In(filters.statuses)
		if (filters.userId) where.userId = filters.userId
		where.dateStart = And(
			LessThanOrEqual(In(filters.dates.map(date => DateHelper.getEndOfDay(date)))),
			MoreThanOrEqual(In(filters.dates.map(date => DateHelper.getStartOfDay(date))))
		)
		return this.activityRequestRepository.find({
			where
		})
	}

	async getEarliestActivityByUserId(userId: number): Promise<UserActivityEntity | undefined> {
		const earliestActivity = await this.activityRepository.findOne({
			where: { userId },
			order: { date: "ASC" }
		})
		return earliestActivity ?? undefined
	}

	async findActivityRequest(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity | null> {
		return this.activityRequestRepository.findOne({ where: whereOptions })
	}

	async findActivityRequestWithActivitiesOrFail(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity> {
		return this.activityRequestRepository.findOneOrFail({ where: whereOptions, relations: { userActivities: true } })
	}

	async findActivityRequestWithActivities(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity | null> {
		return this.activityRequestRepository.findOne({ where: whereOptions, relations: { userActivities: true } })
	}

	async findActivityRequestOrFail<T extends UserActivityRequestEntity>(options: FindOneOptions<UserActivityRequestEntity>): Promise<T> {
		return (await this.activityRequestRepository.findOneOrFail(options)) as unknown as T
	}

	async cancelActivityRequest(cancelActivityRequest: IActivitySharedRequestCancelDBRequest, cancelActivity: IActivitySharedCancelDBRequest[]): Promise<UserActivityRequestEntity> {
		return this.activityRequestRepository.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const activityRepository = entityManager.getRepository(UserActivityEntity)
			const newActivityRequest = await activityRequestRepository.save({ ...cancelActivityRequest })
			await activityRepository.save(cancelActivity.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })))
			return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS })
		})
	}

	async reviewActivityRequest(reviewActivityRequest: IActivitySharedRequestReviewDBRequest, reviewActivity: IActivitySharedReviewDBRequest[]): Promise<UserActivityRequestEntity> {
		return this.activityRequestRepository.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const activityRepository = entityManager.getRepository(UserActivityEntity)
			const newActivityRequest = await activityRequestRepository.save({ ...reviewActivityRequest })
			await activityRepository.save(reviewActivity.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })))
			return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: { ...LOAD_RELATIONS } })
		})
	}

	async getHolidays(dateRange: IActivitySharedGetDatesActivity): Promise<HolidayEntity[]> {
		return this.holidayRepository.find({ where: { countryCode: "SI", date: Between(dateRange.dateStart, dateRange.dateEnd) } })
	}
}
