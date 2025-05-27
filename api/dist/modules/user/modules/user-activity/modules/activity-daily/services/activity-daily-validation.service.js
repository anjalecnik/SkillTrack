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
exports.ActivityDailyValidationService = void 0;
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_validation_service_1 = require("../../activity-shared/services/activity-shared-validation.service");
const common_1 = require("@nestjs/common");
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
const config_1 = require("../../../../../../../utils/config/config");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
let ActivityDailyValidationService = class ActivityDailyValidationService {
    activitySharedService;
    activitySharedValidationService;
    constructor(activitySharedService, activitySharedValidationService) {
        this.activitySharedService = activitySharedService;
        this.activitySharedValidationService = activitySharedValidationService;
    }
    async getExistingActivityRequests(activityRequest) {
        const dailyRequestOnSameDay = await this.activitySharedService.getActivityRequestsForDates(activityRequest, [activityRequest.dateStart], [user_activity_status_enum_1.UserActivityStatus.Approved], [user_activity_enum_1.UserActivityType.Daily]);
        return dailyRequestOnSameDay;
    }
    async preCreateSaveValidation(activityRequest) {
        const existingActivityRequests = await this.getExistingActivityRequests(activityRequest);
        if (existingActivityRequests.length > 0)
            throw new common_1.BadRequestException("Only One daily activity request is allowed per day");
    }
    async preUpdateTransformValidation(bulkActivityRequestDailyUpdate) {
        const activityRequest = await this.activitySharedService.getActivityRequestWithActivities({
            id: bulkActivityRequestDailyUpdate.id
        });
        if (!activityRequest)
            throw new common_1.BadRequestException("Could not find daily activity request");
        this.validateUpdate(activityRequest, bulkActivityRequestDailyUpdate.id);
        await this.activitySharedValidationService.validateIsWorkingDays([activityRequest.dateStart]);
        return activityRequest;
    }
    async preCancelTransformValidation(activityDailyRequest) {
        const activityRequestEntity = await this.activitySharedService.findActivityRequestOrFail(activityDailyRequest);
        return activityRequestEntity;
    }
    validateUpdate(activityRequest, id) {
        if (!activityRequest) {
            throw new common_1.NotFoundException("Activity request not found", `Activity request '${id}' does not exist`);
        }
        if (activityRequest.activityType !== user_activity_enum_1.UserActivityType.Daily) {
            throw new common_1.BadRequestException("Invalid Activity type", "Activity type must be 'Daily'");
        }
        if (!activityRequest.dateStart) {
            throw new common_1.InternalServerErrorException("Daily activity request should have 'dateStart' property");
        }
        const daysLimit = config_1.Config.get("APP_FEATURE_USER_ACTIVITY_DAILY_EDIT_DAYS_LIMIT");
        const dateLimit = date_helper_1.DateHelper.subtract(new Date(), daysLimit, "days");
        if (date_helper_1.DateHelper.getDateTime(activityRequest.dateStart) < date_helper_1.DateHelper.getDateTime(dateLimit)) {
            throw new common_1.BadRequestException(`Daily Activity can be edited for only past ${daysLimit} days`);
        }
    }
};
exports.ActivityDailyValidationService = ActivityDailyValidationService;
exports.ActivityDailyValidationService = ActivityDailyValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService, activity_shared_validation_service_1.ActivitySharedValidationService])
], ActivityDailyValidationService);
//# sourceMappingURL=activity-daily-validation.service.js.map