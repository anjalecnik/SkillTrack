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
exports.ActivityPerformanceReviewService = void 0;
const common_1 = require("@nestjs/common");
const activity_performance_review_db_mapper_1 = require("../mappers/activity-performance-review-db.mapper");
const activity_performance_review_repository_1 = require("../repository/activity-performance-review.repository");
const activity_shared_request_actions_service_1 = require("../../activity-shared/services/activity-shared-request-actions.service");
const activity_performance_review_validation_service_1 = require("./activity-performance-review-validation.service");
const user_performance_review_service_1 = require("../../../../user-performance-review/services/user-performance-review.service");
const activity_performance_review_mapper_1 = require("../mappers/activity-performance-review.mapper");
const activity_shared_db_mapper_1 = require("../../activity-shared/mappers/activity-shared-db.mapper");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_request_type_helper_1 = require("../../../../../../../utils/helpers/activity-request-type.helper");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
let ActivityPerformanceReviewService = class ActivityPerformanceReviewService {
    activitySharedService;
    activityPerformanceReviewRepository;
    activitySharedRequestActionsService;
    activityPerformanceReviewValidationService;
    userPerformanceReviewService;
    constructor(activitySharedService, activityPerformanceReviewRepository, activitySharedRequestActionsService, activityPerformanceReviewValidationService, userPerformanceReviewService) {
        this.activitySharedService = activitySharedService;
        this.activityPerformanceReviewRepository = activityPerformanceReviewRepository;
        this.activitySharedRequestActionsService = activitySharedRequestActionsService;
        this.activityPerformanceReviewValidationService = activityPerformanceReviewValidationService;
        this.userPerformanceReviewService = userPerformanceReviewService;
    }
    async getActivityRequests(filters) {
        const activities = await this.activityPerformanceReviewRepository.getPerformanceReviewActivitiesForUser(filters);
        const performanceReviews = await this.userPerformanceReviewService.getPerformanceReviewsById(activities.flatMap(activity => activity.performanceReviewId ?? []));
        return activity_performance_review_mapper_1.ActivityPerformanceReviewMapper.mapPerformanceReviews(performanceReviews, filters.userId, activities);
    }
    async createActivityRequest(userInvoker, activityPerformanceReviewCreateRequest) {
        await this.activityPerformanceReviewValidationService.preCreateTransformValidation(activityPerformanceReviewCreateRequest, userInvoker.requestOriginHub);
        const { activityRequest, activity } = activity_performance_review_db_mapper_1.ActivityPerformanceReviewDBMapper.createActivityRequest(activityPerformanceReviewCreateRequest);
        await this.activityPerformanceReviewValidationService.preCreateSaveValidation(activityPerformanceReviewCreateRequest);
        const createdPerformanceReview = await this.userPerformanceReviewService.createPerformanceReview(activityPerformanceReviewCreateRequest);
        const activityPerformanceReviewEntity = await this.activityPerformanceReviewRepository.createActivityRequest(activityRequest, activity, createdPerformanceReview.id);
        return this.enrichActivityRequest(userInvoker.user.id, activityPerformanceReviewEntity);
    }
    async updateActivityRequest(userInvoker, activityRequestPerformanceReviewUpdateRequest) {
        const { id: activityRequestId } = activityRequestPerformanceReviewUpdateRequest;
        await this.activityPerformanceReviewValidationService.preUpdateTransformValidation(activityRequestPerformanceReviewUpdateRequest, userInvoker.requestOriginHub);
        const performanceReviewId = await this.userPerformanceReviewService.getPerformanceReviewIdByRequestId(activityRequestId);
        await this.userPerformanceReviewService.updatePerformanceReview({ ...activityRequestPerformanceReviewUpdateRequest, id: performanceReviewId });
        const activityRequestEntity = await this.activityPerformanceReviewRepository.updateActivityRequest(activityRequestId);
        return this.enrichActivityRequest(userInvoker.user.id, activityRequestEntity);
    }
    async cancelActivityRequest(userInvoker, activityPerformanceReviewCancelRequest) {
        const activityPerformanceReviewEntity = await this.activityPerformanceReviewValidationService.preCancelTransformValidation(activityPerformanceReviewCancelRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.cancelActivity(activityPerformanceReviewCancelRequest, activityPerformanceReviewEntity.userActivities);
        this.activityPerformanceReviewValidationService.preCancelSaveValidation(activityPerformanceReviewEntity, activityRequest);
        const canceledActivityPerformanceReviewEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily);
        const performanceReviewId = await this.userPerformanceReviewService.getPerformanceReviewIdByRequestId(activityRequest.id);
        await this.userPerformanceReviewService.deletePerformanceReview({ id: performanceReviewId });
        return this.enrichActivityRequest(userInvoker.user.id, canceledActivityPerformanceReviewEntity);
    }
    async enrichActivityRequest(userInvoker, activityRequest, subordinateIds = []) {
        const activityRequestTypeSafe = activity_request_type_helper_1.ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, user_activity_enum_1.UserActivityType.PerformanceReview);
        const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds);
        return {
            ...activityRequestTypeSafe,
            actions
        };
    }
};
exports.ActivityPerformanceReviewService = ActivityPerformanceReviewService;
exports.ActivityPerformanceReviewService = ActivityPerformanceReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService,
        activity_performance_review_repository_1.ActivityPerformanceReviewRepository,
        activity_shared_request_actions_service_1.ActivitySharedRequestActionsService,
        activity_performance_review_validation_service_1.ActivityPerformanceReviewValidationService,
        user_performance_review_service_1.UserPerformanceReviewService])
], ActivityPerformanceReviewService);
//# sourceMappingURL=activity-performance-review.service.js.map