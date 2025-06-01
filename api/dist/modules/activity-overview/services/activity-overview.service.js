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
exports.ActivityOverviewService = void 0;
const common_1 = require("@nestjs/common");
const user_activity_repository_1 = require("../../user/modules/user-activity/repository/user-activity.repository");
const utility_service_1 = require("../../utility/services/utility.service");
const activity_overview_repository_1 = require("../repository/activity-overview.repository");
let ActivityOverviewService = class ActivityOverviewService {
    activityOverviewRepository;
    userActivityRepository;
    utilityService;
    constructor(activityOverviewRepository, userActivityRepository, utilityService) {
        this.activityOverviewRepository = activityOverviewRepository;
        this.userActivityRepository = userActivityRepository;
        this.utilityService = utilityService;
    }
    async getPerformanceReviewPaginationUserHub(userInvoker, filters) {
        const userId = userInvoker.user.id;
        const userIds = await this.filterUsersUserHub(userId, filters.showSubordinatesByLevel);
        return this.getPerformanceReviewPagination(filters, userIds);
    }
    async getPerformanceReviewPaginationAdminHub(userInvoker, filters) {
        const userId = userInvoker.user.id;
        const userIds = await this.filterUsersAdminHub(userId, filters.showSubordinatesByLevel);
        return this.getPerformanceReviewPagination(filters, userIds);
    }
    async getPerformanceReviewPagination(filters, userIds) {
        const { data: dataRaw, meta } = await this.activityOverviewRepository.getPerformanceReviewListPagination({
            ...filters,
            userIds
        });
        const data = await Promise.all(dataRaw);
        return {
            data,
            meta
        };
    }
    async filterUsersAdminHub(userId, showSubordinatesByLevel) {
        if (showSubordinatesByLevel === 1) {
            return (await this.userActivityRepository.getAllUsers()).map(user => user.id);
        }
        return [userId];
    }
    async filterUsersUserHub(userId, showSubordinatesByLevel) {
        if (showSubordinatesByLevel === 1) {
            const subordinateUserIds = await this.utilityService.getSubordinateIdsRecursively(userId, new Set());
            return [userId, ...subordinateUserIds];
        }
        return [userId];
    }
};
exports.ActivityOverviewService = ActivityOverviewService;
exports.ActivityOverviewService = ActivityOverviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_overview_repository_1.ActivityOverviewRepository,
        user_activity_repository_1.UserActivityRepository,
        utility_service_1.UtilityService])
], ActivityOverviewService);
//# sourceMappingURL=activity-overview.service.js.map