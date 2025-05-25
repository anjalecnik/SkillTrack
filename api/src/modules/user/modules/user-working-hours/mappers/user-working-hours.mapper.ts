import { NotFoundException } from "@nestjs/common"
import { IActivityDailyCreateDBRequest, IActivityDailyDB, IActivityDailyWithWorkingHours } from "../../user-activity/modules/activity-daily/interfaces"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { UserWorkingHoursListItemResponse } from "../dtos/response/user-working-hours-list-item.response"
import { UserWorkingHoursResponse } from "../dtos/response/user-working-hours.response"
import { IUserWorkingHoursDateTimeCreateRequest, IActivityDailyCreateDBRequestNullable } from "../interfaces"
import { DateMapper } from "src/utils/mappers/date.mapper"
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"
import { UserWorkingHoursType } from "src/utils/types/enums/user-working-hours.enum"

export abstract class UserWorkingHoursMapper {
	static mapUserWorkingHoursListItem(activity: IActivityDailyDB): UserWorkingHoursListItemResponse {
		return {
			id: activity.workingHoursId!,
			type: activity.workingHours.type,
			fromDateStart: DateMapper.mapSeparateDateTime(activity.workingHours.fromDateStart),
			toDateEnd: activity.workingHours.toDateEnd ? DateMapper.mapSeparateDateTime(activity.workingHours.toDateEnd) : undefined,
			projectName: activity.project?.name ?? null,
			projectId: activity.projectId ?? null
		}
	}

	static mapUserWorkingHoursList(activities: IActivityDailyDB[]): UserWorkingHoursListItemResponse[] | undefined {
		if (activities.some(activity => !activity.workingHours)) return undefined
		return activities.map(activity => this.mapUserWorkingHoursListItem(activity))
	}

	static mapAndCombineActivities(existingDailyActivities: UserActivityEntity[], createRequest: IUserWorkingHoursDateTimeCreateRequest): IActivityDailyCreateDBRequestNullable[] {
		const activities = existingDailyActivities.map(activity => ({
			userId: activity.userId,
			reportedByUserId: activity.reportedByUserId,
			activityType: UserActivityType.Daily as const,
			status: activity.status,
			projectId: activity.projectId ?? null,
			date: activity.date,
			workLocation: activity.workLocation ?? null,
			hours: activity.hours ?? 8
		}))

		const firstActivity = existingDailyActivities[0]
		activities.push({
			userId: firstActivity.userId,
			reportedByUserId: firstActivity.reportedByUserId,
			activityType: UserActivityType.Daily as const,
			status: firstActivity.status,
			projectId: createRequest.projectId ?? null,
			date: firstActivity.date,
			workLocation: createRequest.workLocation ?? null,
			hours: 8
		})

		return activities
	}

	static mapWorkingHoursActivityCreateRequest(createRequest: IUserWorkingHoursDateTimeCreateRequest): UserWorkingHoursResponse {
		return {
			type: UserWorkingHoursType.Work,
			fromDateStart: createRequest.dateTime,
			toDateEnd: null,
			projectId: createRequest.projectId!
		}
	}

	static mapActivitiesToWorkingHours(
		activities: IActivityDailyCreateDBRequest[] | IActivityDailyCreateDBRequestNullable[],
		workingHours: UserWorkingHoursResponse[]
	): IActivityDailyWithWorkingHours[] {
		return activities.map(activity => {
			const index = workingHours.findIndex(wh => wh.projectId === activity.projectId)
			if (index === -1) {
				throw new NotFoundException(`No matching working hours for project ID: ${activity.projectId}`)
			}

			const [matchingHours] = workingHours.splice(index, 1)

			return {
				activity: activity as IActivityDailyCreateDBRequest,
				workingHour: {
					type: matchingHours.type,
					fromDateStart: matchingHours.fromDateStart,
					toDateEnd: matchingHours.toDateEnd,
					userId: activity.userId
				}
			}
		})
	}

	static mapWorkingHoursUpdateWorkEnd(createRequest: IUserWorkingHoursDateTimeCreateRequest, existingWorkingHours: UserWorkingHoursEntity): UserWorkingHoursEntity {
		return {
			id: existingWorkingHours.id,
			type: UserWorkingHoursType.Work,
			fromDateStart: existingWorkingHours.fromDateStart,
			toDateEnd: createRequest.dateTime,
			userId: existingWorkingHours.userId
		}
	}
}
