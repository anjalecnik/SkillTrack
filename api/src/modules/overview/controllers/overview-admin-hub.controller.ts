import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ROUTE_ADMIN_HUB, API_TAG_ACTIVITY_OVERVIEW, ROUTE_OVERVIEW } from "src/utils/constants"
import { UserGuard } from "src/utils/guards"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { OverviewResponse } from "../dtos/response/overview.response"
import { OverviewService } from "../services/overview.service"
import { OverviewWorkingHoursResponse } from "../dtos/response/overview-working-hours.response"

@Controller(`/${ROUTE_ADMIN_HUB}`)
@ApiTags(API_TAG_ACTIVITY_OVERVIEW)
@ApiBearerAuth()
@UseGuards(UserGuard(UserRole.Admin, UserRole.Owner))
export class OverviewAdminHubController {
	constructor(private readonly overviewService: OverviewService) {}

	@Get(`/${ROUTE_OVERVIEW}`)
	@ApiOperation({ summary: "Returns dashboard statistics", description: `Returns dashboard statistics` })
	@ApiOkResponse({ description: "Returns dashboard statistics", type: OverviewResponse })
	async getDashboardStatistics(): Promise<OverviewResponse> {
		return await this.overviewService.getDashboardStatistics()
	}

	@Get(`/${ROUTE_OVERVIEW}/working-hours`)
	@ApiOperation({ summary: "Returns dashboard working hours statistics", description: `Returns dashboard working hours statistics` })
	@ApiOkResponse({ description: "Returns dashboard working hours statistics", type: OverviewWorkingHoursResponse })
	async getDashboardWorkingHoursStatistics(): Promise<OverviewWorkingHoursResponse> {
		return await this.overviewService.getDashboardWorkingHoursStatistics()
	}
}
