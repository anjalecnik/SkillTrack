import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiBody,
	ApiBodyOptions,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponseOptions,
	ApiTags,
	getSchemaPath
} from "@nestjs/swagger"
import { UserActivityListFilterRequest } from "../dtos/request/user-activity-list-filter.request"
import { UserActivityRequestListFilterRequest } from "../dtos/request/user-activity-request-list-filter.request"
import { UserActivityRequestPaginationFilterRequest } from "../dtos/request/user-activity-request-pagination-filter.request"
import { UserActivityRequestReviewRequest } from "../dtos/request/user-activity-request-review.request"
import { UserActivityLastDailyRequestResponse } from "../dtos/response/user-activity-last-daily-request.response"
import { UserActivityListHalResponse } from "../dtos/response/user-activity-list-hal.response"
import { UserActivityRequestListHalResponse } from "../dtos/response/user-activity-request-list-hal.response"
import { UserActivityRequestPaginationHalResponse } from "../dtos/response/user-activity-request-pagination-hal.response"
import { IUserActivityRequestCreate, IUserActivityRequestResponse, IUserActivityRequestUpdate } from "../interfaces"
import { UserActivityHalMapper } from "../mappers/user-activity-hal.mapper"
import { UserActivityRequestHalMapper } from "../mappers/user-activity-request-hal.mapper"
import { ActivityRequestBusinessTripCreateRequest } from "../modules/activity-business-trip/dtos/request/activity-request-business-trip-create.request"
import { ActivityBusinessTripListItemHalResponse } from "../modules/activity-business-trip/dtos/response/activity-business-trip-list-item-hal.response"
import { ActivityRequestBusinessTripListItemHalResponse } from "../modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response"
import { ActivityRequestDailyCreateRequest } from "../modules/activity-daily/dtos/request/activity-request-daily-create.request"
import { ActivityRequestDailyUpdateRequest } from "../modules/activity-daily/dtos/request/activity-request-daily-update.request"
import { ActivityRequestLastDailyRequestFilterRequest } from "../modules/activity-daily/dtos/request/activity-request-last-daily-request-filter.request"
import { ActivityDailyListItemHalResponse } from "../modules/activity-daily/dtos/response/activity-daily-list-item-hal.response"
import { ActivityRequestDailyListItemHalResponse } from "../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response"
import { ActivityDailyHalMapper } from "../modules/activity-daily/mappers/activity-daily-hal.mapper"
import { ActivityRequestSickLeaveCreateRequest } from "../modules/activity-sick-leave/dtos/request/activity-request-sick-leave-create.request"
import { ActivityRequestSickLeaveListItemHalResponse } from "../modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response"
import { ActivitySickLeaveListItemHalResponse } from "../modules/activity-sick-leave/dtos/response/activity-sick-leave-list-item-hal.response"
import { ActivityRequestVacationCreateRequest } from "../modules/activity-vacation/dtos/request/activity-request-vacation-create.request"
import { ActivityRequestVacationListItemHalResponse } from "../modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response"
import { ActivityVacationListItemHalResponse } from "../modules/activity-vacation/dtos/response/activity-vacation-list-item-hal.response"
import { UserActivityService } from "../services/user-activity.service"
import { ActivityRequestPerformanceReviewCreateRequest } from "../modules/activity-performance-review/dtos/request/activity-request-performance-review-create.request"
import { ActivityPerformanceReviewListItemHalResponse } from "../modules/activity-performance-review/dtos/response/activity-performance-review-list-item-hal.response"
import { ActivityRequestPerformanceReviewListItemHalResponse } from "../modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response"
import { ActivityPerformanceReviewResponse } from "../modules/activity-performance-review/dtos/response/activity-performance-review.response"
import { API_TAG_ACTIVITY, ROUTE_ACTIVITY, ROUTE_ADMIN_HUB, ROUTE_REQUEST, ROUTE_REVIEW, ROUTE_USER } from "src/utils/constants"
import { UserGuard } from "src/utils/guards"
import { originHub } from "src/utils/types/enums/origin-hub.enum"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { CreateUserActivityValidationPipe } from "src/utils/pipes/user-activity-validation-create.pipe"
import { UpdateUserActivityValidationPipe } from "src/utils/pipes/user-activity-validation-update.pipe"

const SwaggerPostCreateActivityRequestSchema: ApiBodyOptions = {
	schema: {
		oneOf: [
			{ $ref: getSchemaPath(ActivityRequestBusinessTripCreateRequest) },
			{ $ref: getSchemaPath(ActivityRequestDailyCreateRequest) },
			{ $ref: getSchemaPath(ActivityRequestSickLeaveCreateRequest) },
			{ $ref: getSchemaPath(ActivityRequestVacationCreateRequest) },
			{ $ref: getSchemaPath(ActivityRequestPerformanceReviewCreateRequest) }
		]
	}
}

