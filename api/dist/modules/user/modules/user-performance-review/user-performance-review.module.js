"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPerformanceReviewModule = void 0;
const common_1 = require("@nestjs/common");
const user_performance_review_service_1 = require("./services/user-performance-review.service");
const user_performance_review_repository_1 = require("./repository/user-performance-review.repository");
const user_performance_review_validation_service_1 = require("./services/user-performance-review-validation.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_performance_review_entity_1 = require("../../../../libs/db/entities/user-performance-review.entity");
const user_activity_request_entity_1 = require("../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../libs/db/entities/user.entity");
let UserPerformanceReviewModule = class UserPerformanceReviewModule {
};
exports.UserPerformanceReviewModule = UserPerformanceReviewModule;
exports.UserPerformanceReviewModule = UserPerformanceReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity, user_performance_review_entity_1.UserPerformanceReviewEntity])],
        controllers: [],
        providers: [user_performance_review_service_1.UserPerformanceReviewService, user_performance_review_validation_service_1.UserPerformanceReviewValidationService, user_performance_review_repository_1.UserPerformanceReviewRepository],
        exports: [user_performance_review_service_1.UserPerformanceReviewService, user_performance_review_validation_service_1.UserPerformanceReviewValidationService]
    })
], UserPerformanceReviewModule);
//# sourceMappingURL=user-performance-review.module.js.map