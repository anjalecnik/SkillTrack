import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common"
import { FindOptionsWhere } from "typeorm"
import {
	IUserActivityCommonParams,
	IUserActivityListFilterRequest,
	IUserActivityRequestCreate,
	IUserActivityRequestListFilterRequest,
	IUserActivityRequestPaginationFilterDBRequest,
	IUserActivityRequestUpdate
} from "../interfaces"
import { IUserActivityRequestEnriched } from "../interfaces/user-activity-request-enriched.interface"
import { IActivityLastDailyActivityRequestFilter, IActivityRequestDailyEntityEnriched } from "../modules/activity-daily/interfaces"
import { ActivityDailyService } from "../modules/activity-daily/services/activity-daily.service"
import {
	IActivitySharedRequestCancelRequest,
	IActivitySharedRequestReviewRequest,
	IActivitySharedRequestUpdateRequest,
	IInvokerMetadata
} from "../modules/activity-shared/interfaces"
import { ActivitySharedService } from "../modules/activity-shared/services/activity-shared.service"
import { ActivityVirtualService } from "../modules/activity-virtual/services/activity-virtual.service"
import { UserActivityRepository } from "../repository/user-activity.repository"
import { UserActivityFactoryWorkerService } from "./user-activity-factory-worker.service"
import { IUserActivityDailyEnriched } from "../modules/activity-daily/interfaces/db/activity-daily-enriched.interface"
import { ActivityPerformanceReviewService } from "../modules/activity-performance-review/services/activity-performance-review.service"
import { ActivityPerformanceReviewResponse } from "../modules/activity-performance-review/dtos/response/activity-performance-review.response"
import _ from "lodash"
import { UserHelper } from "src/utils/helpers/user.helper"
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { IPaginatedResponse, IUserCommon } from "src/utils/types/interfaces"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { IUserVirtualActivity } from "../modules/activity-virtual/interfaces"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"

@Injectable()
export class UserActivityService {
	constructor(
		private readonly userActivityFactoryWorkerService: UserActivityFactoryWorkerService,
		private readonly userActivityRepository: UserActivityRepository,
		private readonly activityVirtualService: ActivityVirtualService,
		private readonly activitySharedService: ActivitySharedService,
		private readonly utilityService: UtilityService,
		private readonly activityDailyService: ActivityDailyService,
		private readonly activityPerformanceReviewService: ActivityPerformanceReviewService
	) {}
	private readonly logger = new Logger(UserActivityService.name)

	async handleCreateActivity(
		userInvoker: IInvokerMetadata,
		activityRequestCreate: IUserActivityRequestCreate,
		activityCommonParams: IUserActivityCommonParams
	): Promise<IUserActivityRequestEnriched> {
		const dateStart = "date" in activityRequestCreate ? activityRequestCreate.date : activityRequestCreate.dateStart
		const dateEnd = "date" in activityRequestCreate ? activityRequestCreate.date : activityRequestCreate.dateEnd

		await this.validateUserActive(activityCommonParams.userId)

		return this.userActivityFactoryWorkerService.createActivityRequest(userInvoker, { ...activityRequestCreate, dateStart, dateEnd, ...activityCommonParams })
	}

	async handleUpdateActivity(
		userInvoker: IInvokerMetadata,
		activityRequestUpdate: IUserActivityRequestUpdate,
		activitySharedRequestUpdate: IActivitySharedRequestUpdateRequest
	): Promise<IUserActivityRequestEnriched> {
		const activityRequest = await this.getActivityRequestOrThrow({
			id: activitySharedRequestUpdate.id,
			userId: activitySharedRequestUpdate.userId
		})

		await this.validateUserActive(activitySharedRequestUpdate.userId)

		return this.userActivityFactoryWorkerService.updateActivityRequest(userInvoker, { ...activityRequestUpdate, ...activitySharedRequestUpdate })
	}

	async handleCancelActivity(userInvoker: IInvokerMetadata, activityRequestCancel: IActivitySharedRequestCancelRequest): Promise<IUserActivityRequestEnriched> {
		const activityRequest = await this.getActivityRequestOrThrow({
			id: activityRequestCancel.id,
			userId: activityRequestCancel.userId
		})

		return this.userActivityFactoryWorkerService.cancelActivityRequest(userInvoker, activityRequestCancel, activityRequest.activityType)
	}

