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
exports.UserPerformanceReviewValidationService = void 0;
const common_1 = require("@nestjs/common");
const user_performance_review_repository_1 = require("../repository/user-performance-review.repository");
let UserPerformanceReviewValidationService = class UserPerformanceReviewValidationService {
    userPerformanceReviewRepository;
    constructor(userPerformanceReviewRepository) {
        this.userPerformanceReviewRepository = userPerformanceReviewRepository;
    }
    async preCreateSaveValidation(performanceReviewRequest, performanceReviewIds) {
        const reviews = await this.userPerformanceReviewRepository.getPerformanceReviewForQuartal(performanceReviewRequest, performanceReviewIds);
        if (reviews.length)
            throw new common_1.BadRequestException(`This user already has a review for ${performanceReviewRequest.quartal} of ${performanceReviewRequest.year}.`);
    }
};
exports.UserPerformanceReviewValidationService = UserPerformanceReviewValidationService;
exports.UserPerformanceReviewValidationService = UserPerformanceReviewValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_performance_review_repository_1.UserPerformanceReviewRepository])
], UserPerformanceReviewValidationService);
//# sourceMappingURL=user-performance-review-validation.service.js.map