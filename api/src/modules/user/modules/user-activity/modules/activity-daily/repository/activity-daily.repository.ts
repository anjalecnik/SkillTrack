import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Between, EntityManager, FindOptionsRelations, In, IsNull, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from "typeorm"
import { IActivityDailyWithWorkingHours, IActivityRequestDailyCreateDBRequest, IActivityRequestDailyDB, IActivityRequestDailyUpdateDBRequest } from "../interfaces"
import { IActivityLastDailyActivityRequestDBFilter } from "../interfaces/db/activity-last-daily-activity-request-filter-db.interface"
import { ActivityDailyValidationService } from "../services/activity-daily-validation.service"
import { createHash } from "crypto"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { ActivityRequestTypeHelper } from "src/utils/helpers/activity-request-type.helper"

const LOAD_RELATIONS: FindOptionsRelations<UserActivityRequestEntity> = {
	userActivities: { project: true },
	user: { workPosition: true }
}

@Injectable()
export class ActivityDailyRepository {
	constructor(
		@InjectRepository(UserActivityEntity)
		private readonly activityRepository: Repository<UserActivityEntity>,
		@InjectRepository(UserActivityRequestEntity)
		private readonly requestRepository: Repository<UserActivityRequestEntity>,
		@InjectRepository(UserWorkingHoursEntity)
		private workingHoursRepository: Repository<UserWorkingHoursEntity>,
		private readonly masterDataSource: MasterDataSource,
		private readonly activityDailyValidationService: ActivityDailyValidationService
	) {}

	async getUserLastActivityDailyRequest({ userId, date, hasProject }: IActivityLastDailyActivityRequestDBFilter): Promise<IActivityRequestDailyDB | undefined> {
		const userActivitiesFilter = hasProject ? { projectId: Not(IsNull()) } : undefined

		const lastDailyRequest = await this.requestRepository.findOne({
			where: {
				dateStart: LessThanOrEqual(date),
				userId,
				activityType: UserActivityType.Daily,
				status: UserActivityStatus.Approved,
				userActivities: userActivitiesFilter
			},
			relations: { userActivities: { project: true }, user: { workPosition: true } },
			order: { dateStart: "DESC" }
		})
		if (!lastDailyRequest || !ActivityRequestTypeHelper.isDailyRequest(lastDailyRequest)) return undefined
		return lastDailyRequest
	}

	async getDailyActivitiesByActivityRequest(activityRequestId: number): Promise<UserActivityEntity[]> {
		return this.activityRepository.find({
			where: {
				activityRequestId,
				activityType: UserActivityType.Daily,
				status: In([UserActivityStatus.Approved, UserActivityStatus.PendingApproval])
			},
			relations: { workingHours: true, project: true },
			order: {
				workingHours: {
					fromDateStart: "ASC"
				}
			}
		})
	}

	async createActivityRequest(createActivityRequest: IActivityRequestDailyCreateDBRequest, activitiesWithWorkingHours: IActivityDailyWithWorkingHours[]) {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const activityRepository = entityManager.getRepository(UserActivityEntity)
			const workingHoursRepository = entityManager.getRepository(UserWorkingHoursEntity)

			await this.activityDailyValidationService.preCreateSaveValidation(createActivityRequest)

			const newActivityRequest = await activityRequestRepository.save({ ...createActivityRequest })

			for (const { activity, workingHour } of activitiesWithWorkingHours) {
				const newWorkingHour = await workingHoursRepository.save(workingHour)
				await activityRepository.save({ ...activity, workingHoursId: newWorkingHour.id, activityRequestId: newActivityRequest.id })
			}

			return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS })
		})
	}

	async updateActivityRequest(
		updateActivityRequest: IActivityRequestDailyUpdateDBRequest,
		activitiesWithWorkingHours: IActivityDailyWithWorkingHours[]
	): Promise<UserActivityRequestEntity> {
		return this.masterDataSource.dataSource.manager.transaction(async (entityManager: EntityManager) => {
			const activityRepository = entityManager.getRepository(UserActivityEntity)
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const workingHoursRepository = entityManager.getRepository(UserWorkingHoursEntity)

			const existingActivities = await activityRepository.find({
				where: { activityRequestId: updateActivityRequest.id, activityType: UserActivityType.Daily },
				relations: { workingHours: true }
			})
			const existingWorkingHoursIds = existingActivities.filter(a => a.workingHours).map(a => a.workingHours!.id)

			await activityRepository.remove(existingActivities)

			await workingHoursRepository.delete(existingWorkingHoursIds)

			for (const { activity, workingHour } of activitiesWithWorkingHours) {
				const newWorkingHour = await workingHoursRepository.save(workingHour)
				await activityRepository.save({ ...activity, workingHoursId: newWorkingHour.id, activityRequestId: updateActivityRequest.id })
			}

			await activityRequestRepository.update(updateActivityRequest.id, { reportedByUserId: updateActivityRequest.reportedByUserId })

			return activityRequestRepository.findOneOrFail({ where: { id: updateActivityRequest.id }, relations: LOAD_RELATIONS })
		})
	}

	async getDailyActivitiesOnDate(fromDateStart: Date, toDateEnd: Date, userId: number): Promise<UserActivityEntity[]> {
		return this.activityRepository.find({
			where: {
				userId, // TEMPORARY
				activityType: UserActivityType.Daily,
				status: UserActivityStatus.Approved,
				date: Between(fromDateStart, toDateEnd)
			},
			relations: { workingHours: true }
		})
	}

	async getLunchActivitiesOnDate(fromDateStart: Date, toDateEnd: Date, userId: number): Promise<UserActivityEntity[]> {
		return this.activityRepository.find({
			where: {
				userId,
				activityType: UserActivityType.Lunch,
				date: Between(fromDateStart, toDateEnd)
			}
		})
	}

	async getDailyActivity(activityId: number): Promise<UserActivityEntity> {
		return this.activityRepository.findOneOrFail({
			where: { id: activityId },
			relations: { workingHours: true }
		})
	}

	async getActivityRequestById(activityRequestId: number): Promise<UserActivityRequestEntity> {
		return this.requestRepository.findOneOrFail({ where: { id: activityRequestId, activityType: UserActivityType.Daily } })
	}

	async getAllUserDailyActivities(userId: number, date: Date): Promise<UserActivityEntity[]> {
		return this.activityRepository.find({
			where: { userId, activityType: UserActivityType.Daily, status: UserActivityStatus.Approved, date: MoreThanOrEqual(date) },
			relations: { workingHours: true },
			order: { date: "DESC" }
		})
	}

	async getWorkingHoursOnDate(userId: number, startDate: Date, endDate: Date): Promise<UserWorkingHoursEntity[]> {
		return this.workingHoursRepository.find({ where: { userId, fromDateStart: Between(startDate, endDate) } })
	}

	async assignNewWorkingHoursToActivity(activity: UserActivityEntity, workingHours: Omit<UserWorkingHoursEntity, "id">): Promise<UserActivityEntity> {
		const newWorkingHour = await this.workingHoursRepository.save(workingHours)

		activity.workingHoursId = newWorkingHour.id
		activity.workingHours = newWorkingHour

		return this.activityRepository.save(activity)
	}

	async assignExistingWorkingHoursToActivity(activity: UserActivityEntity, workingHour: UserWorkingHoursEntity): Promise<UserActivityEntity> {
		activity.workingHoursId = workingHour.id
		activity.workingHours = workingHour

		return this.activityRepository.save(activity)
	}

	async deleteWorkingHours(workingHoursIds: number[]): Promise<void> {
		await this.workingHoursRepository.delete(workingHoursIds)
	}
}
