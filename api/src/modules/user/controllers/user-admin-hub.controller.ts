import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ROUTE_ADMIN_HUB, API_TAG_WORKSPACE, API_TAG_USER, ROUTE_USERS } from "src/utils/constants"
import { UserGuard, UserLoginGuard } from "src/utils/guards"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { UserService } from "../services/user.service"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { UserDetailsResponse } from "../dtos/response/user-details.response"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { UserMapper } from "../mappers/user.mapper"
import { UserListResponse } from "../dtos/response/user-list.response"
import { UserPaginationFilterRequest } from "../dtos/request/user-pagination-filter.request"
import { UserInvitationListResponse } from "../dtos/response/user-invitation-list.response"
import { UserInvitationListRequest } from "../dtos/request/user-invitation-list.request"
import { UserJoinRequest } from "../dtos/request/user-join.request"
import { UserPatchRequest } from "../dtos/request/patch/user-patch.request"

@Controller(`/${ROUTE_ADMIN_HUB}/${ROUTE_USERS}`)
@ApiTags(`${API_TAG_WORKSPACE} ${API_TAG_USER}`)
@UseGuards(UserGuard(UserRole.Admin, UserRole.Owner))
export class UserAdminHubController {
	constructor(private userService: UserService) {}

	@Get("/:userId")
	@ApiBearerAuth()
	@ApiOperation({ summary: "Return user", description: `This endpoint requires the "Owner" or "Admin" role. Users with "User" role can only call themselves` })
	@ApiOkResponse({ description: "User", type: UserDetailsResponse })
	async getUser(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Param("userId", ParseIntPipe) userId: number): Promise<UserDetailsResponse> {
		const userDetails = await this.userService.getUser({ id: userId, authPassport })
		return UserMapper.mapUserDetails(userDetails)
	}

	@Get()
	@ApiBearerAuth()
	@ApiOperation({ summary: "Returns list of users", description: `This endpoint requires the "Owner" or "Admin" role.` })
	@ApiOkResponse({ description: "Users", type: UserListResponse })
	async geteUserList(@Query() filter: UserPaginationFilterRequest): Promise<UserListResponse> {
		const entities = await this.userService.getUserList({ ...filter })
		return UserMapper.mapUserPaginationList(entities.data, entities.meta)
	}

	@Post("invite")
	@ApiBearerAuth()
	@ApiOperation({ summary: "Invite user", description: `This endpoint requires the "Owner" or "Admin" role.` })
	@ApiOkResponse({ description: "Invited", type: UserInvitationListResponse })
	@ApiNotFoundResponse({ description: "User not found" })
	async invite(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Body() userInvitations: UserInvitationListRequest): Promise<UserInvitationListResponse> {
		const userEntities = await this.userService.invite({
			invitedByUserId: authPassport.user.id,
			invitations: userInvitations.invitations
		})
		return UserMapper.mapUserInvitations(userEntities)
	}

	@Patch("join")
	@ApiBearerAuth()
	@UseGuards(UserLoginGuard)
	@ApiOperation({ summary: "Join", description: "This endpoint allows a user to join." })
	@ApiOkResponse({ description: "Joined" })
	@ApiNotFoundResponse({ description: "User not found", type: UserDetailsResponse })
	async join(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Body() userJoinRequest: UserJoinRequest): Promise<UserDetailsResponse> {
		const userDetails = await this.userService.join({
			id: authPassport.user.id,
			email: authPassport.user.email,
			...userJoinRequest
		})
		return UserMapper.mapUserDetails(userDetails)
	}

	@Patch("/:userId(\\d+)")
	@ApiBearerAuth()
	@ApiOperation({ summary: "Update user", description: `This endpoint requires the "Owner", "Admin" or "User" role.` })
	@ApiOkResponse({ description: "Updated user", type: UserDetailsResponse })
	async updateUser(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Body() userPatchRequest: UserPatchRequest
	): Promise<UserDetailsResponse> {
		const userDetails = await this.userService.updateUser({
			id: userId,
			updatedByUserId: authPassport.user.id,
			...userPatchRequest
		})
		return UserMapper.mapUserDetails(userDetails)
	}
}
