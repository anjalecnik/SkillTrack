import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { UserGuard, UserLoginGuard, UserSelfOrManagerGuard } from "src/utils/guards"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { ROUTE_USER, API_TAG_WORKSPACE, API_TAG_USER, ROUTE_USER_HUB } from "src/utils/constants"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { UserService } from "../services/user.service"
import { UserListResponse } from "../dtos/response/user-list.response"
import { UserPaginationFilterRequest } from "../dtos/request/user-pagination-filter.request"
import { UserMapper } from "../mappers/user.mapper"
import { UserDetailsResponse } from "../dtos/response/user-details.response"
import { UserIsSupervisorResponse } from "../dtos/response/user-is-supervisor.response"
import { UserBaseResponse } from "../dtos/response/user-base.response"
import { UserJoinRequest } from "../dtos/request/user-join.request"

@Controller(`/${ROUTE_USER_HUB}/${ROUTE_USER}`)
@ApiTags(`${API_TAG_WORKSPACE} ${API_TAG_USER}`)
export class UserUserHubController {
	constructor(private userService: UserService) {}

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

	@Patch("join-workspace")
	@ApiBearerAuth()
	@UseGuards(UserLoginGuard)
	@ApiOperation({ summary: "Join", description: "This endpoint allows a user to join." })
	@ApiOkResponse({ description: "Joined" })
	@ApiNotFoundResponse({ description: "User not found", type: UserBaseResponse })
	async join(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Body() userJoinRequest: UserJoinRequest): Promise<UserBaseResponse> {
		const userDetails = await this.userService.join({
			id: authPassport.user.id,
			email: authPassport.user.email,
			...userJoinRequest
		})
		return UserMapper.mapUserBase(userDetails.userEntity)
	}
}
