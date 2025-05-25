import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { UserWorkingHoursResponse } from "../../../../user-working-hours/dtos/response/user-working-hours.response"
import { UserWorkingHoursService } from "../../../../user-working-hours/services/user-working-hours.service"
import { IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces"
import { ActivitySharedDBMapper } from "../../activity-shared/mappers/activity-shared-db.mapper"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service"
import {
	IActivityDailyCreateDBRequest,
	IActivityDailyWithWorkingHours,
	IActivityLastDailyActivityRequestFilter,
	IActivityRequestDailyCreateRequest,
	IActivityRequestDailyEntityEnriched,
	IActivityRequestDailyUpdateRequest,
	IUserActivityDailyEnriched
} from "../interfaces"
import { ActivityDailyDBMapper } from "../mappers/activity-daily-db-mapper"
import { ActivityDailyRepository } from "../repository/activity-daily.repository"
import { ActivityDailyValidationService } from "../services/activity-daily-validation.service"
import { IInvokerMetadata } from "../../activity-shared/interfaces"
import { ActivityLunchService } from "../../activity-lunch/services/activity-lunch.service"
import { IUserWorkingHoursDailyCreateRequest } from "../../../../user-working-hours/interfaces"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { DateHelper } from "src/utils/helpers/date.helper"
import { ActivityRequestTypeHelper } from "src/utils/helpers/activity-request-type.helper"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"

@Injectable()
export class ActivityDailyService {
	constructor(
		private readonly activitySharedService: ActivitySharedService,
		private readonly activityDailyRepository: ActivityDailyRepository,
		private readonly activityDailyValidationService: ActivityDailyValidationService,
		private readonly userWorkingHoursService: UserWorkingHoursService,
		private readonly utilityService: UtilityService,
		private readonly activitySharedRequestActionsService: ActivitySharedRequestActionsService,
		private readonly activityLunchService: ActivityLunchService
	) {}

	async getLastDailyRequestActivity(
		userInvoker: IAuthJwtPassportUserRequest,
		{ date, ...workspaceCommon }: IActivityLastDailyActivityRequestFilter
	): Promise<IActivityRequestDailyEntityEnriched | undefined> {
		// if date not defined get current date shifted to workspace time
		const getDailyDate = async (date: Date | undefined) => {
			if (date) return date
			const timezone = "Europe/Ljubljana"
			return DateHelper.subtractWorkspaceOffset(timezone)
		}

		const dailyDate = await getDailyDate(date)
		const lastDailyActivity = await this.activityDailyRepository.getUserLastActivityDailyRequest({ ...workspaceCommon, date: dailyDate })
		if (!lastDailyActivity) return undefined
		return this.enrichActivityRequest(userInvoker.user.id, lastDailyActivity)
	}

	async createActivityRequest(userInvoker: IInvokerMetadata, bulkActivityDailyCreate: IActivityRequestDailyCreateRequest): Promise<IActivityRequestDailyEntityEnriched> {
		const { activityRequest, activities } = ActivityDailyDBMapper.createActivityRequest(bulkActivityDailyCreate)
		await this.activityDailyValidationService.preCreateSaveValidation(activityRequest)

		const userWorkingHours = this.userWorkingHoursService.addWorkingHours(bulkActivityDailyCreate.workingHours, bulkActivityDailyCreate.dateStart)

		const activitiesWithWorkingHours = this.mapActivitiesToWorkingHours(activities, userWorkingHours)

		const newActivityRequest = await this.activityDailyRepository.createActivityRequest(activityRequest, activitiesWithWorkingHours)

		if (bulkActivityDailyCreate.lunch) {
			await this.activityLunchService.createLunchActivity({
				userId: bulkActivityDailyCreate.userId,
				date: bulkActivityDailyCreate.dateStart,
				activityRequestId: newActivityRequest.id
			})
		}

		const activityRequestDB = ActivityRequestTypeHelper.setAsActivityRequest(newActivityRequest, UserActivityType.Daily)
		return this.enrichActivityRequest(userInvoker.user.id, activityRequestDB)
	}

	async updateActivityRequest(userInvoker: IInvokerMetadata, bulkActivityRequestDailyUpdate: IActivityRequestDailyUpdateRequest): Promise<IActivityRequestDailyEntityEnriched> {
		const activityRequestEntity = await this.activityDailyValidationService.preUpdateTransformValidation(bulkActivityRequestDailyUpdate)

		const userWorkingHours = this.userWorkingHoursService.addWorkingHours(bulkActivityRequestDailyUpdate.workingHours, activityRequestEntity.dateStart)

		const activitiesWithWorkingHours = ActivityDailyDBMapper.mapUpdateActivityRequest(bulkActivityRequestDailyUpdate, activityRequestEntity, userWorkingHours)
		const updateActivityRequest = await this.activityDailyRepository.updateActivityRequest(
			{ id: activityRequestEntity.id, reportedByUserId: bulkActivityRequestDailyUpdate.reportedByUserId },
			activitiesWithWorkingHours
		)

		await this.activityLunchService.updateLunchActivity(bulkActivityRequestDailyUpdate.lunch, {
			userId: bulkActivityRequestDailyUpdate.userId,
			date: activityRequestEntity.dateStart,
			activityRequestId: updateActivityRequest.id
		})

		return this.enrichActivityRequest(userInvoker.user.id, updateActivityRequest)
	}

	async cancelActivityRequest(userInvoker: IInvokerMetadata, activityDailyRequest: IActivitySharedRequestCancelRequest): Promise<IActivityRequestDailyEntityEnriched> {
		const activityRequestEntity = await this.activityDailyValidationService.preCancelTransformValidation(activityDailyRequest)
		const { activityRequest, activityDaily } = ActivitySharedDBMapper.cancelActivity(activityRequestEntity, activityRequestEntity.userActivities)

		const cancelActivityRequest = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily)
		await this.activityLunchService.deleteLunchActivity({
			userId: userInvoker.user.id,
			activityRequestId: activityRequestEntity.id,
			date: activityRequestEntity.dateStart
		})

		return this.enrichActivityRequest(userInvoker.user.id, cancelActivityRequest)
	}

	async enrichActivityRequest(
		userInvoker: number | UserEntity,
		activityRequest: UserActivityRequestEntity,
		subordinateIds: number[] = []
	): Promise<IActivityRequestDailyEntityEnriched> {
		const activityRequestTypeSafe = ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, UserActivityType.Daily)

		const activities = await this.activityDailyRepository.getDailyActivitiesByActivityRequest(activityRequest.id)
		const lunchActivities = await this.activityLunchService.getLunchOnDay({
			userId: activityRequest.userId,
			date: activityRequest.dateStart,
			activityRequestId: activityRequest.id
		})
		const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds)
		return {
			...activityRequestTypeSafe,
			lunch: lunchActivities.length > 0 ? true : false,
			activities,
			actions
		}
	}

	async enrichActivity(activity: UserActivityEntity): Promise<IUserActivityDailyEnriched> {
		const workingHours = activity.workingHours
		await this.activityDailyRepository.getDailyActivity(activity.id)

		return {
			...activity,
			activityType: UserActivityType.Daily,
			workingHours: workingHours
		}
	}

	reviewActivityRequest(_userInvoker: IAuthJwtPassportUserRequest, _activityRequestReview: IActivitySharedRequestReviewRequest): Promise<never> {
		throw new BadRequestException(`Invalid activity type to be reviewed.`, `Daily activity cannot be reviewed.`)
	}

	private mapActivitiesToWorkingHours(activities: IActivityDailyCreateDBRequest[], workingHours: UserWorkingHoursResponse[]): IActivityDailyWithWorkingHours[] {
		return activities.map(activity => {
			const index = workingHours.findIndex(wh => wh.projectId === activity.projectId)
			if (index === -1) {
				throw new NotFoundException(`No matching working hours for project ID: ${activity.projectId}`)
			}

			const [matchingHours] = workingHours.splice(index, 1)

			return {
				activity: activity,
				workingHour: {
					type: matchingHours.type,
					fromDateStart: matchingHours.fromDateStart,
					toDateEnd: matchingHours.toDateEnd,
					userId: activity.userId
				}
			}
		})
	}

	async getRelevantDailyActivities(userId: number, date: Date): Promise<UserActivityEntity[]> {
		return this.activityDailyRepository.getAllUserDailyActivities(userId, date)
	}

	async getWorkingHoursOnDate(userId: number, dateString: string): Promise<UserWorkingHoursEntity[]> {
		const date = new Date(dateString)
		const startOfDay = DateHelper.getStartOfDay(date)
		const endOfDay = DateHelper.getEndOfDay(date)
		return this.activityDailyRepository.getWorkingHoursOnDate(userId, startOfDay, endOfDay)
	}

	async addWorkingHours(activities: UserActivityEntity[], timeRanges: { fromTimeStart: string; toTimeEnd: string }[]): Promise<UserWorkingHoursResponse[]> {
		const createRequests: IUserWorkingHoursDailyCreateRequest[] = []
		activities.forEach((activity, index) => {
			if (!activity.projectId) return

			createRequests.push({
				projectId: activity.projectId,
				timeRange: timeRanges[index]
			})
		})
		return this.userWorkingHoursService.addWorkingHours(createRequests, activities[0].date)
	}

	async assignWorkingHoursResponseToActivities(activities: UserActivityEntity[], workingHours: UserWorkingHoursResponse[]) {
		for (const activity of activities) {
			const workingHour = workingHours.find(wh => wh.projectId === activity.projectId)
			if (!workingHour) throw new NotFoundException(`No matching working hours for project ID: ${activity.projectId}`)

			const workingHoursEntity = {
				type: workingHour.type,
				fromDateStart: workingHour.fromDateStart,
				toDateEnd: workingHour.toDateEnd,
				userId: activity.userId
			}
			await this.activityDailyRepository.assignNewWorkingHoursToActivity(activity, workingHoursEntity)
		}
	}

	async assignWorkingHoursToActivities(activities: UserActivityEntity[], workingHours: UserWorkingHoursEntity[]) {
		for (let i = 0; i < Math.min(activities.length, workingHours.length); i++) {
			await this.activityDailyRepository.assignExistingWorkingHoursToActivity(activities[i], workingHours[i])
		}
	}

	async assignNewWorkingHourDeleteOld(activity: UserActivityEntity, workingHour: UserWorkingHoursEntity, oldWorkingHours: UserWorkingHoursEntity[]) {
		await this.activityDailyRepository.deleteWorkingHours(oldWorkingHours.map(wh => wh.id))

		await this.activityDailyRepository.assignNewWorkingHoursToActivity(activity, workingHour)
	}

	async handleLunchActivities(dailyActivity: UserActivityEntity, breakEntries: UserWorkingHoursEntity[]) {
		await this.activityDailyRepository.deleteWorkingHours(breakEntries.map(wh => wh.id))
		await this.activityLunchService.createLunchActivity({
			userId: dailyActivity.userId,
			date: dailyActivity.date,
			activityRequestId: dailyActivity.activityRequestId!
		})
	}
}
