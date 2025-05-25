import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { ActivitySharedHalMapper } from "../../activity-shared/mappers/activity-shared-hal.mapper"
import { ActivityPerformanceReviewListItemHalResponse } from "../dtos/response/activity-performance-review-list-item-hal.response"
import { ActivityRequestPerformanceReviewListItemHalResponse } from "../dtos/response/activity-request-performance-review-list-item-hal.response"
import { IActivityPerformanceReviewEntityEnriched, IActivityRequestPerformanceReviewEntityEnriched } from "../interfaces/activity-request-performance-review-enriched.interface"
import { IActivityPerformanceReviewDB } from "../interfaces/db/activity-performance-review-db.interface"
import { IActivityRequestPerformanceReviewDB } from "../interfaces/db/activity-request-performance-review-db.interface"

export abstract class ActivityPerformanceReviewHalMapper {
	static mapActivityListItem(data: UserActivityEntity): ActivityPerformanceReviewListItemHalResponse {
		const activity = data as IActivityPerformanceReviewDB
		const activityRequest = activity.activityRequest as IActivityRequestPerformanceReviewDB

		return {
			...ActivitySharedHalMapper.mapActivityListItemBase(activity),
			date: DateHelper.formatIso8601DayString(activity.date),
			dateStart: DateHelper.formatIso8601DayString(activityRequest.dateStart),
			reviewedByUserId: activity.reviewedByUserId ?? undefined,
			createdAt: DateHelper.formatIso8601DayString(activity.createdAt),
			...ActivitySharedHalMapper.mapActivityHalLinks(activity)
		}
	}

	static mapActivityRequestListItem(
		activityRequest: IActivityRequestPerformanceReviewEntityEnriched | IActivityPerformanceReviewEntityEnriched
	): ActivityRequestPerformanceReviewListItemHalResponse {
		const activities = activityRequest.userActivities as IActivityPerformanceReviewDB[]

		return {
			...ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
			date: DateHelper.formatIso8601DayString(activityRequest.dateStart),
			createdAt: DateHelper.formatIso8601DayString(activityRequest.createdAt),
			_embedded: {
				activities: activities?.map(activity => ({
					...ActivitySharedHalMapper.mapActivityRequestEmbeddedActivityBase(activity),
					...ActivitySharedHalMapper.mapActivityHalLinks(activity)
				})),
				...ActivitySharedHalMapper.mapActivityRequestEmbeddedBase(activityRequest)
			},
			...ActivitySharedHalMapper.mapActivityRequestHalLinks(activityRequest)
		}
	}
}