const SwaggerPutUpdateActivityRequestSchema: ApiBodyOptions = {
	schema: {
		oneOf: [{ $ref: getSchemaPath(ActivityRequestDailyUpdateRequest) }]
	}
}

const SwaggerGetActivitySchema: ApiResponseOptions = {
	description: "Returns user activity",
	schema: {
		oneOf: [
			{ $ref: getSchemaPath(ActivityBusinessTripListItemHalResponse) },
			{ $ref: getSchemaPath(ActivityDailyListItemHalResponse) },
			{ $ref: getSchemaPath(ActivitySickLeaveListItemHalResponse) },
			{ $ref: getSchemaPath(ActivityVacationListItemHalResponse) },
			{ $ref: getSchemaPath(ActivityPerformanceReviewListItemHalResponse) }
		]
	}
}

const SwaggerGetActivityRequestSchema: ApiResponseOptions = {
	description: "Returns user activity",
	schema: {
		oneOf: [
			{ $ref: getSchemaPath(ActivityRequestBusinessTripListItemHalResponse) },
			{ $ref: getSchemaPath(ActivityRequestDailyListItemHalResponse) },
			{ $ref: getSchemaPath(ActivityRequestSickLeaveListItemHalResponse) },
			{ $ref: getSchemaPath(ActivityRequestVacationListItemHalResponse) },
			{ $ref: getSchemaPath(ActivityRequestPerformanceReviewListItemHalResponse) }
		]
	}
}

@Controller(`/${ROUTE_ADMIN_HUB}/${ROUTE_USER}/:userId/${ROUTE_ACTIVITY}`)
@ApiTags(API_TAG_ACTIVITY)
@ApiBearerAuth()
@UseGuards(UserGuard(UserRole.Admin, UserRole.Owner))
export class AdminHubActivityController {
	constructor(private readonly userActivityService: UserActivityService) {}

	@Get("/:userActivityId(\\d+)")
	@ApiOperation({ summary: "Return user activity by id" })
	@ApiOkResponse(SwaggerGetActivitySchema)
	@ApiNotFoundResponse({ description: "User activity not found" })
	async getUserActivity(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Param("userActivityId", ParseIntPipe) userActivityId: number
	) {
		const { activity } = await this.userActivityService.getUserActivity(authPassport, { userId }, userActivityId)
		return UserActivityHalMapper.mapActivityHal(activity)
	}

	@Get()
	@ApiOperation({ summary: "Return user activities" })
	@ApiOkResponse({ description: "Returns activities list", type: UserActivityListHalResponse })
	async getActivityList(@Param("userId", ParseIntPipe) userId: number, @Query() filter: UserActivityListFilterRequest): Promise<UserActivityListHalResponse> {
		const activityRequestList = await this.userActivityService.getUserActivityList({ ...filter, userId })
		return UserActivityHalMapper.mapUserActivityListHal(activityRequestList, filter, { userId })
	}

	@Get("last-daily-activity-request")
	@ApiOperation({ summary: "Return last daily activity from user" })
	@ApiOkResponse({ description: "Returns daily activity request", type: UserActivityLastDailyRequestResponse })
	@ApiNoContentResponse({ description: "No content if no last daily activity is found" })
	async getLastDailyActivityRequest(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Query() filter: ActivityRequestLastDailyRequestFilterRequest
	): Promise<UserActivityLastDailyRequestResponse | void> {
		const lastDaily = await this.userActivityService.getLastDailyRequestActivity(authPassport, { userId, ...filter })
		if (!lastDaily) throw new HttpException("", HttpStatus.NO_CONTENT)

		return ActivityDailyHalMapper.mapPrefillActivityRequestListItem(lastDaily)
	}

	@Get("prefill-daily-activity-request")
	@ApiOperation({ summary: "Return last daily activity from user (Returns last activity that has project set)" })
	@ApiOkResponse({ description: "Returns daily activity request", type: UserActivityLastDailyRequestResponse })
	@ApiNoContentResponse({ description: "No content if no last daily activity is found" })
	async getPrefillDailyActivityRequest(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Query() filter: ActivityRequestLastDailyRequestFilterRequest
	): Promise<UserActivityLastDailyRequestResponse | void> {
		const lastDaily = await this.userActivityService.getLastDailyRequestActivity(authPassport, { userId, ...filter, hasProject: true })
		if (!lastDaily) throw new HttpException("", HttpStatus.NO_CONTENT)

		return ActivityDailyHalMapper.mapPrefillActivityRequestListItem(lastDaily)
	}

	@Get(`${ROUTE_REQUEST}/:userActivityRequestId(\\d+)`)
	@ApiOperation({ summary: "Return user activity by id" })
	@ApiOkResponse(SwaggerGetActivityRequestSchema)
	@ApiNotFoundResponse({ description: "User activity request not found" })
	async getUserActivityRequest(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Param("userActivityRequestId", ParseIntPipe) userActivityRequestId: number
	) {
		const userActivity = await this.userActivityService.getUserActivityRequest(authPassport, { userId }, userActivityRequestId)
		return UserActivityRequestHalMapper.mapActivityRequestHal(userActivity)
	}

