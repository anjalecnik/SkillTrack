import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityLastDailyRequestResponse } from "../../../dtos/response/user-activity-last-daily-request.response"
import { ActivitySharedHalMapper } from "../../activity-shared/mappers/activity-shared-hal.mapper"
import { ActivityDailyListItemHalResponse } from "../dtos/response/activity-daily-list-item-hal.response"
import { ActivityRequestDailyListItemHalResponse } from "../dtos/response/activity-request-daily-list-item-hal.response"
import { IActivityDailyDB, IActivityRequestDailyEntityEnriched } from "../interfaces"
import { IUserActivityDailyEnriched } from "../interfaces/db/activity-daily-enriched.interface"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserWorkingHoursMapper } from "src/modules/user/modules/user-working-hours/mappers/user-working-hours.mapper"

export abstract class ActivityDailyHalMapper {
	static mapActivityListItem(data: UserActivityEntity | IUserActivityDailyEnriched): ActivityDailyListItemHalResponse {
		const activity = data as IActivityDailyDB
		const response: ActivityDailyListItemHalResponse = {
			...ActivitySharedHalMapper.mapActivityListItemBase(activity),
			date: DateHelper.formatIso8601DayString(activity.date),
			hours: activity.hours,
			reviewedByUserId: activity.reviewedByUserId ?? undefined,
			workLocation: activity.workLocation,
			createdAt: DateHelper.formatIso8601DayString(activity.createdAt),
			...ActivitySharedHalMapper.mapActivityHalLinks(activity)
		}
		if (activity.workingHours) {
			response.workingHours = UserWorkingHoursMapper.mapUserWorkingHoursListItem(activity)
		}

		return response
	}

	static mapActivityRequestListItem(activityRequest: IActivityRequestDailyEntityEnriched): ActivityRequestDailyListItemHalResponse {
		const activities = activityRequest.activities as IActivityDailyDB[]
		return {
			...ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
			date: DateHelper.formatIso8601DayString(activityRequest.dateStart),
			lunch: activityRequest.lunch,
			createdAt: DateHelper.formatIso8601DayString(activityRequest.createdAt),
			_embedded: {
				activities: activities.map(activity => ({
					...ActivitySharedHalMapper.mapActivityRequestEmbeddedActivityBase(activity),
					hours: activity.hours,
					workLocation: activity.workLocation,
					...ActivitySharedHalMapper.mapActivityHalLinks(activity),
					workingHour: UserWorkingHoursMapper.mapUserWorkingHoursListItem(activity)
				})),
				...ActivitySharedHalMapper.mapActivityRequestEmbeddedBase(activityRequest)
			},
			...ActivitySharedHalMapper.mapActivityRequestHalLinks(activityRequest)
		}
	}

	static mapPrefillActivityRequestListItem(activityRequest: IActivityRequestDailyEntityEnriched): ActivityRequestDailyListItemHalResponse {
		const activities = activityRequest.activities as IActivityDailyDB[]
		return {
			...ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
			date: DateHelper.formatIso8601DayString(activityRequest.dateStart),
			createdAt: DateHelper.formatIso8601DayString(activityRequest.createdAt),
			lunch: activityRequest.lunch,
			workLocation: activities.at(-1)?.workLocation,
			_embedded: {
				workingHours: UserWorkingHoursMapper.mapUserWorkingHoursList(activities) ?? [],
				...ActivitySharedHalMapper.mapActivityRequestEmbeddedBase(activityRequest)
			},
			...ActivitySharedHalMapper.mapActivityRequestHalLinks(activityRequest)
		}
	}

	static mapLastDailyActivityRequestHal(lastDaily: IActivityRequestDailyEntityEnriched | undefined): UserActivityLastDailyRequestResponse | undefined {
		if (!lastDaily) return undefined
		return this.mapActivityRequestListItem(lastDaily)
	}
}
