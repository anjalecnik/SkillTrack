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
exports.ActivitySickLeaveValidationService = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_validation_service_1 = require("../../activity-shared/services/activity-shared-validation.service");
const activity_shared_validation_collision_service_1 = require("../../activity-shared/services/activity-shared-validation-collision.service");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
let ActivitySickLeaveValidationService = class ActivitySickLeaveValidationService {
    activitySharedService;
    activitySharedValidationService;
    activitySharedValidationCollisionService;
    constructor(activitySharedService, activitySharedValidationService, activitySharedValidationCollisionService) {
        this.activitySharedService = activitySharedService;
        this.activitySharedValidationService = activitySharedValidationService;
        this.activitySharedValidationCollisionService = activitySharedValidationCollisionService;
    }
    async preCreateTransformValidation(activitySickLeaveCreateRequest) {
        this.validateDates(activitySickLeaveCreateRequest);
    }
    async preCreateSaveValidation(activityRequest, activities) {
        const activitiesInSameRange = await this.activitySharedService.getActivitiesForActivityDates(activityRequest, activities);
        this.activitySharedValidationCollisionService.validateCollisions(activitiesInSameRange, { collidingActivityOnDay: [user_activity_enum_1.UserActivityType.SickLeave] });
    }
    async preCancelTransformValidation(activitySickLeaveCancelRequest) {
        const activitySickLeaveEntity = await this.activitySharedService.findActivityRequestOrFail(activitySickLeaveCancelRequest);
        if (this.activitySharedService.checkPendingActivityOnCancel(activitySickLeaveEntity))
            return activitySickLeaveEntity;
        return activitySickLeaveEntity;
    }
    preCancelSaveValidation(currentActivityRequest, newActivityRequest) {
        this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest);
    }
    validateDates({ dateStart, dateEnd, hours }) {
        if (!hours) {
            return;
        }
        if (!date_helper_1.DateHelper.isSameDay(dateStart, dateEnd)) {
            throw new common_1.BadRequestException("Start and end dates must be the same when specifying hours", `Start date: ${dateStart.toISOString()} not the same as end date: ${dateEnd.toISOString()}`);
        }
    }
};
exports.ActivitySickLeaveValidationService = ActivitySickLeaveValidationService;
exports.ActivitySickLeaveValidationService = ActivitySickLeaveValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService,
        activity_shared_validation_service_1.ActivitySharedValidationService,
        activity_shared_validation_collision_service_1.ActivitySharedValidationCollisionService])
], ActivitySickLeaveValidationService);
//# sourceMappingURL=activity-sick-leave-validation.service.js.map