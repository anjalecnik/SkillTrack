import { InternalServerErrorException } from "@nestjs/common"
import { UserActivityListFilterRequest } from "../dtos/request/user-activity-list-filter.request"
import { UserActivityListHalResponse } from "../dtos/response/user-activity-list-hal.response"
import { ActivityBusinessTripListItemHalResponse } from "../modules/activity-business-trip/dtos/response/activity-business-trip-list-item-hal.response"
import { ActivityBusinessTripHalMapper } from "../modules/activity-business-trip/mappers/activity-business-trip-hal.mapper"
import { ActivityDailyListItemHalResponse } from "../modules/activity-daily/dtos/response/activity-daily-list-item-hal.response"
import { ActivityDailyHalMapper } from "../modules/activity-daily/mappers/activity-daily-hal.mapper"
import { IActivitySharedMapperPathParams } from "../modules/activity-shared/interfaces"
import { ActivitySickLeaveListItemHalResponse } from "../modules/activity-sick-leave/dtos/response/activity-sick-leave-list-item-hal.response"
import { ActivitySickLeaveHalMapper } from "../modules/activity-sick-leave/mappers/activity-sick-leave-hal.mapper"
import { ActivityVacationListItemHalResponse } from "../modules/activity-vacation/dtos/response/activity-vacation-list-item-hal.response"
import { ActivityVacationHalMapper } from "../modules/activity-vacation/mappers/activity-vacation-hal.mapper"
import { ActivityVirtualListItemHalResponse } from "../modules/activity-virtual/dtos/response/activity-virtual-list-item-hal.response"
import { IUserVirtualActivity } from "../modules/activity-virtual/interfaces"
import { ActivityVirtualHalMapper } from "../modules/activity-virtual/mappers/activity-virtual-hal.mapper"
import { IUserActivityDailyEnriched } from "../modules/activity-daily/interfaces/db/activity-daily-enriched.interface"
import { ActivityPerformanceReviewHalMapper } from "../modules/activity-performance-review/mappers/activity-performance-review-hal.mapper"
import { ActivityPerformanceReviewListItemHalResponse } from "../modules/activity-performance-review/dtos/response/activity-performance-review-list-item-hal.response"
import { ActivityLunchHalMapper } from "../modules/activity-lunch/mappers/activity-lunch-hal.mapper"
import { ActivityLunchListItemHalResponse } from "../modules/activity-lunch/dtos/response/activity-lunch-list-item-hal.response"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { Config } from "src/utils/config/config"
import { ROUTE_ACTIVITY, ROUTE_USER } from "src/utils/constants"
import { HalHelper } from "src/utils/helpers/hal.helper"
import { UserVirtualActivityType } from "src/utils/types/enums/user-virtual-activity.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export abstract class UserActivityHalMapper {
	static mapUserActivityListHal(
		data: (UserActivityEntity | IUserVirtualActivity | IUserActivityDailyEnriched)[],
		filters: UserActivityListFilterRequest,
		pathParams: IActivitySharedMapperPathParams
	): UserActivityListHalResponse {
		const url = this.composeUserActivityListPath(pathParams)
		return {
			_links: {
				self: HalHelper.halSelf(url, filters)
			},
			activities: [...data.map(activity => this.mapActivityHal(activity))]
		}
	}

	static mapActivityHal(
		activity: UserActivityEntity | IUserVirtualActivity | IUserActivityDailyEnriched
	):
		| ActivityBusinessTripListItemHalResponse
		| ActivityDailyListItemHalResponse
		| ActivitySickLeaveListItemHalResponse
		| ActivityVacationListItemHalResponse
		| ActivityVirtualListItemHalResponse
		| ActivityPerformanceReviewListItemHalResponse
		| ActivityLunchListItemHalResponse {
		if (activity.activityType in UserVirtualActivityType) {
			return ActivityVirtualHalMapper.mapActivityListItem(activity as IUserVirtualActivity)
		}

		if (activity.activityType === UserActivityType.BusinessTrip) return ActivityBusinessTripHalMapper.mapActivityListItem(activity)
		if (activity.activityType === UserActivityType.Daily) return ActivityDailyHalMapper.mapActivityListItem(activity)
		if (activity.activityType === UserActivityType.SickLeave) return ActivitySickLeaveHalMapper.mapActivityListItem(activity)
		if (activity.activityType === UserActivityType.Vacation) return ActivityVacationHalMapper.mapActivityListItem(activity)
		if (activity.activityType === UserActivityType.PerformanceReview) return ActivityPerformanceReviewHalMapper.mapActivityListItem(activity)
		if (activity.activityType === UserActivityType.Lunch) return ActivityLunchHalMapper.mapActivityListItem(activity)
		throw new InternalServerErrorException("ActivityType is missing")
	}

	private static composeUserActivityListPath(pathParams: IActivitySharedMapperPathParams): string {
		return `${Config.get<string>("APP_API_PREFIX")}/${ROUTE_USER}/${pathParams.userId}/${ROUTE_ACTIVITY}`
	}
}
