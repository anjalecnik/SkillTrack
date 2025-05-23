import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { FindOptionsWhere } from "typeorm"
import {
	IActivitySharedCalculateWorkHours,
	IActivitySharedCancelDBRequest,
	IActivitySharedFilter,
	IActivitySharedGetDatesActivity,
	IActivitySharedRequestCancelDBRequest,
	IActivitySharedRequestReviewDBRequest,
	IActivitySharedReviewDBRequest
} from "../interfaces"
import { ActivitySharedRepository } from "../repository/activity-shared.repository"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"

@Injectable()
export class ActivitySharedService {
	constructor(private readonly activitySharedRepository: ActivitySharedRepository, private readonly utilityService: UtilityService) {}

	async getDatesFromRange(getDateRangeMeta: IActivitySharedGetDatesActivity): Promise<Date[]> {
		const dateStart = DateHelper.getStartOfDay(getDateRangeMeta.dateStart)
		const dateEnd = DateHelper.getEndOfDay(getDateRangeMeta.dateEnd)
		const rawDates = DateHelper.iterateDateRange({ dateStart, dateEnd })
		const workDays = await this.utilityService.getWorkingDays(rawDates)
		const datesFiltered = workDays.reduce((acc: Date[], current): Date[] => {
			if (current.isWorkingDay) acc.push(current.date)
			return acc
		}, [])

		if (datesFiltered.length === 0) {
			const formattedDates = rawDates.map(date => date.toISOString()).join(", ")
			throw new BadRequestException("Invalid date range. Make sure you didn't select holiday or weekend", `Invalid date range. Selected dates: ${formattedDates}`)
		}

		return datesFiltered
	}

	async getHolidays(dateRange: IActivitySharedGetDatesActivity): Promise<HolidayEntity[]> {
		return this.activitySharedRepository.getHolidays(dateRange)
	}

	async getActivitiesOnDay(dayDate: Date, filters: IActivitySharedFilter): Promise<UserActivityEntity[]> {
		return this.activitySharedRepository.getActivitiesOnDay(dayDate, filters)
	}

	async getUserExpectedWorkHours(): Promise<number> {
		return 8
	}

	async getProjectById(projectId: number): Promise<ProjectEntity> {
		return this.activitySharedRepository.getProjectOrThrow(projectId)
	}

	async calculateActivityHours(activities: IActivitySharedCalculateWorkHours[], excludeActivity?: Pick<UserActivityEntity, "id">[]) {
		if (activities.length <= 0) return 0
		const assignedWorkHours = 8
		return activities.reduce((acc, currentActivity) => {
			if (excludeActivity && excludeActivity.find(ex => ex.id === currentActivity.id)) return acc
			if (currentActivity.activityType === UserActivityType.Daily) return acc + (currentActivity.hours ?? 0)
			if (currentActivity.activityType === UserActivityType.BusinessTrip) return acc + (currentActivity.hours ?? assignedWorkHours)
			return acc
		}, 0)
	}

	async getActivityRequest(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity | null> {
		return this.activitySharedRepository.findActivityRequest(whereOptions)
	}

	async getActivityRequestWithActivitiesOrFail(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity> {
		return this.activitySharedRepository.findActivityRequestWithActivitiesOrFail(whereOptions)
	}

	async getActivityRequestWithActivities(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity | null> {
		return this.activitySharedRepository.findActivityRequestWithActivities(whereOptions)
	}

	async findActivityRequestOrFail<T extends UserActivityRequestEntity>({ id, userId }: { id: number; userId: number }): Promise<T> {
		return this.activitySharedRepository.findActivityRequestOrFail<T>({
			where: { id, userId },
			relations: { userActivities: true }
		})
	}

	async cancelActivityRequest(cancelActivityRequest: IActivitySharedRequestCancelDBRequest, cancelActivity: IActivitySharedCancelDBRequest[]): Promise<UserActivityRequestEntity> {
		return this.activitySharedRepository.cancelActivityRequest(cancelActivityRequest, cancelActivity)
	}

	async reviewActivityRequest(reviewActivityRequest: IActivitySharedRequestReviewDBRequest, reviewActivity: IActivitySharedReviewDBRequest[]): Promise<UserActivityRequestEntity> {
		return this.activitySharedRepository.reviewActivityRequest(reviewActivityRequest, reviewActivity)
	}

	async getActivitiesForActivityDates(
		{ userId }: Pick<UserActivityRequestEntity, "userId">,
		activityDates: Pick<UserActivityEntity, "date">[],
		excludeActivityRequestIds?: number[],
		statuses: UserActivityStatus[] = [UserActivityStatus.Approved, UserActivityStatus.PendingApproval]
	): Promise<UserActivityEntity[]> {
		const dates = activityDates.map(activity => activity.date)
		const excludeIds = excludeActivityRequestIds ? await this.getActivityIdsFromActivityRequests(excludeActivityRequestIds) : undefined

		return this.activitySharedRepository.getActivitiesOnDayInRange({
			userId,
			dates,
			statuses,
			excludeActivityIds: excludeIds
		})
	}

	async getActivityRequestsForDates(
		{ userId }: Pick<UserActivityRequestEntity, "userId">,
		dates: Date[],
		statuses: UserActivityStatus[] = [UserActivityStatus.Approved, UserActivityStatus.PendingApproval],
		activityTypes?: UserActivityType[]
	): Promise<UserActivityRequestEntity[]> {
		return this.activitySharedRepository.getActivitiesRequestsOnDayInRange({
			userId,
			dates,
			statuses,
			activityTypes
		})
	}

	async getUserById(userId: number): Promise<UserEntity> {
		return this.activitySharedRepository.getUserById(userId)
	}

	async getUserEarliestActivity(userId: number): Promise<UserActivityEntity | undefined> {
		return this.activitySharedRepository.getEarliestActivityByUserId(userId)
	}

	private async getActivityIdsFromActivityRequests(excludeActivityRequestIds: number[]): Promise<number[]> {
		const activityRequests = await this.activitySharedRepository.getActivityRequestById(excludeActivityRequestIds)
		return activityRequests.reduce((acc, activityRequest): number[] => [...acc, ...activityRequest.userActivities.map(activity => activity.id)], [] as number[])
	}

	checkPendingActivityOnCancel(activityRequest: Pick<UserActivityRequestEntity, "status">) {
		if (activityRequest.status === UserActivityStatus.PendingApproval) return true
		return false
	}
}
