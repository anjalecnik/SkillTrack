"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminHubActivityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_activity_list_filter_request_1 = require("../dtos/request/user-activity-list-filter.request");
const user_activity_request_list_filter_request_1 = require("../dtos/request/user-activity-request-list-filter.request");
const user_activity_request_pagination_filter_request_1 = require("../dtos/request/user-activity-request-pagination-filter.request");
const user_activity_request_review_request_1 = require("../dtos/request/user-activity-request-review.request");
const user_activity_last_daily_request_response_1 = require("../dtos/response/user-activity-last-daily-request.response");
const user_activity_list_hal_response_1 = require("../dtos/response/user-activity-list-hal.response");
const user_activity_request_pagination_hal_response_1 = require("../dtos/response/user-activity-request-pagination-hal.response");
const user_activity_hal_mapper_1 = require("../mappers/user-activity-hal.mapper");
const user_activity_request_hal_mapper_1 = require("../mappers/user-activity-request-hal.mapper");
const activity_request_business_trip_create_request_1 = require("../modules/activity-business-trip/dtos/request/activity-request-business-trip-create.request");
const activity_business_trip_list_item_hal_response_1 = require("../modules/activity-business-trip/dtos/response/activity-business-trip-list-item-hal.response");
const activity_request_business_trip_list_item_hal_response_1 = require("../modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response");
const activity_request_daily_create_request_1 = require("../modules/activity-daily/dtos/request/activity-request-daily-create.request");
const activity_request_daily_update_request_1 = require("../modules/activity-daily/dtos/request/activity-request-daily-update.request");
const activity_request_last_daily_request_filter_request_1 = require("../modules/activity-daily/dtos/request/activity-request-last-daily-request-filter.request");
const activity_daily_list_item_hal_response_1 = require("../modules/activity-daily/dtos/response/activity-daily-list-item-hal.response");
const activity_request_daily_list_item_hal_response_1 = require("../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response");
const activity_daily_hal_mapper_1 = require("../modules/activity-daily/mappers/activity-daily-hal.mapper");
const activity_request_sick_leave_create_request_1 = require("../modules/activity-sick-leave/dtos/request/activity-request-sick-leave-create.request");
const activity_request_sick_leave_list_item_hal_response_1 = require("../modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response");
const activity_sick_leave_list_item_hal_response_1 = require("../modules/activity-sick-leave/dtos/response/activity-sick-leave-list-item-hal.response");
const activity_request_vacation_create_request_1 = require("../modules/activity-vacation/dtos/request/activity-request-vacation-create.request");
const activity_request_vacation_list_item_hal_response_1 = require("../modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response");
const activity_vacation_list_item_hal_response_1 = require("../modules/activity-vacation/dtos/response/activity-vacation-list-item-hal.response");
const user_activity_service_1 = require("../services/user-activity.service");
const activity_request_performance_review_create_request_1 = require("../modules/activity-performance-review/dtos/request/activity-request-performance-review-create.request");
const activity_performance_review_list_item_hal_response_1 = require("../modules/activity-performance-review/dtos/response/activity-performance-review-list-item-hal.response");
const activity_request_performance_review_list_item_hal_response_1 = require("../modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response");
const constants_1 = require("../../../../../utils/constants");
const guards_1 = require("../../../../../utils/guards");
const origin_hub_enum_1 = require("../../../../../utils/types/enums/origin-hub.enum");
const user_role_enum_1 = require("../../../../../utils/types/enums/user-role.enum");
const decorators_1 = require("../../../../../utils/decorators");
const user_activity_validation_create_pipe_1 = require("../../../../../utils/pipes/user-activity-validation-create.pipe");
const user_activity_validation_update_pipe_1 = require("../../../../../utils/pipes/user-activity-validation-update.pipe");
const SwaggerPostCreateActivityRequestSchema = {
    schema: {
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_business_trip_create_request_1.ActivityRequestBusinessTripCreateRequest) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_daily_create_request_1.ActivityRequestDailyCreateRequest) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_sick_leave_create_request_1.ActivityRequestSickLeaveCreateRequest) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_vacation_create_request_1.ActivityRequestVacationCreateRequest) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_performance_review_create_request_1.ActivityRequestPerformanceReviewCreateRequest) }
        ]
    }
};
const SwaggerPutUpdateActivityRequestSchema = {
    schema: {
        oneOf: [{ $ref: (0, swagger_1.getSchemaPath)(activity_request_daily_update_request_1.ActivityRequestDailyUpdateRequest) }]
    }
};
const SwaggerGetActivitySchema = {
    description: "Returns user activity",
    schema: {
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(activity_business_trip_list_item_hal_response_1.ActivityBusinessTripListItemHalResponse) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_daily_list_item_hal_response_1.ActivityDailyListItemHalResponse) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_sick_leave_list_item_hal_response_1.ActivitySickLeaveListItemHalResponse) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_vacation_list_item_hal_response_1.ActivityVacationListItemHalResponse) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_performance_review_list_item_hal_response_1.ActivityPerformanceReviewListItemHalResponse) }
        ]
    }
};
const SwaggerGetActivityRequestSchema = {
    description: "Returns user activity",
    schema: {
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_business_trip_list_item_hal_response_1.ActivityRequestBusinessTripListItemHalResponse) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_daily_list_item_hal_response_1.ActivityRequestDailyListItemHalResponse) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_sick_leave_list_item_hal_response_1.ActivityRequestSickLeaveListItemHalResponse) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_vacation_list_item_hal_response_1.ActivityRequestVacationListItemHalResponse) },
            { $ref: (0, swagger_1.getSchemaPath)(activity_request_performance_review_list_item_hal_response_1.ActivityRequestPerformanceReviewListItemHalResponse) }
        ]
    }
};
let AdminHubActivityController = class AdminHubActivityController {
    userActivityService;
    constructor(userActivityService) {
        this.userActivityService = userActivityService;
    }
    async getUserActivity(authPassport, userId, userActivityId) {
        const { activity } = await this.userActivityService.getUserActivity(authPassport, { userId }, userActivityId);
        return user_activity_hal_mapper_1.UserActivityHalMapper.mapActivityHal(activity);
    }
    async getActivityList(userId, filter) {
        const activityRequestList = await this.userActivityService.getUserActivityList({ ...filter, userId });
        return user_activity_hal_mapper_1.UserActivityHalMapper.mapUserActivityListHal(activityRequestList, filter, { userId });
    }
    async getLastDailyActivityRequest(authPassport, userId, filter) {
        const lastDaily = await this.userActivityService.getLastDailyRequestActivity(authPassport, { userId, ...filter });
        if (!lastDaily)
            throw new common_1.HttpException("", common_1.HttpStatus.NO_CONTENT);
        return activity_daily_hal_mapper_1.ActivityDailyHalMapper.mapPrefillActivityRequestListItem(lastDaily);
    }
    async getPrefillDailyActivityRequest(authPassport, userId, filter) {
        const lastDaily = await this.userActivityService.getLastDailyRequestActivity(authPassport, { userId, ...filter, hasProject: true });
        if (!lastDaily)
            throw new common_1.HttpException("", common_1.HttpStatus.NO_CONTENT);
        return activity_daily_hal_mapper_1.ActivityDailyHalMapper.mapPrefillActivityRequestListItem(lastDaily);
    }
    async getUserActivityRequest(authPassport, userId, userActivityRequestId) {
        const userActivity = await this.userActivityService.getUserActivityRequest(authPassport, { userId }, userActivityRequestId);
        return user_activity_request_hal_mapper_1.UserActivityRequestHalMapper.mapActivityRequestHal(userActivity);
    }
    async getActivityRequestList(authPassport, userId, filter) {
        const activityRequestList = await this.userActivityService.getUserActivityRequestList(authPassport, { ...filter, userIds: [userId] });
        return user_activity_request_hal_mapper_1.UserActivityRequestHalMapper.mapUserActivityRequestListHal(activityRequestList, filter, { userId });
    }
    async getActivityRequestPagination(authPassport, userId, filter) {
        const paginatedActivityRequest = await this.userActivityService.getRequestOverviewPaginationAdminHub(authPassport, { ...filter }, userId);
        return user_activity_request_hal_mapper_1.UserActivityRequestHalMapper.mapUserActivityRequestPaginationHal(paginatedActivityRequest, filter, {
            userId
        });
    }
    async getPerformanceReviewList(userId) {
        return await this.userActivityService.getUserPerformanceReviewActivityList(userId);
    }
    async createActivity(authPassport, userId, activity) {
        const activityResponse = await this.userActivityService.handleCreateActivity({ ...authPassport, requestOriginHub: origin_hub_enum_1.originHub.workspaceHub }, activity, {
            userId,
            reportedByUserId: authPassport.user.id
        });
        return user_activity_request_hal_mapper_1.UserActivityRequestHalMapper.mapActivityRequestHal(activityResponse);
    }
    async updateActivity(authPassport, userId, activityRequestId, activity) {
        const activityResponse = await this.userActivityService.handleUpdateActivity({ ...authPassport, requestOriginHub: origin_hub_enum_1.originHub.workspaceHub }, activity, {
            id: activityRequestId,
            userId,
            reportedByUserId: authPassport.user.id
        });
        return user_activity_request_hal_mapper_1.UserActivityRequestHalMapper.mapActivityRequestHal(activityResponse);
    }
    async cancelActivity(authPassport, userId, activityRequestId) {
        await this.userActivityService.handleCancelActivity({ ...authPassport, requestOriginHub: origin_hub_enum_1.originHub.workspaceHub }, {
            reportedByUserId: authPassport.user.id,
            userId,
            id: activityRequestId
        });
    }
    async reviewActivityRequest(authPassport, userId, userActivityRequestId, userActivityRequestReviewRequest) {
        const activityResponse = await this.userActivityService.handleReviewActivity(authPassport, {
            id: userActivityRequestId,
            userId,
            reviewedByUserId: authPassport.user.id,
            status: userActivityRequestReviewRequest.status
        });
        return user_activity_request_hal_mapper_1.UserActivityRequestHalMapper.mapActivityRequestHal(activityResponse);
    }
};
exports.AdminHubActivityController = AdminHubActivityController;
__decorate([
    (0, common_1.Get)("/:userActivityId(\\d+)"),
    (0, swagger_1.ApiOperation)({ summary: "Return user activity by id" }),
    (0, swagger_1.ApiOkResponse)(SwaggerGetActivitySchema),
    (0, swagger_1.ApiNotFoundResponse)({ description: "User activity not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("userActivityId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "getUserActivity", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Return user activities" }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns activities list", type: user_activity_list_hal_response_1.UserActivityListHalResponse }),
    __param(0, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_activity_list_filter_request_1.UserActivityListFilterRequest]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "getActivityList", null);
__decorate([
    (0, common_1.Get)("last-daily-activity-request"),
    (0, swagger_1.ApiOperation)({ summary: "Return last daily activity from user" }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns daily activity request", type: user_activity_last_daily_request_response_1.UserActivityLastDailyRequestResponse }),
    (0, swagger_1.ApiNoContentResponse)({ description: "No content if no last daily activity is found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, activity_request_last_daily_request_filter_request_1.ActivityRequestLastDailyRequestFilterRequest]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "getLastDailyActivityRequest", null);
__decorate([
    (0, common_1.Get)("prefill-daily-activity-request"),
    (0, swagger_1.ApiOperation)({ summary: "Return last daily activity from user (Returns last activity that has project set)" }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns daily activity request", type: user_activity_last_daily_request_response_1.UserActivityLastDailyRequestResponse }),
    (0, swagger_1.ApiNoContentResponse)({ description: "No content if no last daily activity is found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, activity_request_last_daily_request_filter_request_1.ActivityRequestLastDailyRequestFilterRequest]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "getPrefillDailyActivityRequest", null);
__decorate([
    (0, common_1.Get)(`${constants_1.ROUTE_REQUEST}/:userActivityRequestId(\\d+)`),
    (0, swagger_1.ApiOperation)({ summary: "Return user activity by id" }),
    (0, swagger_1.ApiOkResponse)(SwaggerGetActivityRequestSchema),
    (0, swagger_1.ApiNotFoundResponse)({ description: "User activity request not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("userActivityRequestId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "getUserActivityRequest", null);
__decorate([
    (0, common_1.Get)(`${constants_1.ROUTE_REQUEST}`),
    (0, swagger_1.ApiOperation)({ summary: "Return user activities" }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns activities list", type: user_activity_list_hal_response_1.UserActivityListHalResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, user_activity_request_list_filter_request_1.UserActivityRequestListFilterRequest]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "getActivityRequestList", null);
__decorate([
    (0, common_1.Get)(`/${constants_1.ROUTE_REQUEST}/overview`),
    (0, swagger_1.ApiOperation)({ summary: "Return user activities" }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns activities list", type: user_activity_request_pagination_hal_response_1.UserActivityRequestPaginationHalResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, user_activity_request_pagination_filter_request_1.UserActivityRequestPaginationFilterRequest]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "getActivityRequestPagination", null);
__decorate([
    (0, common_1.Get)("performance-reviews"),
    (0, swagger_1.ApiOperation)({ summary: "Return user performance reviews" }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns performance reviews list", type: user_activity_list_hal_response_1.UserActivityListHalResponse }),
    __param(0, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "getPerformanceReviewList", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Creates workspace user activity" }),
    (0, swagger_1.ApiBody)(SwaggerPostCreateActivityRequestSchema),
    (0, swagger_1.ApiOkResponse)(SwaggerGetActivityRequestSchema),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)(user_activity_validation_create_pipe_1.CreateUserActivityValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "createActivity", null);
__decorate([
    (0, common_1.Put)(":activityRequestId"),
    (0, swagger_1.ApiOperation)({ summary: "Updates workspace user activity" }),
    (0, swagger_1.ApiBody)(SwaggerPutUpdateActivityRequestSchema),
    (0, swagger_1.ApiOkResponse)(SwaggerGetActivityRequestSchema),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("activityRequestId", common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)(user_activity_validation_update_pipe_1.UpdateUserActivityValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "updateActivity", null);
__decorate([
    (0, common_1.Delete)(":activityRequestId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Cancel activity request" }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("activityRequestId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "cancelActivity", null);
__decorate([
    (0, common_1.Post)(`/${constants_1.ROUTE_REVIEW}/:userActivityRequestId(\\d+)`),
    (0, swagger_1.ApiOperation)({ summary: "Review user activity request" }),
    (0, swagger_1.ApiOkResponse)(SwaggerGetActivityRequestSchema),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("userActivityRequestId", common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, user_activity_request_review_request_1.UserActivityRequestReviewRequest]),
    __metadata("design:returntype", Promise)
], AdminHubActivityController.prototype, "reviewActivityRequest", null);
exports.AdminHubActivityController = AdminHubActivityController = __decorate([
    (0, common_1.Controller)(`/${constants_1.ROUTE_ADMIN_HUB}/${constants_1.ROUTE_USER}/:userId/${constants_1.ROUTE_ACTIVITY}`),
    (0, swagger_1.ApiTags)(constants_1.API_TAG_ACTIVITY),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner)),
    __metadata("design:paramtypes", [user_activity_service_1.UserActivityService])
], AdminHubActivityController);
//# sourceMappingURL=admin-hub-activity.controller.js.map