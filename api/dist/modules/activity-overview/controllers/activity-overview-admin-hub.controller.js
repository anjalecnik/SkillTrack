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
exports.ActivityOverviewAdminHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const guards_1 = require("../../../utils/guards");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const activity_overview_performance_review_mapper_1 = require("../mappers/activity-overview-performance-review.mapper");
const decorators_1 = require("../../../utils/decorators");
const activity_performance_review_hal_response_1 = require("../dtos/response/activity-performance-review-hal.response");
const activity_performance_review_filter_request_1 = require("../dtos/request/activity-performance-review-filter.request");
const activity_overview_service_1 = require("../services/activity-overview.service");
let ActivityOverviewAdminHubController = class ActivityOverviewAdminHubController {
    activityOverviewService;
    constructor(activityOverviewService) {
        this.activityOverviewService = activityOverviewService;
    }
    async getPerformanceReviewRequestPagination(authPassport, filter) {
        const data = await this.activityOverviewService.getPerformanceReviewPaginationAdminHub(authPassport, { ...filter });
        return activity_overview_performance_review_mapper_1.ActivityOverviewPerformanceReviewMapper.mapActivityOverview(data, filter);
    }
};
exports.ActivityOverviewAdminHubController = ActivityOverviewAdminHubController;
__decorate([
    (0, common_1.Get)(`/${constants_1.ROUTE_PERFORMANCE_REVIEWS}`),
    (0, swagger_1.ApiOperation)({ summary: "Returns list of users with their performance reviews", description: `Returns list of users with their performance reviews` }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns list of users with their performance reviews", type: activity_performance_review_hal_response_1.ActivityPerformanceReviewHalResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, activity_performance_review_filter_request_1.ActivityPerformanceReviewFilterRequest]),
    __metadata("design:returntype", Promise)
], ActivityOverviewAdminHubController.prototype, "getPerformanceReviewRequestPagination", null);
exports.ActivityOverviewAdminHubController = ActivityOverviewAdminHubController = __decorate([
    (0, common_1.Controller)(`/${constants_1.ROUTE_ADMIN_HUB}/${constants_1.ROUTE_ACTIVITY}`),
    (0, swagger_1.ApiTags)(constants_1.API_TAG_ACTIVITY_OVERVIEW),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner)),
    __metadata("design:paramtypes", [activity_overview_service_1.ActivityOverviewService])
], ActivityOverviewAdminHubController);
//# sourceMappingURL=activity-overview-admin-hub.controller.js.map