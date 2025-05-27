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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPerformanceReviewRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_activity_entity_1 = require("../../../../../libs/db/entities/user-activity.entity");
const user_performance_review_entity_1 = require("../../../../../libs/db/entities/user-performance-review.entity");
let UserPerformanceReviewRepository = class UserPerformanceReviewRepository {
    performanceReviewRepository;
    userActivityRepository;
    constructor(performanceReviewRepository, userActivityRepository) {
        this.performanceReviewRepository = performanceReviewRepository;
        this.userActivityRepository = userActivityRepository;
    }
    async getPerformanceReviewForQuartal(filters, performanceReviewIds) {
        return await this.performanceReviewRepository.find({
            where: {
                id: (0, typeorm_2.In)(performanceReviewIds),
                year: filters.year,
                quartal: filters.quartal
            }
        });
    }
    async getPerformanceReviewsById(performanceReviewIds) {
        return await this.performanceReviewRepository.find({
            where: { id: (0, typeorm_2.In)(performanceReviewIds) },
            order: {
                year: "DESC",
                quartal: "DESC"
            }
        });
    }
    async getPerformanceReviewIdByRequestId(activityRequestId) {
        const alias = "userActivity";
        const { performancereviewid: performanceReviewId } = await this.userActivityRepository
            .createQueryBuilder(alias)
            .select([`${alias}.performanceReviewId as performanceReviewId`])
            .where(`${alias}.activityRequestId = :activityRequestId`, { activityRequestId })
            .getRawOne();
        return performanceReviewId;
    }
    async createPerformanceReview(userPerformanceReview) {
        return this.performanceReviewRepository.save({
            ...userPerformanceReview
        });
    }
    async updatePerformanceReview(userPerformanceReview) {
        const filteredUserPerformanceReview = Object.fromEntries(Object.entries(userPerformanceReview).filter(([key]) => ["answer1", "answer2", "answer3", "answer4", "quartal", "year"].includes(key)));
        await this.performanceReviewRepository.update(userPerformanceReview.id, {
            ...filteredUserPerformanceReview
        });
        return this.performanceReviewRepository.findOneOrFail({ where: { id: userPerformanceReview.id } });
    }
    async deletePerformanceReview(userPerformanceReview) {
        await this.performanceReviewRepository.delete(userPerformanceReview.id);
    }
};
exports.UserPerformanceReviewRepository = UserPerformanceReviewRepository;
exports.UserPerformanceReviewRepository = UserPerformanceReviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_performance_review_entity_1.UserPerformanceReviewEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_activity_entity_1.UserActivityEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserPerformanceReviewRepository);
//# sourceMappingURL=user-performance-review.repository.js.map