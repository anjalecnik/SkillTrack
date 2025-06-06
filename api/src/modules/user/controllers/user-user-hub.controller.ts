import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { UserGuard, UserSelfOrManagerGuard } from "src/utils/guards"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { ROUTE_USER, API_TAG_USER, ROUTE_USER_HUB } from "src/utils/constants"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { UserService } from "../services/user.service"
import { UserListResponse } from "../dtos/response/user-list.response"
import { UserPaginationFilterRequest } from "../dtos/request/user-pagination-filter.request"
import { UserMapper } from "../mappers/user.mapper"
import { UserDetailsResponse } from "../dtos/response/user-details.response"
import { UserIsSupervisorResponse } from "../dtos/response/user-is-supervisor.response"
import { UserWorkOverviewListHalResponse } from "../dtos/response/user-work-overview-list.hal.response"
import { UserWorkOverviewListFilterRequest } from "../dtos/request/user-work-overview-list-filter.request"
import { UserWorkOverviewMapper } from "../mappers/user-work-overview.mapper"
import { UtilityService } from "src/modules/utility/services/utility.service"

@Controller(`/${ROUTE_USER_HUB}/${ROUTE_USER}`)
@ApiTags(`${API_TAG_USER}`)
export class UserUserHubController {
	constructor(
		private userService: UserService,
		private readonly utilityService: UtilityService
	) {}

	@Get()
	@ApiBearerAuth()
	@UseGuards(UserGuard())
	@ApiOperation({ summary: "Returns list of users", description: `This endpoint requires the "Owner" or "Admin" role.` })
	@ApiOkResponse({ description: "Users", type: UserListResponse })
	async getUserList(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Query() filter: UserPaginationFilterRequest): Promise<UserListResponse> {
		const entities = await this.userService.getSubordinatesList({ ...filter, id: authPassport.user.id })
		return UserMapper.mapUserPaginationList(entities.data, entities.meta)
	}

	@Get("/:userId")
	@ApiBearerAuth()
	@UseGuards(UserSelfOrManagerGuard)
	@ApiOperation({ summary: "Return user", description: `This endpoint requires the "Owner" or "Admin" role. Users with "User" role can only call themselves` })
	@ApiOkResponse({ description: "User", type: UserDetailsResponse })
	async getWorkspaceUser(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Param("userId", ParseIntPipe) userId: number): Promise<UserDetailsResponse> {
		const userDetails = await this.userService.getUser({ id: userId, authPassport })
		await this.userService.setUserActive(userDetails.userEntity.id)
		return UserMapper.mapUserDetails(userDetails)
	}

	@Get("/:userId/requestor-is-supervisor")
	@ApiBearerAuth()
	@UseGuards(UserSelfOrManagerGuard)
	@ApiOperation({
		summary: "Return information if a requestor of this API is a supervisor to an employee in the route parameter",
		description: `This endpoint requires the "Owner" or "Admin" or "Supervisor" role. Users with "User" role can only call themselves`
	})
	@ApiOkResponse({ description: "User", type: UserDetailsResponse })
	async getRequestorUserIsSupervisor(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number
	): Promise<UserIsSupervisorResponse> {
		const isSupervisor = await this.userService.validateGetUser({ id: userId, authPassport })
		return { isSupervisor: isSupervisor }
	}

	@Get("/work/work-overview")
	@ApiOperation({ summary: "Returns report of work overview", description: `Returns report of work overview` })
	@ApiOkResponse({ description: "Returns report of work overview", type: UserWorkOverviewListHalResponse })
	async getWorkspaceWorkOverview(@Query() filter: UserWorkOverviewListFilterRequest): Promise<UserWorkOverviewListHalResponse> {
		const workPositions = await this.userService.getOverview({
			...filter
		})

		const workingDays = await this.userService.getWorkingDays(workPositions, filter)
		const holidays = await this.utilityService.getHolidaysInDateRange(filter.fromDateStart || new Date(), filter.toDateEnd || new Date())

		return UserWorkOverviewMapper.mapWorkOverview(workPositions, filter, workingDays, holidays)
	}
}
