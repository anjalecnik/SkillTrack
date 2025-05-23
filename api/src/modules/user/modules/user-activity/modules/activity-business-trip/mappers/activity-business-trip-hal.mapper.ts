import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { ActivitySharedHalMapper } from "../../activity-shared/mappers/activity-shared-hal.mapper"
import { ActivityBusinessTripListItemHalResponse } from "../dtos/response/activity-business-trip-list-item-hal.response"
import { ActivityRequestBusinessTripListItemHalResponse } from "../dtos/response/activity-request-business-trip-list-item-hal.response"
import { IActivityBusinessTripDB, IActivityRequestBusinessTripDB, IActivityRequestBusinessTripEntityEnriched } from "../interfaces"
import { DateHelper } from "src/utils/helpers/date.helper"
import { DateMapper } from "src/utils/mappers/date.mapper"

export abstract class ActivityBusinessTripHalMapper {
	static mapActivityListItem(data: UserActivityEntity): ActivityBusinessTripListItemHalResponse {
		const activity = data as IActivityBusinessTripDB
		const activityRequest = activity.activityRequest as IActivityRequestBusinessTripDB

		return {
			...ActivitySharedHalMapper.mapActivityListItemBase(activity),
			date: DateHelper.formatIso8601DayString(activity.date),
			dateStart: DateMapper.mapSeparateDateTime(activityRequest.dateStart),
			dateEnd: DateMapper.mapSeparateDateTime(activityRequest.dateEnd),
			distanceInKM: activityRequest.distanceInKM ?? undefined,
			location: activityRequest.location,
			description: activityRequest.description ?? undefined,
			projectId: activity.projectId ?? undefined,
			projectName: activity.project?.name,
			reviewedByUserId: activity.reviewedByUserId ?? undefined,
			createdAt: DateHelper.formatIso8601DayString(activity.createdAt),
			...ActivitySharedHalMapper.mapActivityHalLinks(activity)
		}
	}

	static mapActivityRequestListItem(activityRequest: IActivityRequestBusinessTripEntityEnriched): ActivityRequestBusinessTripListItemHalResponse {
		const activities = activityRequest.userActivities as IActivityBusinessTripDB[]

		return {
			...ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
			dateStart: DateMapper.mapSeparateDateTime(activityRequest.dateStart),
			dateEnd: DateMapper.mapSeparateDateTime(activityRequest.dateEnd),
			distanceInKM: activityRequest.distanceInKM ?? undefined,
			location: activityRequest.location,
			description: activityRequest.description ?? undefined,
			projectId: activityRequest.projectId ?? undefined,
			projectName: activityRequest.project ? activityRequest.project.name : undefined,
			reviewedByUserId: activityRequest.reviewedByUserId ?? undefined,
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
