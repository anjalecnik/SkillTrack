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
exports.ActivityPerformanceReviewValidationService = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_hierarchical_validation_service_1 = require("../../activity-shared/services/activity-shared-hierarchical-validation.service");
const activity_performance_review_repository_1 = require("../repository/activity-performance-review.repository");
const activity_shared_validation_service_1 = require("../../activity-shared/services/activity-shared-validation.service");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const user_performance_review_validation_service_1 = require("../../../../user-performance-review/services/user-performance-review-validation.service");
let ActivityPerformanceReviewValidationService = class ActivityPerformanceReviewValidationService {
    activitySharedHierarchicalValidationService;
    userPerformanceReviewValidationService;
    activitySharedService;
    activitySharedValidationService;
    activityPerformanceReviewRepository;
    constructor(activitySharedHierarchicalValidationService, userPerformanceReviewValidationService, activitySharedService, activitySharedValidationService, activityPerformanceReviewRepository) {
        this.activitySharedHierarchicalValidationService = activitySharedHierarchicalValidationService;
        this.userPerformanceReviewValidationService = userPerformanceReviewValidationService;
        this.activitySharedService = activitySharedService;
        this.activitySharedValidationService = activitySharedValidationService;
        this.activityPerformanceReviewRepository = activityPerformanceReviewRepository;
    }
    async preCreateTransformValidation(activityPerformanceReviewCreateRequest, requestOriginHub) {
        await this.activitySharedHierarchicalValidationService.validateHierarchicalViolationAndGetIsPrivilege(activityPerformanceReviewCreateRequest, requestOriginHub);
    }
    async preCreateSaveValidation(activityPerformanceReviewCreateRequest) {
        const performanceReviewIds = await this.activityPerformanceReviewRepository.getPerformanceReviewActivities(activityPerformanceReviewCreateRequest);
        await this.userPerformanceReviewValidationService.preCreateSaveValidation(activityPerformanceReviewCreateRequest, performanceReviewIds);
    }
    async preUpdateTransformValidation(activityPerformanceReviewUpdateRequest, requestOriginHub) {
        await this.activitySharedHierarchicalValidationService.validateHierarchicalViolationAndGetIsPrivilege(activityPerformanceReviewUpdateRequest, requestOriginHub);
    }
    async preCancelTransformValidation(activityPerformanceReviewCancelRequest) {
        const activityVacationEntity = await this.activitySharedService.findActivityRequestOrFail(activityPerformanceReviewCancelRequest);
        return activityVacationEntity;
    }
    preCancelSaveValidation(currentActivityRequest, newActivityRequest) {
        this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest);
    }
};
exports.ActivityPerformanceReviewValidationService = ActivityPerformanceReviewValidationService;
exports.ActivityPerformanceReviewValidationService = ActivityPerformanceReviewValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_hierarchical_validation_service_1.ActivitySharedHierarchicalValidationService,
        user_performance_review_validation_service_1.UserPerformanceReviewValidationService,
        activity_shared_service_1.ActivitySharedService,
        activity_shared_validation_service_1.ActivitySharedValidationService,
        activity_performance_review_repository_1.ActivityPerformanceReviewRepository])
], ActivityPerformanceReviewValidationService);
//# sourceMappingURL=activity-performance-review-validation.service.js.map