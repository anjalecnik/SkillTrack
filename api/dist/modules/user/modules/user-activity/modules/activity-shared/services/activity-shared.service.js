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
exports.ActivitySharedService = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_repository_1 = require("../repository/activity-shared.repository");
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
const utility_service_1 = require("../../../../../../utility/services/utility.service");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
let ActivitySharedService = class ActivitySharedService {
    activitySharedRepository;
    utilityService;
    constructor(activitySharedRepository, utilityService) {
        this.activitySharedRepository = activitySharedRepository;
        this.utilityService = utilityService;
    }
    async getDatesFromRange(getDateRangeMeta) {
        const dateStart = date_helper_1.DateHelper.getStartOfDay(getDateRangeMeta.dateStart);
        const dateEnd = date_helper_1.DateHelper.getEndOfDay(getDateRangeMeta.dateEnd);
        const rawDates = date_helper_1.DateHelper.iterateDateRange({ dateStart, dateEnd });
        const workDays = await this.utilityService.getWorkingDays(rawDates);
        const datesFiltered = workDays.reduce((acc, current) => {
            if (current.isWorkingDay)
                acc.push(current.date);
            return acc;
        }, []);
        if (datesFiltered.length === 0) {
            const formattedDates = rawDates.map(date => date.toISOString()).join(", ");
            throw new common_1.BadRequestException("Invalid date range. Make sure you didn't select holiday or weekend", `Invalid date range. Selected dates: ${formattedDates}`);
        }
        return datesFiltered;
    }
    async getHolidays(dateRange) {
        return this.activitySharedRepository.getHolidays(dateRange);
    }
    async getActivitiesOnDay(dayDate, filters) {
        return this.activitySharedRepository.getActivitiesOnDay(dayDate, filters);
    }
    async getUserExpectedWorkHours() {
        return 8;
    }
    async getProjectById(projectId) {
        return this.activitySharedRepository.getProjectOrThrow(projectId);
    }
    async calculateActivityHours(activities, excludeActivity) {
        if (activities.length <= 0)
            return 0;
        const assignedWorkHours = 8;
        return activities.reduce((acc, currentActivity) => {
            if (excludeActivity && excludeActivity.find(ex => ex.id === currentActivity.id))
                return acc;
            if (currentActivity.activityType === user_activity_enum_1.UserActivityType.Daily)
                return acc + (currentActivity.hours ?? 0);
            if (currentActivity.activityType === user_activity_enum_1.UserActivityType.BusinessTrip)
                return acc + (currentActivity.hours ?? assignedWorkHours);
            return acc;
        }, 0);
    }
    async getActivityRequest(whereOptions) {
        return this.activitySharedRepository.findActivityRequest(whereOptions);
    }
    async getActivityRequestWithActivitiesOrFail(whereOptions) {
        return this.activitySharedRepository.findActivityRequestWithActivitiesOrFail(whereOptions);
    }
    async getActivityRequestWithActivities(whereOptions) {
        return this.activitySharedRepository.findActivityRequestWithActivities(whereOptions);
    }
    async findActivityRequestOrFail({ id, userId }) {
        return this.activitySharedRepository.findActivityRequestOrFail({
            where: { id, userId },
            relations: { userActivities: true }
        });
    }
    async cancelActivityRequest(cancelActivityRequest, cancelActivity) {
        return this.activitySharedRepository.cancelActivityRequest(cancelActivityRequest, cancelActivity);
    }
    async reviewActivityRequest(reviewActivityRequest, reviewActivity) {
        return this.activitySharedRepository.reviewActivityRequest(reviewActivityRequest, reviewActivity);
    }
    async getActivitiesForActivityDates({ userId }, activityDates, excludeActivityRequestIds, statuses = [user_activity_status_enum_1.UserActivityStatus.Approved, user_activity_status_enum_1.UserActivityStatus.PendingApproval]) {
        const dates = activityDates.map(activity => activity.date);
        const excludeIds = excludeActivityRequestIds ? await this.getActivityIdsFromActivityRequests(excludeActivityRequestIds) : undefined;
        return this.activitySharedRepository.getActivitiesOnDayInRange({
            userId,
            dates,
            statuses,
            excludeActivityIds: excludeIds
        });
    }
    async getActivityRequestsForDates({ userId }, dates, statuses = [user_activity_status_enum_1.UserActivityStatus.Approved, user_activity_status_enum_1.UserActivityStatus.PendingApproval], activityTypes) {
        return this.activitySharedRepository.getActivitiesRequestsOnDayInRange({
            userId,
            dates,
            statuses,
            activityTypes
        });
    }
    async getUserById(userId) {
        return this.activitySharedRepository.getUserById(userId);
    }
    async getUserEarliestActivity(userId) {
        return this.activitySharedRepository.getEarliestActivityByUserId(userId);
    }
    async getActivityIdsFromActivityRequests(excludeActivityRequestIds) {
        const activityRequests = await this.activitySharedRepository.getActivityRequestById(excludeActivityRequestIds);
        return activityRequests.reduce((acc, activityRequest) => [...acc, ...activityRequest.userActivities.map(activity => activity.id)], []);
    }
    checkPendingActivityOnCancel(activityRequest) {
        if (activityRequest.status === user_activity_status_enum_1.UserActivityStatus.PendingApproval)
            return true;
        return false;
    }
};
exports.ActivitySharedService = ActivitySharedService;
exports.ActivitySharedService = ActivitySharedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_repository_1.ActivitySharedRepository, utility_service_1.UtilityService])
], ActivitySharedService);
//# sourceMappingURL=activity-shared.service.js.map