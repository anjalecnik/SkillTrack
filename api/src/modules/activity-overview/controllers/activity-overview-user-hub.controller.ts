import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { API_TAG_ACTIVITY_OVERVIEW, ROUTE_ACTIVITY, ROUTE_PERFORMANCE_REVIEWS, ROUTE_USER_HUB } from "src/utils/constants"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { UserGuard } from "src/utils/guards"
import { ActivityPerformanceReviewFilterRequest } from "../dtos/request/activity-performance-review-filter.request"
import { ActivityPerformanceReviewHalResponse } from "../dtos/response/activity-performance-review-hal.response"
import { ActivityOverviewPerformanceReviewMapper } from "../mappers/activity-overview-performance-review.mapper"
import { ActivityOverviewService } from "../services/activity-overview.service"

@Controller(`/${ROUTE_USER_HUB}/${ROUTE_ACTIVITY}`)
@ApiTags(API_TAG_ACTIVITY_OVERVIEW)
@ApiBearerAuth()
@UseGuards(UserGuard())
export class ActivityOverviewUserHubController {
	constructor(private readonly activityOverviewService: ActivityOverviewService) {}

	@Get(`/${ROUTE_PERFORMANCE_REVIEWS}`)
	@ApiOperation({ summary: "Returns list of users with their performance reviews", description: `Returns list of users with their performance reviews` })
	@ApiOkResponse({ description: "Returns list of users with their performance reviews", type: ActivityPerformanceReviewHalResponse })
	async getPerformanceReviewRequestPagination(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Query() filter: ActivityPerformanceReviewFilterRequest
	): Promise<ActivityPerformanceReviewHalResponse> {
		const data = await this.activityOverviewService.getPerformanceReviewPaginationUserHub(authPassport, { ...filter })

		return ActivityOverviewPerformanceReviewMapper.mapActivityOverview(data, filter)
	}
}
