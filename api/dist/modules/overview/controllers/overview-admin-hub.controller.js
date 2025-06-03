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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverviewAdminHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const guards_1 = require("../../../utils/guards");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const overview_response_1 = require("../dtos/response/overview.response");
const overview_service_1 = require("../services/overview.service");
const overview_working_hours_response_1 = require("../dtos/response/overview-working-hours.response");
let OverviewAdminHubController = class OverviewAdminHubController {
    overviewService;
    constructor(overviewService) {
        this.overviewService = overviewService;
    }
    async getDashboardStatistics() {
        return await this.overviewService.getDashboardStatistics();
    }
    async getDashboardWorkingHoursStatistics() {
        return await this.overviewService.getDashboardWorkingHoursStatistics();
    }
};
exports.OverviewAdminHubController = OverviewAdminHubController;
__decorate([
    (0, common_1.Get)(`/${constants_1.ROUTE_OVERVIEW}`),
    (0, swagger_1.ApiOperation)({ summary: "Returns dashboard statistics", description: `Returns dashboard statistics` }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns dashboard statistics", type: overview_response_1.OverviewResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OverviewAdminHubController.prototype, "getDashboardStatistics", null);
__decorate([
    (0, common_1.Get)(`/${constants_1.ROUTE_OVERVIEW}/working-hours`),
    (0, swagger_1.ApiOperation)({ summary: "Returns dashboard working hours statistics", description: `Returns dashboard working hours statistics` }),
    (0, swagger_1.ApiOkResponse)({ description: "Returns dashboard working hours statistics", type: overview_working_hours_response_1.OverviewWorkingHoursResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OverviewAdminHubController.prototype, "getDashboardWorkingHoursStatistics", null);
exports.OverviewAdminHubController = OverviewAdminHubController = __decorate([
    (0, common_1.Controller)(`/${constants_1.ROUTE_ADMIN_HUB}`),
    (0, swagger_1.ApiTags)(constants_1.API_TAG_ACTIVITY_OVERVIEW),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner)),
    __metadata("design:paramtypes", [overview_service_1.OverviewService])
], OverviewAdminHubController);
//# sourceMappingURL=overview-admin-hub.controller.js.map