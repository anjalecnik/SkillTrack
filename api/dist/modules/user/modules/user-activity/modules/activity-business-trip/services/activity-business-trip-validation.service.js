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
exports.ActivityBusinessTripValidationService = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_validation_service_1 = require("../../activity-shared/services/activity-shared-validation.service");
let ActivityBusinessTripValidationService = class ActivityBusinessTripValidationService {
    activitySharedService;
    activitySharedValidationService;
    constructor(activitySharedService, activitySharedValidationService) {
        this.activitySharedService = activitySharedService;
        this.activitySharedValidationService = activitySharedValidationService;
    }
    async preCancelTransformValidation(activityBusinessTripCancelRequest) {
        const activityRequestBusinessTripEntity = await this.activitySharedService.findActivityRequestOrFail(activityBusinessTripCancelRequest);
        if (this.activitySharedService.checkPendingActivityOnCancel(activityRequestBusinessTripEntity))
            return activityRequestBusinessTripEntity;
        return activityRequestBusinessTripEntity;
    }
    preCancelSaveValidation(currentActivityRequest, newActivityRequest) {
        this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest);
    }
    async preReviewTransformValidation(activityBusinessTripReviewRequest) {
        const activityRequestBusinessTripEntity = await this.activitySharedService.findActivityRequestOrFail(activityBusinessTripReviewRequest);
        await this.activitySharedValidationService.validateReviewer(activityRequestBusinessTripEntity, activityBusinessTripReviewRequest);
        return activityRequestBusinessTripEntity;
    }
    preReviewSaveValidation(currentActivityRequest, newActivityRequest) {
        this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest);
    }
};
exports.ActivityBusinessTripValidationService = ActivityBusinessTripValidationService;
exports.ActivityBusinessTripValidationService = ActivityBusinessTripValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService, activity_shared_validation_service_1.ActivitySharedValidationService])
], ActivityBusinessTripValidationService);
//# sourceMappingURL=activity-business-trip-validation.service.js.map