	@Get(`${ROUTE_REQUEST}`)
	@ApiOperation({ summary: "Return user activities" })
	@ApiOkResponse({ description: "Returns activities list", type: UserActivityListHalResponse })
	async getActivityRequestList(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Query() filter: UserActivityRequestListFilterRequest
	): Promise<UserActivityRequestListHalResponse> {
		const activityRequestList = await this.userActivityService.getUserActivityRequestList(authPassport, { ...filter, userIds: [userId] })
		return UserActivityRequestHalMapper.mapUserActivityRequestListHal(activityRequestList, filter, { userId })
	}

	@Get(`/${ROUTE_REQUEST}/overview`)
	@ApiOperation({ summary: "Return user activities" })
	@ApiOkResponse({ description: "Returns activities list", type: UserActivityRequestPaginationHalResponse })
	async getActivityRequestPagination(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Query() filter: UserActivityRequestPaginationFilterRequest
	): Promise<UserActivityRequestPaginationHalResponse> {
		const paginatedActivityRequest = await this.userActivityService.getRequestOverviewPaginationAdminHub(authPassport, { ...filter }, userId)
		return UserActivityRequestHalMapper.mapUserActivityRequestPaginationHal(paginatedActivityRequest, filter, {
			userId
		})
	}

	@Get("performance-reviews")
	@ApiOperation({ summary: "Return user performance reviews" })
	@ApiOkResponse({ description: "Returns performance reviews list", type: UserActivityListHalResponse })
	async getPerformanceReviewList(@Param("userId", ParseIntPipe) userId: number): Promise<ActivityPerformanceReviewResponse[]> {
		return await this.userActivityService.getUserPerformanceReviewActivityList(userId)
	}

	@Post()
	@ApiOperation({ summary: "Creates workspace user activity" })
	@ApiBody(SwaggerPostCreateActivityRequestSchema)
	@ApiOkResponse(SwaggerGetActivityRequestSchema)
	async createActivity(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Body(CreateUserActivityValidationPipe) activity: IUserActivityRequestCreate
	): Promise<IUserActivityRequestResponse> {
		const activityResponse = await this.userActivityService.handleCreateActivity({ ...authPassport, requestOriginHub: originHub.workspaceHub }, activity, {
			userId,
			reportedByUserId: authPassport.user.id
		})
		return UserActivityRequestHalMapper.mapActivityRequestHal(activityResponse)
	}

	@Put(":activityRequestId")
	@ApiOperation({ summary: "Updates workspace user activity" })
	@ApiBody(SwaggerPutUpdateActivityRequestSchema)
	@ApiOkResponse(SwaggerGetActivityRequestSchema)
	async updateActivity(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Param("activityRequestId", ParseIntPipe) activityRequestId: number,
		@Body(UpdateUserActivityValidationPipe) activity: IUserActivityRequestUpdate
	): Promise<IUserActivityRequestResponse> {
		const activityResponse = await this.userActivityService.handleUpdateActivity({ ...authPassport, requestOriginHub: originHub.workspaceHub }, activity, {
			id: activityRequestId,
			userId,
			reportedByUserId: authPassport.user.id
		})
		return UserActivityRequestHalMapper.mapActivityRequestHal(activityResponse)
	}

	@Delete(":activityRequestId")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Cancel activity request" })
	@ApiNoContentResponse()
	async cancelActivity(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Param("activityRequestId", ParseIntPipe) activityRequestId: number
	): Promise<void> {
		await this.userActivityService.handleCancelActivity(
			{ ...authPassport, requestOriginHub: originHub.workspaceHub },
			{
				reportedByUserId: authPassport.user.id,
				userId,
				id: activityRequestId
			}
		)
	}

	@Post(`/${ROUTE_REVIEW}/:userActivityRequestId(\\d+)`)
	@ApiOperation({ summary: "Review user activity request" })
	@ApiOkResponse(SwaggerGetActivityRequestSchema)
	async reviewActivityRequest(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("userId", ParseIntPipe) userId: number,
		@Param("userActivityRequestId", ParseIntPipe) userActivityRequestId: number,
		@Body() userActivityRequestReviewRequest: UserActivityRequestReviewRequest
	): Promise<IUserActivityRequestResponse> {
		const activityResponse = await this.userActivityService.handleReviewActivity(authPassport, {
			id: userActivityRequestId,
			userId,
			reviewedByUserId: authPassport.user.id,
			status: userActivityRequestReviewRequest.status
		})
		return UserActivityRequestHalMapper.mapActivityRequestHal(activityResponse)
	}
}
