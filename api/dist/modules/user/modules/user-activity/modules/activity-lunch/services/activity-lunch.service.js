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
exports.ActivityLunchService = void 0;
const common_1 = require("@nestjs/common");
const activity_lunch_repository_1 = require("../repository/activity-lunch.repository");
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
let ActivityLunchService = class ActivityLunchService {
    activityLunchRepository;
    constructor(activityLunchRepository) {
        this.activityLunchRepository = activityLunchRepository;
    }
    async createLunchActivity(createRequest) {
        const lunchActivity = {
            userId: createRequest.userId,
            date: createRequest.date,
            status: user_activity_status_enum_1.UserActivityStatus.Approved,
            activityType: user_activity_enum_1.UserActivityType.Lunch,
            activityRequestId: createRequest.activityRequestId,
            reportedByUserId: createRequest.userId
        };
        return this.activityLunchRepository.createLunchActivity(lunchActivity);
    }
    async updateLunchActivity(newLunchState, createRequest) {
        const existingLunchActivities = await this.activityLunchRepository.getExistingLunch(createRequest);
        if ((existingLunchActivities.length > 0 && newLunchState) || (existingLunchActivities.length <= 0 && !newLunchState)) {
            return;
        }
        if (existingLunchActivities.length > 0 && !newLunchState) {
            this.activityLunchRepository.deleteLunchActivity(existingLunchActivities);
        }
        if (existingLunchActivities.length <= 0 && newLunchState) {
            const lunchActivity = {
                userId: createRequest.userId,
                date: createRequest.date,
                status: user_activity_status_enum_1.UserActivityStatus.Approved,
                activityType: user_activity_enum_1.UserActivityType.Lunch,
                activityRequestId: createRequest.activityRequestId,
                reportedByUserId: createRequest.userId
            };
            this.activityLunchRepository.createLunchActivity(lunchActivity);
            return;
        }
    }
    async deleteLunchActivity(deleteRequest) {
        this.activityLunchRepository.deleteLunchActivityByRequestId(deleteRequest);
    }
    async getLunchOnDay(createRequest) {
        return this.activityLunchRepository.getExistingLunch(createRequest);
    }
};
exports.ActivityLunchService = ActivityLunchService;
exports.ActivityLunchService = ActivityLunchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_lunch_repository_1.ActivityLunchRepository])
], ActivityLunchService);
//# sourceMappingURL=activity-lunch.service.js.map