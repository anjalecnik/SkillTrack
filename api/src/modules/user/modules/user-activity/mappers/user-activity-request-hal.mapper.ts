import { InternalServerErrorException } from "@nestjs/common"
import { UserActivityRequestListFilterRequest } from "../dtos/request/user-activity-request-list-filter.request"
import { UserActivityRequestPaginationFilterRequest } from "../dtos/request/user-activity-request-pagination-filter.request"
import { UserActivityRequestListHalResponse } from "../dtos/response/user-activity-request-list-hal.response"
import { UserActivityRequestPaginationHalResponse } from "../dtos/response/user-activity-request-pagination-hal.response"
import { IUserActivityRequestEnriched } from "../interfaces/user-activity-request-enriched.interface"
import { ActivityRequestBusinessTripListItemHalResponse } from "../modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response"
import { ActivityBusinessTripHalMapper } from "../modules/activity-business-trip/mappers/activity-business-trip-hal.mapper"
import { ActivityRequestDailyListItemHalResponse } from "../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response"
import { ActivityDailyHalMapper } from "../modules/activity-daily/mappers/activity-daily-hal.mapper"
import { IActivitySharedMapperPathParams } from "../modules/activity-shared/interfaces"
import { ActivityRequestSickLeaveListItemHalResponse } from "../modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response"
import { ActivitySickLeaveHalMapper } from "../modules/activity-sick-leave/mappers/activity-sick-leave-hal.mapper"
import { ActivityRequestVacationListItemHalResponse } from "../modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response"
import { ActivityVacationHalMapper } from "../modules/activity-vacation/mappers/activity-vacation-hal.mapper"
import { ActivityPerformanceReviewHalMapper } from "../modules/activity-performance-review/mappers/activity-performance-review-hal.mapper"
import { ActivityRequestPerformanceReviewListItemHalResponse } from "../modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response"
import { Config } from "src/utils/config/config"
import { ROUTE_ACTIVITY, ROUTE_REQUEST, ROUTE_USER } from "src/utils/constants"
import { HalHelper } from "src/utils/helpers/hal.helper"
import { PaginationHelper } from "src/utils/helpers/pagination.helper"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export abstract class UserActivityRequestHalMapper {
	private static composeUserRequestListPath(pathParams: IActivitySharedMapperPathParams): string {
		return `${Config.get<string>("APP_API_PREFIX")}/${ROUTE_USER}/${pathParams.userId}/${ROUTE_ACTIVITY}/${ROUTE_REQUEST}`
	}

	private static composeUserRequestOverviewPaginationPath(pathParams: IActivitySharedMapperPathParams): string {
		return `${Config.get<string>("APP_API_PREFIX")}/${ROUTE_USER}/${pathParams.userId}/${ROUTE_ACTIVITY}/${ROUTE_REQUEST}/overview`
	}

	static mapUserActivityRequestListHal(
		activityRequests: IUserActivityRequestEnriched[],
		filters: UserActivityRequestListFilterRequest,
		pathParams: IActivitySharedMapperPathParams
	): UserActivityRequestListHalResponse {
		const url = this.composeUserRequestListPath(pathParams)
		return {
			_links: {
				self: HalHelper.halSelf(url, filters)
			},
			requests: [...activityRequests.map(activityRequest => this.mapActivityRequestHal(activityRequest))]
		}
	}

	static mapUserActivityRequestPaginationHal(
		{ data: activityRequests, meta }: IPaginatedResponse<IUserActivityRequestEnriched>,
		filters: UserActivityRequestPaginationFilterRequest,
		pathParams: IActivitySharedMapperPathParams
	): UserActivityRequestPaginationHalResponse {
		const url = this.composeUserRequestOverviewPaginationPath(pathParams)
		HalHelper.halPaginationLinks(url, filters, meta)
		return {
			_links: HalHelper.halPaginationLinks(url, filters, meta),
			...PaginationHelper.mapPaginationMetaResponse(meta),
			_embedded: {
				requests: [...activityRequests.map(activityRequest => this.mapActivityRequestHal(activityRequest))]
			}
		}
	}

	static mapActivityRequestHal(
		activityRequest: IUserActivityRequestEnriched
	):
		| ActivityRequestBusinessTripListItemHalResponse
		| ActivityRequestDailyListItemHalResponse
		| ActivityRequestSickLeaveListItemHalResponse
		| ActivityRequestVacationListItemHalResponse
		| ActivityRequestPerformanceReviewListItemHalResponse {
		switch (activityRequest.activityType) {
			case UserActivityType.BusinessTrip:
				return ActivityBusinessTripHalMapper.mapActivityRequestListItem(activityRequest)
			case UserActivityType.Daily:
				return ActivityDailyHalMapper.mapActivityRequestListItem(activityRequest)
			case UserActivityType.SickLeave:
				return ActivitySickLeaveHalMapper.mapActivityRequestListItem(activityRequest)
			case UserActivityType.Vacation:
				return ActivityVacationHalMapper.mapActivityRequestListItem(activityRequest)
			case UserActivityType.PerformanceReview:
				return ActivityPerformanceReviewHalMapper.mapActivityRequestListItem(activityRequest)
			default:
				throw new InternalServerErrorException("Activity type is missing")
		}
	}
}