	async handleReviewActivity(userInvoker: IAuthJwtPassportUserRequest, activityRequestReview: IActivitySharedRequestReviewRequest): Promise<IUserActivityRequestEnriched> {
		const activityRequest = await this.getActivityRequestOrThrow({
			id: activityRequestReview.id,
			userId: activityRequestReview.userId
		})

		return this.userActivityFactoryWorkerService.reviewActivityRequest(userInvoker, activityRequestReview, activityRequest.activityType)
	}

	async getUserActivity(
		userInvoker: IAuthJwtPassportUserRequest,
		userCommon: IUserCommon,
		id: number
	): Promise<{ activity: UserActivityEntity; previousActivityRequest?: IActivityRequestDailyEntityEnriched }> {
		const activity = await this.userActivityRepository.getUserActivityByIdOrThrow(userCommon, id)
		const previousActivityRequest = UserActivityType.Unassigned
			? await this.activityDailyService.getLastDailyRequestActivity(userInvoker, { ...userCommon, date: activity.date })
			: undefined
		return { activity, previousActivityRequest }
	}

	async getLastDailyRequestActivity(
		userInvoker: IAuthJwtPassportUserRequest,
		filter: IActivityLastDailyActivityRequestFilter
	): Promise<IActivityRequestDailyEntityEnriched | undefined> {
		return this.activityDailyService.getLastDailyRequestActivity(userInvoker, filter)
	}

	async getUserActivityList(filters: IUserActivityListFilterRequest): Promise<(UserActivityEntity | IUserVirtualActivity | IUserActivityDailyEnriched)[]> {
		const { fromDateStart, toDateEnd, virtualActivities, userId } = filters
		const { fromDateStart: dateStart, toDateEnd: dateEnd } = await this.limitRequestDateRange(fromDateStart, toDateEnd, userId)

		const dates = DateHelper.iterateDateRange({ dateStart: dateStart, dateEnd: dateEnd })

		const holidays = await this.activitySharedService.getHolidays({
			dateStart: dateStart,
			dateEnd: dateEnd
		})

		const activities = await this.userActivityRepository.getUserActivityList(filters)
		let allUserActivities: (UserActivityEntity | IUserVirtualActivity | IUserActivityDailyEnriched)[] = []

		for (const date of dates) {
			const parsedDate = DateHelper.parseDate(date)
			const userActivitiesForDate = activities.filter(activity => DateHelper.parseDate(activity.date) === parsedDate)

			const nonCanceledActivities = userActivitiesForDate.filter(activity => activity.status !== UserActivityStatus.Canceled)
			if (nonCanceledActivities.length > 0) {
				allUserActivities.push(...nonCanceledActivities)
			} else if (virtualActivities) {
				const virtualActivity = this.activityVirtualService.createVirtualActivity(date, holidays)
				if (virtualActivity) {
					allUserActivities.push(virtualActivity)
				}
			}
		}

		allUserActivities = await this.enrichDailyActivity(allUserActivities)
		return filters.sortingDir === "asc" ? allUserActivities : allUserActivities.reverse()
	}

	async enrichDailyActivity(
		activities: (UserActivityEntity | IUserVirtualActivity | IUserActivityDailyEnriched)[]
	): Promise<(UserActivityEntity | IUserVirtualActivity | IUserActivityDailyEnriched)[]> {
		return Promise.all(
			activities.map(async activity => {
				if (activity.activityType === UserActivityType.Daily) {
					return await this.activityDailyService.enrichActivity(activity)
				}
				return activity
			})
		)
	}

	private async limitRequestDateRange(fromDateStart: Date, toDateEnd: Date, userId: number): Promise<{ fromDateStart: Date; toDateEnd: Date }> {
		const earliestActivity = await this.activitySharedService.getUserEarliestActivity(userId)

		const maxYearsInPast = 1
		const activityDate = earliestActivity ? earliestActivity.date : new Date()
		const minDate = DateHelper.subtract(activityDate, maxYearsInPast, "year")

		const maxYearsInFuture = 2
		const maxDate = DateHelper.add(DateHelper.getEndOfDay(new Date()), maxYearsInFuture, "year")

		return {
			fromDateStart: DateHelper.isDateAfterOrEqualDate(minDate, fromDateStart) ? fromDateStart : minDate,
			toDateEnd: DateHelper.isDateAfterOrEqualDate(toDateEnd, maxDate) ? toDateEnd : maxDate
		}
	}

