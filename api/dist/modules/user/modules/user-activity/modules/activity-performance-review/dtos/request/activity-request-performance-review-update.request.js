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
exports.ActivityRequestPerformanceReviewUpdateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_activity_enum_1 = require("../../../../../../../../utils/types/enums/user-activity.enum");
const user_performance_review_quartal_enum_1 = require("../../../../../../../../utils/types/enums/user-performance-review-quartal.enum");
class ActivityRequestPerformanceReviewUpdateRequest {
    activityType;
    quartal;
    year;
    answer1;
    answer2;
    answer3;
    answer4;
}
exports.ActivityRequestPerformanceReviewUpdateRequest = ActivityRequestPerformanceReviewUpdateRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Activity type", enum: user_activity_enum_1.UserActivityType, example: user_activity_enum_1.UserActivityType.PerformanceReview }),
    (0, class_validator_1.IsEnum)(user_activity_enum_1.UserActivityType),
    (0, class_validator_1.IsIn)([user_activity_enum_1.UserActivityType.PerformanceReview]),
    __metadata("design:type", String)
], ActivityRequestPerformanceReviewUpdateRequest.prototype, "activityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Performance review quartal [Q1 - Q4]", example: user_performance_review_quartal_enum_1.UserPerformanceReviewQuartal.Q3, enum: user_performance_review_quartal_enum_1.UserPerformanceReviewQuartal }),
    (0, class_validator_1.IsEnum)(user_performance_review_quartal_enum_1.UserPerformanceReviewQuartal),
    __metadata("design:type", String)
], ActivityRequestPerformanceReviewUpdateRequest.prototype, "quartal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Year for the review", example: 2024 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ActivityRequestPerformanceReviewUpdateRequest.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Answer to question 1", example: 3 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], ActivityRequestPerformanceReviewUpdateRequest.prototype, "answer1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Answer to question 2", example: 4 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], ActivityRequestPerformanceReviewUpdateRequest.prototype, "answer2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Answer to question 3", example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ActivityRequestPerformanceReviewUpdateRequest.prototype, "answer3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Answer to question 4", example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ActivityRequestPerformanceReviewUpdateRequest.prototype, "answer4", void 0);
//# sourceMappingURL=activity-request-performance-review-update.request.js.map