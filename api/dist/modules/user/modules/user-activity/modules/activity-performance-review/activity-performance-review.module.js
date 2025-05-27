"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityPerformanceReviewModule = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_module_1 = require("../activity-shared/activity-shared.module");
const activity_performance_review_service_1 = require("./services/activity-performance-review.service");
const activity_performance_review_repository_1 = require("./repository/activity-performance-review.repository");
const activity_performance_review_validation_service_1 = require("./services/activity-performance-review-validation.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_activity_request_entity_1 = require("../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../../../libs/db/entities/user.entity");
const master_data_source_service_1 = require("../../../../../../libs/db/master-data-source.service");
const user_performance_review_service_1 = require("../../../user-performance-review/services/user-performance-review.service");
const user_performance_review_validation_service_1 = require("../../../user-performance-review/services/user-performance-review-validation.service");
const user_performance_review_entity_1 = require("../../../../../../libs/db/entities/user-performance-review.entity");
const user_performance_review_repository_1 = require("../../../user-performance-review/repository/user-performance-review.repository");
let ActivityPerformanceReviewModule = class ActivityPerformanceReviewModule {
};
exports.ActivityPerformanceReviewModule = ActivityPerformanceReviewModule;
exports.ActivityPerformanceReviewModule = ActivityPerformanceReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity, user_performance_review_entity_1.UserPerformanceReviewEntity]), activity_shared_module_1.ActivitySharedModule],
        providers: [
            activity_performance_review_service_1.ActivityPerformanceReviewService,
            activity_performance_review_validation_service_1.ActivityPerformanceReviewValidationService,
            activity_performance_review_repository_1.ActivityPerformanceReviewRepository,
            master_data_source_service_1.MasterDataSource,
            user_performance_review_service_1.UserPerformanceReviewService,
            user_performance_review_validation_service_1.UserPerformanceReviewValidationService,
            user_performance_review_repository_1.UserPerformanceReviewRepository
        ],
        exports: [activity_performance_review_service_1.ActivityPerformanceReviewService]
    })
], ActivityPerformanceReviewModule);
//# sourceMappingURL=activity-performance-review.module.js.map