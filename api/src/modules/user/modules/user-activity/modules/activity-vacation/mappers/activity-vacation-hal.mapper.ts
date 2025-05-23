import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { ActivitySharedHalMapper } from "../../activity-shared/mappers/activity-shared-hal.mapper"
import { ActivityRequestVacationListItemHalResponse } from "../dtos/response/activity-request-vacation-list-item-hal.response"
import { ActivityVacationListItemHalResponse } from "../dtos/response/activity-vacation-list-item-hal.response"
import { IActivityRequestVacationDB, IActivityRequestVacationEntityEnriched, IActivityVacationDB } from "../interfaces"
import { DateHelper } from "src/utils/helpers/date.helper"

export abstract class ActivityVacationHalMapper {
	static mapActivityListItem(data: UserActivityEntity): ActivityVacationListItemHalResponse {
		const activity = data as IActivityVacationDB
		const activityRequest = activity.activityRequest as IActivityRequestVacationDB

		return {
			...ActivitySharedHalMapper.mapActivityListItemBase(activity),
			date: DateHelper.formatIso8601DayString(activity.date),
			dateStart: DateHelper.formatIso8601DayString(activityRequest.dateStart),
			dateEnd: DateHelper.formatIso8601DayString(activityRequest.dateEnd),
			description: activityRequest.description ?? undefined,
			reviewedByUserId: activity.reviewedByUserId ?? undefined,
			createdAt: DateHelper.formatIso8601DayString(activity.createdAt),
			...ActivitySharedHalMapper.mapActivityHalLinks(activity)
		}
	}

	static mapActivityRequestListItem(activityRequest: IActivityRequestVacationEntityEnriched): ActivityRequestVacationListItemHalResponse {
		const activities = activityRequest.userActivities as IActivityVacationDB[]

		return {
			...ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
			dateStart: DateHelper.formatIso8601DayString(activityRequest.dateStart),
			dateEnd: DateHelper.formatIso8601DayString(activityRequest.dateEnd),
			reviewedByUserId: activityRequest.reviewedByUserId ?? undefined,
			description: activityRequest.description ?? undefined,
			createdAt: DateHelper.formatIso8601DayString(activityRequest.createdAt),
			_embedded: {
				activities: activities.map(activity => ({
					...ActivitySharedHalMapper.mapActivityRequestEmbeddedActivityBase(activity),
					...ActivitySharedHalMapper.mapActivityHalLinks(activity)
				})),
				...ActivitySharedHalMapper.mapActivityRequestEmbeddedBase(activityRequest)
			},
			...ActivitySharedHalMapper.mapActivityRequestHalLinks(activityRequest)
		}
	}
}
