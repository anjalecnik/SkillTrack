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
exports.UserUserHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../../utils/guards");
const constants_1 = require("../../../utils/constants");
const decorators_1 = require("../../../utils/decorators");
const user_service_1 = require("../services/user.service");
const user_list_response_1 = require("../dtos/response/user-list.response");
const user_pagination_filter_request_1 = require("../dtos/request/user-pagination-filter.request");
const user_mapper_1 = require("../mappers/user.mapper");
const user_details_response_1 = require("../dtos/response/user-details.response");
const user_work_overview_list_hal_response_1 = require("../dtos/response/user-work-overview-list.hal.response");
const user_work_overview_list_filter_request_1 = require("../dtos/request/user-work-overview-list-filter.request");
const user_work_overview_mapper_1 = require("../mappers/user-work-overview.mapper");
const utility_service_1 = require("../../utility/services/utility.service");
let UserUserHubController = class UserUserHubController {
    userService;
    utilityService;
    constructor(userService, utilityService) {
        this.userService = userService;
        this.utilityService = utilityService;
    }
    async getUserList(authPassport, filter) {
        const entities = await this.userService.getSubordinatesList({ ...filter, id: authPassport.user.id });
        return user_mapper_1.UserMapper.mapUserPaginationList(entities.data, entities.meta);
    }
    async getWorkspaceUser(authPassport, userId) {
        const userDetails = await this.userService.getUser({ id: userId, authPassport });
        await this.userService.setUserActive(userDetails.userEntity.id);
        return user_mapper_1.UserMapper.mapUserDetails(userDetails);
    }
    async getRequestorUserIsSupervisor(authPassport, userId) {
        const isSupervisor = await this.userService.validateGetUser({ id: userId, authPassport });
        return { isSupervisor: isSupervisor };
    }
    async getWorkspaceWorkOverview(filter) {
        const workPositions = await this.userService.getOverview({
            ...filter
        });
        const workingDays = await this.userService.getWorkingDays(workPositions, filter);
        const holidays = await this.utilityService.getHolidaysInDateRange(filter.fromDateStart || new Date(), filter.toDateEnd || new Date());
        return user_work_overview_mapper_1.UserWorkOverviewMapper.mapWorkOverview(workPositions, filter, workingDays, holidays);
    }
};
exports.UserUserHubController = UserUserHubController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)()),
    (0, swagger_1.ApiOperation)({ summary: "Returns list of users", description: `This endpoint requires the "Owner" or "Admin" role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Users", type: user_list_response_1.UserListResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_pagination_filter_request_1.UserPaginationFilterRequest]),
    __metadata("design:returntype", Promise)
], UserUserHubController.prototype, "getUserList", null);
__decorate([
    (0, common_1.Get)("/:userId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.UserSelfOrManagerGuard),
    (0, swagger_1.ApiOperation)({ summary: "Return user", description: `This endpoint requires the "Owner" or "Admin" role. Users with "User" role can only call themselves` }),
    (0, swagger_1.ApiOkResponse)({ description: "User", type: user_details_response_1.UserDetailsResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserUserHubController.prototype, "getWorkspaceUser", null);
__decorate([
    (0, common_1.Get)("/:userId/requestor-is-supervisor"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.UserSelfOrManagerGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Return information if a requestor of this API is a supervisor to an employee in the route parameter",
        description: `This endpoint requires the "Owner" or "Admin" or "Supervisor" role. Users with "User" role can only call themselves`
    }),
    (0, swagger_1.ApiOkResponse)({ description: "User", type: user_details_response_1.UserDetailsResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserUserHubController.prototype, "getRequestorUserIsSupervisor", null);
__decorate([
    (0, common_1.Get)("/work/work-overview"),
    (0, swagger_1.ApiOperation)({ summary: "Returns report of work overview", description: `Returns report of work overview` }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns report of work overview", type: user_work_overview_list_hal_response_1.UserWorkOverviewListHalResponse }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_work_overview_list_filter_request_1.UserWorkOverviewListFilterRequest]),
    __metadata("design:returntype", Promise)
], UserUserHubController.prototype, "getWorkspaceWorkOverview", null);
exports.UserUserHubController = UserUserHubController = __decorate([
    (0, common_1.Controller)(`/${constants_1.ROUTE_USER_HUB}/${constants_1.ROUTE_USER}`),
    (0, swagger_1.ApiTags)(`${constants_1.API_TAG_USER}`),
    __metadata("design:paramtypes", [user_service_1.UserService,
        utility_service_1.UtilityService])
], UserUserHubController);
//# sourceMappingURL=user-user-hub.controller.js.map