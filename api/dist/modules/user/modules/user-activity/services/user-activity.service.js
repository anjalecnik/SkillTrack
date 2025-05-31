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
exports.UserActivityService = void 0;
const common_1 = require("@nestjs/common");
const activity_daily_service_1 = require("../modules/activity-daily/services/activity-daily.service");
const activity_shared_service_1 = require("../modules/activity-shared/services/activity-shared.service");
const activity_virtual_service_1 = require("../modules/activity-virtual/services/activity-virtual.service");
const user_activity_repository_1 = require("../repository/user-activity.repository");
const user_activity_factory_worker_service_1 = require("./user-activity-factory-worker.service");
const activity_performance_review_service_1 = require("../modules/activity-performance-review/services/activity-performance-review.service");
const user_helper_1 = require("../../../../../utils/helpers/user.helper");
const date_helper_1 = require("../../../../../utils/helpers/date.helper");
const utility_service_1 = require("../../../../utility/services/utility.service");
const user_activity_enum_1 = require("../../../../../utils/types/enums/user-activity.enum");
const user_activity_status_enum_1 = require("../../../../../utils/types/enums/user-activity-status.enum");
let UserActivityService = class UserActivityService {
    userActivityFactoryWorkerService;
    userActivityRepository;
    activityVirtualService;
    activitySharedService;
    utilityService;
    activityDailyService;
    activityPerformanceReviewService;
    constructor(userActivityFactoryWorkerService, userActivityRepository, activityVirtualService, activitySharedService, utilityService, activityDailyService, activityPerformanceReviewService) {
        this.userActivityFactoryWorkerService = userActivityFactoryWorkerService;
        this.userActivityRepository = userActivityRepository;
        this.activityVirtualService = activityVirtualService;
        this.activitySharedService = activitySharedService;
        this.utilityService = utilityService;
        this.activityDailyService = activityDailyService;
        this.activityPerformanceReviewService = activityPerformanceReviewService;
    }
    async handleCreateActivity(userInvoker, activityRequestCreate, activityCommonParams) {
        const dateStart = "date" in activityRequestCreate ? activityRequestCreate.date : activityRequestCreate.dateStart;
        const dateEnd = "date" in activityRequestCreate ? activityRequestCreate.date : activityRequestCreate.dateEnd;
        await this.validateUserActive(activityCommonParams.userId);
        return this.userActivityFactoryWorkerService.createActivityRequest(userInvoker, { ...activityRequestCreate, dateStart, dateEnd, ...activityCommonParams });
    }
    async handleUpdateActivity(userInvoker, activityRequestUpdate, activitySharedRequestUpdate) {
        await this.validateUserActive(activitySharedRequestUpdate.userId);
        return this.userActivityFactoryWorkerService.updateActivityRequest(userInvoker, { ...activityRequestUpdate, ...activitySharedRequestUpdate });
    }
    async handleCancelActivity(userInvoker, activityRequestCancel) {
        const activityRequest = await this.getActivityRequestOrThrow({
            id: activityRequestCancel.id,
            userId: activityRequestCancel.userId
        });
        return this.userActivityFactoryWorkerService.cancelActivityRequest(userInvoker, activityRequestCancel, activityRequest.activityType);
    }
    async handleReviewActivity(userInvoker, activityRequestReview) {
        const activityRequest = await this.getActivityRequestOrThrow({
            id: activityRequestReview.id,
            userId: activityRequestReview.userId
        });
        return this.userActivityFactoryWorkerService.reviewActivityRequest(userInvoker, activityRequestReview, activityRequest.activityType);
    }
    async getUserActivity(userInvoker, userCommon, id) {
        const activity = await this.userActivityRepository.getUserActivityByIdOrThrow(userCommon, id);
        const previousActivityRequest = user_activity_enum_1.UserActivityType.Unassigned
            ? await this.activityDailyService.getLastDailyRequestActivity(userInvoker, { ...userCommon, date: activity.date })
            : undefined;
        return { activity, previousActivityRequest };
    }
    async getLastDailyRequestActivity(userInvoker, filter) {
        return this.activityDailyService.getLastDailyRequestActivity(userInvoker, filter);
    }
    async getUserActivityList(filters) {
        const { fromDateStart, toDateEnd, virtualActivities, userId } = filters;
        const { fromDateStart: dateStart, toDateEnd: dateEnd } = await this.limitRequestDateRange(fromDateStart, toDateEnd, userId);
        const dates = date_helper_1.DateHelper.iterateDateRange({ dateStart: dateStart, dateEnd: dateEnd });
        const holidays = await this.activitySharedService.getHolidays({
            dateStart: dateStart,
            dateEnd: dateEnd
        });
        const activities = await this.userActivityRepository.getUserActivityList(filters);
        let allUserActivities = [];
        for (const date of dates) {
            const parsedDate = date_helper_1.DateHelper.parseDate(date);
            const userActivitiesForDate = activities.filter(activity => date_helper_1.DateHelper.parseDate(activity.date) === parsedDate);
            const nonCanceledActivities = userActivitiesForDate.filter(activity => activity.status !== user_activity_status_enum_1.UserActivityStatus.Canceled);
            if (nonCanceledActivities.length > 0) {
                allUserActivities.push(...nonCanceledActivities);
            }
            else if (virtualActivities) {
                const virtualActivity = this.activityVirtualService.createVirtualActivity(date, holidays);
                if (virtualActivity) {
                    allUserActivities.push(virtualActivity);
                }
            }
        }
        allUserActivities = await this.enrichDailyActivity(allUserActivities);
        return filters.sortingDir === "asc" ? allUserActivities : allUserActivities.reverse();
    }
    async enrichDailyActivity(activities) {
        return Promise.all(activities.map(async (activity) => {
            if (activity.activityType === user_activity_enum_1.UserActivityType.Daily) {
                return await this.activityDailyService.enrichActivity(activity);
            }
            return activity;
        }));
    }
    async limitRequestDateRange(fromDateStart, toDateEnd, userId) {
        const earliestActivity = await this.activitySharedService.getUserEarliestActivity(userId);
        const maxYearsInPast = 1;
        const activityDate = earliestActivity ? earliestActivity.date : new Date();
        const minDate = date_helper_1.DateHelper.subtract(activityDate, maxYearsInPast, "year");
        const maxYearsInFuture = 2;
        const maxDate = date_helper_1.DateHelper.add(date_helper_1.DateHelper.getEndOfDay(new Date()), maxYearsInFuture, "year");
        return {
            fromDateStart: date_helper_1.DateHelper.isDateAfterOrEqualDate(minDate, fromDateStart) ? fromDateStart : minDate,
            toDateEnd: date_helper_1.DateHelper.isDateAfterOrEqualDate(toDateEnd, maxDate) ? toDateEnd : maxDate
        };
    }
    async getUserActivityRequest(userInvoker, userCommon, id) {
        const activityRequest = await this.userActivityRepository.getUserActivityRequestByIdOrThrow(userCommon, id);
        const activityRequestEnriched = await this.userActivityFactoryWorkerService.enrichActivityRequest(userInvoker, activityRequest);
        return activityRequestEnriched;
    }
    async getUserActivityRequestList(userInvoker, filters) {
        if (filters.fullName && filters.fullName.split(" ").filter(name => name.length > 0).length > 3)
            throw new common_1.BadRequestException("Name can't contain more than 3 words", `Name can't contain more than 3 words. Requested name: ${filters.fullName}`);
        const toDateEnd = filters.toDateEnd ? date_helper_1.DateHelper.getEndOfDay(filters.toDateEnd) : undefined;
        const activityRequests = await this.userActivityRepository.getUserActivityRequestList({ ...filters, toDateEnd });
        const activityRequestsEnriched = await Promise.all(activityRequests.map(activityRequest => this.userActivityFactoryWorkerService.enrichActivityRequest(userInvoker, activityRequest)));
        return activityRequestsEnriched;
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
    async getRequestOverviewPaginationUserHub(userInvoker, filters, userIdFromParams) {
        const userId = filters.forceShowDataForUserInParams ? userIdFromParams : userInvoker.user.id;
        const userIds = await this.filterUsersUserHub(userId, filters.showSubordinatesByLevel);
        return this.getRequestOverviewPagination(userInvoker, filters, userIds);
    }
    async getRequestOverviewPaginationAdminHub(userInvoker, filters, userIdFromParams) {
        const userId = filters.forceShowDataForUserInParams ? userIdFromParams : userInvoker.user.id;
        const userIds = await this.filterUsersAdminHub(userId, filters.showSubordinatesByLevel);
        return this.getRequestOverviewPagination(userInvoker, filters, userIds);
    }
    async getUserPerformanceReviewActivityList(userId) {
        return await this.activityPerformanceReviewService.getActivityRequests({ userId });
    }
    async getRequestOverviewPagination(userInvoker, filters, userIds) {
        const toDateEnd = filters.toDateEnd ? date_helper_1.DateHelper.getEndOfDay(filters.toDateEnd) : undefined;
        const { data: dataRaw, meta } = await this.userActivityRepository.getUserActivityRequestListPagination({
            ...filters,
            userIds,
            toDateEnd
        });
        const data = await Promise.all(dataRaw.map(activityRequest => this.userActivityFactoryWorkerService.enrichActivityRequest(userInvoker, activityRequest, userIds)));
        return {
            data,
            meta
        };
    }
    async getActivityRequestOrThrow({ id, userId }) {
        const activityRequest = await this.activitySharedService.getActivityRequest({ id, userId });
        if (!activityRequest) {
            throw new common_1.NotFoundException("Activity not found", `Activity with ID ${id?.toString()} not found`);
        }
        return activityRequest;
    }
    async validateUserActive(userId) {
        const user = await this.activitySharedService.getUserById(userId);
        user_helper_1.UserHelper.validateActive(user);
    }
};
exports.UserActivityService = UserActivityService;
exports.UserActivityService = UserActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_activity_factory_worker_service_1.UserActivityFactoryWorkerService,
        user_activity_repository_1.UserActivityRepository,
        activity_virtual_service_1.ActivityVirtualService,
        activity_shared_service_1.ActivitySharedService,
        utility_service_1.UtilityService,
        activity_daily_service_1.ActivityDailyService,
        activity_performance_review_service_1.ActivityPerformanceReviewService])
], UserActivityService);
//# sourceMappingURL=user-activity.service.js.map