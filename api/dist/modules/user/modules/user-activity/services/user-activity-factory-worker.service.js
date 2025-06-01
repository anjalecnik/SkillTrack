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
exports.UserActivityFactoryWorkerService = void 0;
const common_1 = require("@nestjs/common");
const activity_business_trip_service_1 = require("../modules/activity-business-trip/services/activity-business-trip.service");
const activity_daily_service_1 = require("../modules/activity-daily/services/activity-daily.service");
const activity_sick_leave_service_1 = require("../modules/activity-sick-leave/services/activity-sick-leave.service");
const activity_vacation_service_1 = require("../modules/activity-vacation/services/activity-vacation.service");
const activity_performance_review_service_1 = require("../modules/activity-performance-review/services/activity-performance-review.service");
const user_activity_enum_1 = require("../../../../../utils/types/enums/user-activity.enum");
const activity_request_type_helper_1 = require("../../../../../utils/helpers/activity-request-type.helper");
let UserActivityFactoryWorkerService = class UserActivityFactoryWorkerService {
    activityBusinessTripService;
    activityDailyService;
    activitySickLeaveService;
    activityVacationService;
    activityPerformanceReviewService;
    constructor(activityBusinessTripService, activityDailyService, activitySickLeaveService, activityVacationService, activityPerformanceReviewService) {
        this.activityBusinessTripService = activityBusinessTripService;
        this.activityDailyService = activityDailyService;
        this.activitySickLeaveService = activitySickLeaveService;
        this.activityVacationService = activityVacationService;
        this.activityPerformanceReviewService = activityPerformanceReviewService;
    }
    async createActivityRequest(userInvoker, { dateStart, dateEnd, ...activity }) {
        switch (activity.activityType) {
            case user_activity_enum_1.UserActivityType.BusinessTrip:
                return this.activityBusinessTripService.createActivityRequest(userInvoker, { ...activity, dateStart, dateEnd });
            case user_activity_enum_1.UserActivityType.Daily:
                return this.activityDailyService.createActivityRequest(userInvoker, { ...activity, dateStart });
            case user_activity_enum_1.UserActivityType.SickLeave:
                return this.activitySickLeaveService.createActivityRequest(userInvoker, { ...activity, dateStart, dateEnd });
            case user_activity_enum_1.UserActivityType.Vacation:
                return this.activityVacationService.createActivityRequest(userInvoker, { ...activity, dateStart, dateEnd });
            case user_activity_enum_1.UserActivityType.PerformanceReview:
                return this.activityPerformanceReviewService.createActivityRequest(userInvoker, { ...activity, dateStart });
            default:
                throw new common_1.InternalServerErrorException("Unsupported UserActivityType");
        }
    }
    async updateActivityRequest(userInvoker, activityRequestUpdate) {
        switch (activityRequestUpdate.activityType) {
            case user_activity_enum_1.UserActivityType.BusinessTrip:
                return this.activityBusinessTripService.updateActivityRequest(userInvoker, activityRequestUpdate);
            case user_activity_enum_1.UserActivityType.Daily:
                return this.activityDailyService.updateActivityRequest(userInvoker, activityRequestUpdate);
            case user_activity_enum_1.UserActivityType.PerformanceReview:
                return this.activityPerformanceReviewService.updateActivityRequest(userInvoker, activityRequestUpdate);
            default:
                throw new common_1.InternalServerErrorException("Unsupported UserActivityType");
        }
    }
    async cancelActivityRequest(userInvoker, activityRequestCancel, activityType) {
        switch (activityType) {
            case user_activity_enum_1.UserActivityType.BusinessTrip:
                return this.activityBusinessTripService.cancelActivityRequest(userInvoker, activityRequestCancel);
            case user_activity_enum_1.UserActivityType.Daily:
                return this.activityDailyService.cancelActivityRequest(userInvoker, activityRequestCancel);
            case user_activity_enum_1.UserActivityType.SickLeave:
                return this.activitySickLeaveService.cancelActivityRequest(userInvoker, activityRequestCancel);
            case user_activity_enum_1.UserActivityType.Vacation:
                return this.activityVacationService.cancelActivityRequest(userInvoker, activityRequestCancel);
            case user_activity_enum_1.UserActivityType.PerformanceReview:
                return this.activityPerformanceReviewService.cancelActivityRequest(userInvoker, activityRequestCancel);
            default:
                throw new common_1.InternalServerErrorException("Unsupported UserActivityType");
        }
    }
    async reviewActivityRequest(userInvoker, activityRequestReview, activityType) {
        switch (activityType) {
            case user_activity_enum_1.UserActivityType.BusinessTrip:
                return this.activityBusinessTripService.reviewActivityRequest(userInvoker, activityRequestReview);
            case user_activity_enum_1.UserActivityType.Daily:
                return this.activityDailyService.reviewActivityRequest(userInvoker, activityRequestReview);
            case user_activity_enum_1.UserActivityType.SickLeave:
                return this.activitySickLeaveService.reviewActivityRequest(activityRequestReview);
            case user_activity_enum_1.UserActivityType.Vacation:
                return this.activityVacationService.reviewActivityRequest(userInvoker, activityRequestReview);
            default:
                throw new common_1.InternalServerErrorException("Unsupported UserActivityType");
        }
    }
    async enrichActivityRequest(userInvoker, activityRequest, subordinateIds = []) {
        const userInvokerId = userInvoker.user.id;
        switch (true) {
            case activity_request_type_helper_1.ActivityRequestTypeHelper.isBusinessTripRequest(activityRequest):
                return this.activityBusinessTripService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds);
            case activity_request_type_helper_1.ActivityRequestTypeHelper.isDailyRequest(activityRequest):
                return this.activityDailyService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds);
            case activity_request_type_helper_1.ActivityRequestTypeHelper.isSickLeaveRequest(activityRequest):
                return this.activitySickLeaveService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds);
            case activity_request_type_helper_1.ActivityRequestTypeHelper.isVacationRequest(activityRequest):
                return this.activityVacationService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds);
            case activity_request_type_helper_1.ActivityRequestTypeHelper.isPerformanceReviewRequest(activityRequest):
                return this.activityPerformanceReviewService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds);
            default:
                throw new common_1.InternalServerErrorException("Unsupported UserActivityType");
        }
    }
};
exports.UserActivityFactoryWorkerService = UserActivityFactoryWorkerService;
exports.UserActivityFactoryWorkerService = UserActivityFactoryWorkerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_business_trip_service_1.ActivityBusinessTripService,
        activity_daily_service_1.ActivityDailyService,
        activity_sick_leave_service_1.ActivitySickLeaveService,
        activity_vacation_service_1.ActivityVacationService,
        activity_performance_review_service_1.ActivityPerformanceReviewService])
], UserActivityFactoryWorkerService);
//# sourceMappingURL=user-activity-factory-worker.service.js.map