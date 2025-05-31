import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ROUTE_ADMIN_HUB, ROUTE_ACTIVITY, API_TAG_ACTIVITY_OVERVIEW, ROUTE_PERFORMANCE_REVIEWS } from "src/utils/constants"
import { UserGuard } from "src/utils/guards"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { ActivityOverviewPerformanceReviewMapper } from "../mappers/activity-overview-performance-review.mapper"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { ActivityPerformanceReviewHalResponse } from "../dtos/response/activity-performance-review-hal.response"
import { ActivityPerformanceReviewFilterRequest } from "../dtos/request/activity-performance-review-filter.request"
import { ActivityOverviewService } from "../services/activity-overview.service"

@Controller(`/${ROUTE_ADMIN_HUB}/${ROUTE_ACTIVITY}`)
@ApiTags(API_TAG_ACTIVITY_OVERVIEW)
@ApiBearerAuth()
@UseGuards(UserGuard(UserRole.Admin, UserRole.Owner))
export class ActivityOverviewAdminHubController {
	constructor(private readonly activityOverviewService: ActivityOverviewService) {}

	@Get(`/${ROUTE_PERFORMANCE_REVIEWS}`)
	@ApiOperation({ summary: "Returns list of users with their performance reviews", description: `Returns list of users with their performance reviews` })
	@ApiOkResponse({ description: "Returns list of users with their performance reviews", type: ActivityPerformanceReviewHalResponse })
	async getPerformanceReviewRequestPagination(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Query() filter: ActivityPerformanceReviewFilterRequest
	): Promise<ActivityPerformanceReviewHalResponse> {
		const data = await this.activityOverviewService.getPerformanceReviewPaginationAdminHub(authPassport, { ...filter })

		return ActivityOverviewPerformanceReviewMapper.mapActivityOverview(data, filter)
	}
}
