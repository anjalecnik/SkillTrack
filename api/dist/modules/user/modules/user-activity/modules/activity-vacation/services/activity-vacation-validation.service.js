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
exports.ActivityVacationValidationService = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_validation_service_1 = require("../../activity-shared/services/activity-shared-validation.service");
const activity_shared_validation_collision_service_1 = require("../../activity-shared/services/activity-shared-validation-collision.service");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
let ActivityVacationValidationService = class ActivityVacationValidationService {
    activitySharedService;
    activitySharedValidationService;
    activitySharedValidationCollisionService;
    constructor(activitySharedService, activitySharedValidationService, activitySharedValidationCollisionService) {
        this.activitySharedService = activitySharedService;
        this.activitySharedValidationService = activitySharedValidationService;
        this.activitySharedValidationCollisionService = activitySharedValidationCollisionService;
    }
    async preCreateSaveValidation(activityRequest, activities) {
        const activitiesInSameRange = await this.activitySharedService.getActivitiesForActivityDates(activityRequest, activities);
        this.activitySharedValidationCollisionService.validateCollisions(activitiesInSameRange, { collidingActivityOnDay: [user_activity_enum_1.UserActivityType.Vacation] });
    }
    async preCancelTransformValidation(activityVacationCancelRequest) {
        const activityVacationEntity = await this.activitySharedService.findActivityRequestOrFail(activityVacationCancelRequest);
        if (this.activitySharedService.checkPendingActivityOnCancel(activityVacationEntity))
            return activityVacationEntity;
        return activityVacationEntity;
    }
    preCancelSaveValidation(currentActivityRequest, newActivityRequest) {
        this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest);
    }
    async preReviewTransformValidation(activityVacationReviewRequest) {
        const activityVacationEntity = await this.activitySharedService.findActivityRequestOrFail(activityVacationReviewRequest);
        await this.activitySharedValidationService.validateReviewer(activityVacationEntity, activityVacationReviewRequest);
        return activityVacationEntity;
    }
    preReviewSaveValidation(currentActivityRequest, newActivityRequest) {
        this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest);
    }
};
exports.ActivityVacationValidationService = ActivityVacationValidationService;
exports.ActivityVacationValidationService = ActivityVacationValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService,
        activity_shared_validation_service_1.ActivitySharedValidationService,
        activity_shared_validation_collision_service_1.ActivitySharedValidationCollisionService])
], ActivityVacationValidationService);
//# sourceMappingURL=activity-vacation-validation.service.js.map