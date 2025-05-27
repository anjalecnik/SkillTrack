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
exports.ActivityPerformanceReviewRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_activity_request_entity_1 = require("../../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../../libs/db/entities/user-activity.entity");
const user_performance_review_entity_1 = require("../../../../../../../libs/db/entities/user-performance-review.entity");
const master_data_source_service_1 = require("../../../../../../../libs/db/master-data-source.service");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
const LOAD_RELATIONS = {
    userActivities: true,
    project: true,
    user: { workPosition: true }
};
let ActivityPerformanceReviewRepository = class ActivityPerformanceReviewRepository {
    masterDataSource;
    activityRepository;
    constructor(masterDataSource, activityRepository) {
        this.masterDataSource = masterDataSource;
        this.activityRepository = activityRepository;
    }
    async createActivityRequest(createActivityRequest, createActivity, performanceReviewId) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const activityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            const newActivityRequest = await activityRequestRepository.save({ ...createActivityRequest });
            await activityRepository.save({ ...createActivity, activityRequestId: newActivityRequest.id, performanceReviewId: performanceReviewId });
            return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS });
        });
    }
    async updateActivityRequest(activityRequestId) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            return activityRequestRepository.findOneOrFail({ where: { id: activityRequestId }, relations: LOAD_RELATIONS });
        });
    }
    async getPerformanceReviewActivities(filters) {
        const where = {};
        if (filters.userId)
            where.userId = filters.userId;
        if (filters.activityType)
            where.activityType = filters.activityType;
        const activities = await this.activityRepository.find({
            where
        });
        if (!activities.length) {
            return [];
        }
        return activities.flatMap(activity => activity.performanceReviewId ?? []);
    }
    async getPerformanceReviewActivitiesForUser(filters) {
        const activities = await this.activityRepository
            .createQueryBuilder("activity")
            .leftJoinAndSelect("activity.reportedByUser", "reporter")
            .where("activity.activityType = :activityType", { activityType: user_activity_enum_1.UserActivityType.PerformanceReview })
            .andWhere("activity.userId = :userId", { userId: filters.userId })
            .getMany();
        if (!activities.length) {
            return [];
        }
        return activities;
    }
};
exports.ActivityPerformanceReviewRepository = ActivityPerformanceReviewRepository;
exports.ActivityPerformanceReviewRepository = ActivityPerformanceReviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_performance_review_entity_1.UserPerformanceReviewEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(user_activity_entity_1.UserActivityEntity)),
    __metadata("design:paramtypes", [master_data_source_service_1.MasterDataSource,
        typeorm_1.Repository])
], ActivityPerformanceReviewRepository);
//# sourceMappingURL=activity-performance-review.repository.js.map