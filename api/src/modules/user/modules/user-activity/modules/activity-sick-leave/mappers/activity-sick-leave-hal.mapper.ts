import { DateHelper } from "src/utils/helpers/date.helper"
import { ActivitySharedHalMapper } from "../../activity-shared/mappers/activity-shared-hal.mapper"
import { ActivityRequestSickLeaveListItemHalResponse } from "../dtos/response/activity-request-sick-leave-list-item-hal.response"
import { ActivitySickLeaveListItemHalResponse } from "../dtos/response/activity-sick-leave-list-item-hal.response"
import { IActivityRequestSickLeaveDB, IActivityRequestSickLeaveEntityEnriched, IActivitySickLeaveDB } from "../interfaces"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"

export abstract class ActivitySickLeaveHalMapper {
	static mapActivityListItem(data: UserActivityEntity): ActivitySickLeaveListItemHalResponse {
		const activity = data as IActivitySickLeaveDB
		const activityRequest = activity.activityRequest as IActivityRequestSickLeaveDB

		return {
			...ActivitySharedHalMapper.mapActivityListItemBase(activity),
			date: DateHelper.formatIso8601DayString(activity.date),
			dateStart: DateHelper.formatIso8601DayString(activityRequest.dateStart),
			dateEnd: DateHelper.formatIso8601DayString(activityRequest.dateEnd),
			description: activityRequest.description ?? undefined,
			hours: activityRequest.hours,
			createdAt: DateHelper.formatIso8601DayString(activity.createdAt),
			...ActivitySharedHalMapper.mapActivityHalLinks(activity)
		}
	}

	static mapActivityRequestListItem(activityRequest: IActivityRequestSickLeaveEntityEnriched): ActivityRequestSickLeaveListItemHalResponse {
		const activities = activityRequest.userActivities as IActivitySickLeaveDB[]

		return {
			...ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
			dateStart: DateHelper.formatIso8601DayString(activityRequest.dateStart),
			dateEnd: DateHelper.formatIso8601DayString(activityRequest.dateEnd),
			description: activityRequest.description ?? undefined,
			hours: activityRequest.hours,
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
