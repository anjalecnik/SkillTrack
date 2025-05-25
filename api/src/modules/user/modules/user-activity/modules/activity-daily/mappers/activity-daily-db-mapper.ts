import {
	IActivityDailyCreateDBRequest,
	IActivityDailyWithWorkingHours,
	IActivityRequestDailyCreateDBRequest,
	IActivityRequestDailyCreateRequest,
	IActivityRequestDailyUpdateRequest
} from "../interfaces"
import { UserWorkingHoursResponse } from "../../../../user-working-hours/dtos/response/user-working-hours.response"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"

export abstract class ActivityDailyDBMapper {
	static createActivityRequest(createActivityRequest: IActivityRequestDailyCreateRequest): {
		activityRequest: IActivityRequestDailyCreateDBRequest
		activities: IActivityDailyCreateDBRequest[]
	} {
		const activityRequest: IActivityRequestDailyCreateDBRequest = {
			userId: createActivityRequest.userId,
			reportedByUserId: createActivityRequest.reportedByUserId,
			activityType: UserActivityType.Daily,
			dateStart: createActivityRequest.dateStart,
			status: UserActivityStatus.Approved
		}

		const activities: IActivityDailyCreateDBRequest[] = createActivityRequest.workingHours.map(dailyActivity => ({
			userId: createActivityRequest.userId,
			status: UserActivityStatus.Approved,
			activityType: UserActivityType.Daily,
			hours: 8,
			projectId: dailyActivity.projectId,
			workLocation: createActivityRequest.workLocation,
			date: createActivityRequest.dateStart,
			reportedByUserId: createActivityRequest.reportedByUserId
		}))

		return { activityRequest, activities }
	}

	static mapUpdateActivityRequest(
		updateActivityRequest: IActivityRequestDailyUpdateRequest,
		existingActivityRequest: UserActivityRequestEntity,
		workingHours: UserWorkingHoursResponse[]
	): IActivityDailyWithWorkingHours[] {
		const workingHoursCopy = [...workingHours]
		const dailyActiivities = existingActivityRequest.userActivities!.filter(activity => activity.activityType === UserActivityType.Daily)

		const existingActivitiesWithWorkingHours = this.mapActivitiesToWorkingHours(dailyActiivities, workingHoursCopy)
		if (workingHoursCopy.length <= 0 && existingActivitiesWithWorkingHours.length >= 1) {
			existingActivitiesWithWorkingHours.at(-1)!.activity.workLocation = updateActivityRequest.workLocation
			return existingActivitiesWithWorkingHours
		}

		const newActivitiesWithWorkingHours = this.createNewActivitiesFromRemainingHours(updateActivityRequest, workingHoursCopy)

		return [...existingActivitiesWithWorkingHours, ...newActivitiesWithWorkingHours]
	}

	static mapActivitiesToWorkingHours(activities: UserActivityEntity[], workingHours: UserWorkingHoursResponse[]): IActivityDailyWithWorkingHours[] {
		const mappedActivities = activities.map(activity => {
			const index = workingHours.findIndex(wh => wh.projectId === activity.projectId)
			if (index === -1) {
				return null
			}

			const [matchingHours] = workingHours.splice(index, 1)
			const activityCreateRequest: IActivityDailyCreateDBRequest = {
				activityType: UserActivityType.Daily,
				status: UserActivityStatus.Approved,
				date: activity.date,
				hours: 8,
				workLocation: activity.workLocation!,
				userId: activity.userId,
				reportedByUserId: activity.reportedByUserId,
				projectId: activity.projectId!
			}

			return {
				activity: activityCreateRequest,
				workingHour: {
					type: matchingHours.type,
					fromDateStart: matchingHours.fromDateStart,
					toDateEnd: matchingHours.toDateEnd,
					userId: activity.userId
				}
			}
		})
		return mappedActivities.filter(el => el != null) as IActivityDailyWithWorkingHours[]
	}

	static createNewActivitiesFromRemainingHours(
		updateRequest: IActivityRequestDailyUpdateRequest,
		remainingWorkingHours: UserWorkingHoursResponse[]
	): IActivityDailyWithWorkingHours[] {
		return remainingWorkingHours.map(workingHour => {
			const newActivity: IActivityDailyCreateDBRequest = {
				activityType: UserActivityType.Daily,
				status: UserActivityStatus.Approved,
				date: updateRequest.date,
				hours: 8,
				workLocation: updateRequest.workLocation,
				userId: updateRequest.userId,
				reportedByUserId: updateRequest.reportedByUserId,
				projectId: workingHour.projectId
			}

			return {
				activity: newActivity,
				workingHour: {
					type: workingHour.type,
					fromDateStart: workingHour.fromDateStart,
					toDateEnd: workingHour.toDateEnd,
					userId: updateRequest.userId
				}
			}
		})
	}
}