	async getUserActivityRequest(userInvoker: IAuthJwtPassportUserRequest, userCommon: IUserCommon, id: number): Promise<IUserActivityRequestEnriched> {
		const activityRequest = await this.userActivityRepository.getUserActivityRequestByIdOrThrow(userCommon, id)
		const activityRequestEnriched = await this.userActivityFactoryWorkerService.enrichActivityRequest(userInvoker, activityRequest)
		return activityRequestEnriched
	}

	async getUserActivityRequestList(userInvoker: IAuthJwtPassportUserRequest, filters: IUserActivityRequestListFilterRequest): Promise<IUserActivityRequestEnriched[]> {
		if (filters.fullName && filters.fullName.split(" ").filter(name => name.length > 0).length > 3)
			throw new BadRequestException("Name can't contain more than 3 words", `Name can't contain more than 3 words. Requested name: ${filters.fullName}`)
		const toDateEnd = filters.toDateEnd ? DateHelper.getEndOfDay(filters.toDateEnd) : undefined
		const activityRequests = await this.userActivityRepository.getUserActivityRequestList({ ...filters, toDateEnd })

		// TODO Can be optimized by preparing needed data in advance
		const activityRequestsEnriched = await Promise.all(
			activityRequests.map(activityRequest => this.userActivityFactoryWorkerService.enrichActivityRequest(userInvoker, activityRequest))
		)

		return activityRequestsEnriched
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

	async getRequestOverviewPaginationUserHub(
		userInvoker: IAuthJwtPassportUserRequest,
		filters: IUserActivityRequestPaginationFilterDBRequest,
		userIdFromParams: number
	): Promise<IPaginatedResponse<IUserActivityRequestEnriched>> {
		const userId = filters.forceShowDataForUserInParams ? userIdFromParams : userInvoker.user.id

		const userIds = await this.filterUsersUserHub(userId, filters.showSubordinatesByLevel)

		return this.getRequestOverviewPagination(userInvoker, filters, userIds)
	}

	async getRequestOverviewPaginationAdminHub(
		userInvoker: IAuthJwtPassportUserRequest,
		filters: IUserActivityRequestPaginationFilterDBRequest,
		userIdFromParams: number
	): Promise<IPaginatedResponse<IUserActivityRequestEnriched>> {
		const userId = filters.forceShowDataForUserInParams ? userIdFromParams : userInvoker.user.id

		const userIds = await this.filterUsersAdminHub(userId, filters.showSubordinatesByLevel)

		return this.getRequestOverviewPagination(userInvoker, filters, userIds)
	}

	async getUserPerformanceReviewActivityList(userId: number): Promise<ActivityPerformanceReviewResponse[]> {
		return await this.activityPerformanceReviewService.getActivityRequests({ userId })
	}

	private async getRequestOverviewPagination(
		userInvoker: IAuthJwtPassportUserRequest,
		filters: IUserActivityRequestPaginationFilterDBRequest,
		userIds: number[]
	): Promise<IPaginatedResponse<IUserActivityRequestEnriched>> {
		const toDateEnd = filters.toDateEnd ? DateHelper.getEndOfDay(filters.toDateEnd) : undefined
		const { data: dataRaw, meta } = await this.userActivityRepository.getUserActivityRequestListPagination({
			...filters,
			userIds,
			toDateEnd
		})

		const data = await Promise.all(dataRaw.map(activityRequest => this.userActivityFactoryWorkerService.enrichActivityRequest(userInvoker, activityRequest, userIds)))

		return {
			data,
			meta
		}
	}

	private async getActivityRequestOrThrow({ id, userId }: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity> {
		const activityRequest = await this.activitySharedService.getActivityRequest({ id, userId })
		if (!activityRequest) {
			throw new NotFoundException("Activity not found", `Activity with ID ${id?.toString()} not found`)
		}

		return activityRequest
	}

	private async validateUserActive(userId: number) {
		const user = await this.activitySharedService.getUserById(userId)
		UserHelper.validateActive(user)
	}

	private alreadyHasWorkingHours(activitiesOnDate: UserActivityEntity[]): boolean {
		if (activitiesOnDate.every(activity => activity.workingHours)) return true

		return false
	}

	private separateWorkingAndBreakEntries(entries: UserWorkingHoursEntity[]): {
		workingEntries: UserWorkingHoursEntity[]
		breakEntries: UserWorkingHoursEntity[]
	} {
		const workingEntries = entries.filter(entry => entry.type === "Work")
		const breakEntries = entries.filter(entry => entry.type === "Break")

		return { workingEntries, breakEntries }
	}

	private async assignNewWorkingHourDeleteOld(activity: UserActivityEntity, workingHour: UserWorkingHoursEntity, oldWorkingHours: UserWorkingHoursEntity[]) {
		await this.activityDailyService.assignNewWorkingHourDeleteOld(activity, workingHour, oldWorkingHours)
	}

	private async assignWorkingHoursToActivities(activities: UserActivityEntity[], workingHours: UserWorkingHoursEntity[]) {
		await this.activityDailyService.assignWorkingHoursToActivities(activities, workingHours)
	}

	private async createDefaultWorkingHoursEntry(activities: UserActivityEntity[]) {
		//CREATE ONE WORKING HOUR AND ASSIGN IT
		const defaultTimeRange = {
			fromTimeStart: "08:00",
			toTimeEnd: "16:00"
		}

		const workingHours = await this.activityDailyService.addWorkingHours(activities, [defaultTimeRange])
		await this.activityDailyService.assignWorkingHoursResponseToActivities(activities, workingHours)
	}

	private async createDefaultMultipleWorkingHoursEntry(activities: UserActivityEntity[]) {
		//CREATE N WORKING HOURS AND ASSIGN IT

		const baseDate = new Date(activities[0].date)
		const year = baseDate.getFullYear()
		const month = baseDate.getMonth()
		const day = baseDate.getDate()
		const defaultTimeRange = {
			fromTimeStart: new Date(year, month, day, 8, 0, 0), // 08:00 AM
			toTimeEnd: new Date(year, month, day, 16, 0, 0) // 16:00 PM
		}

		const timeRanges = await this.splitWorkingHours(defaultTimeRange, activities.length)

		const workingHours = await this.activityDailyService.addWorkingHours(activities, timeRanges)
		await this.activityDailyService.assignWorkingHoursResponseToActivities(activities, workingHours)
	}

	private async createExistingMultipleWorkingHoursEntry(activities: UserActivityEntity[], workingHour: UserWorkingHoursEntity) {
		//CREATE N WORKING HOURS AND ASSIGN IT

		const timeRange = { fromTimeStart: workingHour.fromDateStart, toTimeEnd: workingHour.toDateEnd ?? DateHelper.add(workingHour.fromDateStart, 8, "hour") }
		const timeRanges = await this.splitWorkingHours(timeRange, activities.length)

		const workingHours = await this.activityDailyService.addWorkingHours(activities, timeRanges)
		await this.activityDailyService.assignWorkingHoursResponseToActivities(activities, workingHours)
	}

	private splitWorkingHours(timeRange: { fromTimeStart: Date; toTimeEnd: Date }, numberOfSplits: number): { fromTimeStart: string; toTimeEnd: string }[] {
		const totalMinutes = Math.round((timeRange.toTimeEnd.getTime() - timeRange.fromTimeStart.getTime()) / 60000)
		const splitDuration = Math.round(totalMinutes / numberOfSplits)

		const result: { fromTimeStart: string; toTimeEnd: string }[] = []

		for (let i = 0; i < numberOfSplits; i++) {
			const start = new Date(timeRange.fromTimeStart.getTime() + i * splitDuration * 60000)
			const end = new Date(timeRange.fromTimeStart.getTime() + (i + 1) * splitDuration * 60000)

			result.push({
				fromTimeStart: this.formatTime(start),
				toTimeEnd: this.formatTime(end)
			})
		}
		return result
	}

	private formatTime(date: Date): string {
		const hours = date.getHours().toString().padStart(2, "0")
		const minutes = date.getMinutes().toString().padStart(2, "0")
		return `${hours}:${minutes}`
	}

	private mergeWorkingHours(entities: UserWorkingHoursEntity[]): UserWorkingHoursEntity {
		const minFromDate = new Date(Math.min(...entities.map(e => e.fromDateStart.getTime())))
		const maxToDate = new Date(Math.max(...entities.map(e => (e.toDateEnd ? e.toDateEnd.getTime() : e.fromDateStart.getTime()))))

		return {
			id: 1,
			userId: entities[0].userId,
			type: entities[0].type,
			fromDateStart: minFromDate,
			toDateEnd: maxToDate
		}
	}

	private async handleLunchActivities(activities: UserActivityEntity[], breakEntries: UserWorkingHoursEntity[]) {
		if (breakEntries.length === 0) return

		await this.activityDailyService.handleLunchActivities(activities[0], breakEntries)
	}

	private handleNoProjectDaily(activities: UserActivityEntity[]) {
		if (activities.some(activity => !activity.projectId || activity.projectId === null)) {
			return true
		}
		return false
	}
}
