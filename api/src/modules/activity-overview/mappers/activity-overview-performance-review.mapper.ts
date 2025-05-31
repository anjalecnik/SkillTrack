import { HalHelper } from "src/utils/helpers/hal.helper"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { ActivityPerformanceReviewFilterRequest } from "../dtos/request/activity-performance-review-filter.request"
import { UserWithActivitiesPerformanceReview } from "../dtos/response/activity-performance-review-user.response"
import { IActivityPerformanceReviewHalResponse } from "../interfaces/activity-performance-review-hal-response.interface"

export abstract class ActivityOverviewPerformanceReviewMapper {
	static mapActivityOverview(data: IPaginatedResponse<UserWithActivitiesPerformanceReview>, filter: ActivityPerformanceReviewFilterRequest): IActivityPerformanceReviewHalResponse {
		const href = `api/workspace-hub/activities/performanceReview`
		return {
			_links: { self: HalHelper.halSelf(href, filter) },
			data: data.data,
			meta: data.meta
		}
	}
}
