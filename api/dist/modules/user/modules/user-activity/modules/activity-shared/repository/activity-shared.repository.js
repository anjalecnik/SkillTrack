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
exports.ActivitySharedRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_activity_request_entity_1 = require("../../../../../../../libs/db/entities/user-activity-request.entity");
const holiday_entity_1 = require("../../../../../../../libs/db/entities/holiday.entity");
const project_entity_1 = require("../../../../../../../libs/db/entities/project.entity");
const user_activity_entity_1 = require("../../../../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../../../../libs/db/entities/user.entity");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const type_helper_1 = require("../../../../../../../utils/helpers/type.helper");
const LOAD_RELATIONS = {
    userActivities: { project: true },
    project: true,
    user: { workPosition: true }
};
let ActivitySharedRepository = class ActivitySharedRepository {
    activityRepository;
    activityRequestRepository;
    userRepository;
    projectRepository;
    holidayRepository;
    constructor(activityRepository, activityRequestRepository, userRepository, projectRepository, holidayRepository) {
        this.activityRepository = activityRepository;
        this.activityRequestRepository = activityRequestRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.holidayRepository = holidayRepository;
    }
    async getUserById(id) {
        return this.userRepository.findOneOrFail({
            where: { id },
            relations: ["manager"]
        });
    }
    async getUserByIdOrThrow(id) {
        return this.userRepository.findOneOrFail({ where: { id } });
    }
    async getProjectOrThrow(id) {
        return this.projectRepository.findOneOrFail({ where: { id } });
    }
    async getActivitiesOnDay(dayDate, filters) {
        const where = {};
        if (filters.excludeActivityIds)
            where.id = (0, typeorm_2.Not)((0, typeorm_2.In)(filters.excludeActivityIds));
        if (filters.activityTypes)
            where.activityType = (0, typeorm_2.In)(filters.activityTypes);
        if (filters.statuses)
            where.status = (0, typeorm_2.In)(filters.statuses);
        if (filters.userId)
            where.userId = filters.userId;
        where.date = (0, typeorm_2.And)((0, typeorm_2.LessThanOrEqual)(date_helper_1.DateHelper.getEndOfDay(dayDate)), (0, typeorm_2.MoreThanOrEqual)(date_helper_1.DateHelper.getStartOfDay(dayDate)));
        return this.activityRepository.find({
            where
        });
    }
    async getActivityRequestById(ids) {
        const activityRequests = await this.activityRequestRepository.find({ where: { id: (0, typeorm_2.In)(ids) }, relations: { userActivities: true } });
        return activityRequests.map(activity => type_helper_1.TypeHelper.validateRelation(activity, "userActivities"));
    }
    async getActivitiesOnDayInRange(filters) {
        const where = {};
        if (filters.excludeActivityIds)
            where.id = (0, typeorm_2.Not)((0, typeorm_2.In)(filters.excludeActivityIds));
        if (filters.activityTypes)
            where.activityType = (0, typeorm_2.In)(filters.activityTypes);
        if (filters.statuses)
            where.status = (0, typeorm_2.In)(filters.statuses);
        if (filters.userId)
            where.userId = filters.userId;
        where.date = (0, typeorm_2.In)(filters.dates);
        return this.activityRepository.find({
            where
        });
    }
    async getActivitiesRequestsOnDayInRange(filters) {
        const where = {};
        if (filters.excludeActivityIds)
            where.id = (0, typeorm_2.Not)((0, typeorm_2.In)(filters.excludeActivityIds));
        if (filters.activityTypes)
            where.activityType = (0, typeorm_2.In)(filters.activityTypes);
        if (filters.statuses)
            where.status = (0, typeorm_2.In)(filters.statuses);
        if (filters.userId)
            where.userId = filters.userId;
        where.dateStart = (0, typeorm_2.And)((0, typeorm_2.LessThanOrEqual)((0, typeorm_2.In)(filters.dates.map(date => date_helper_1.DateHelper.getEndOfDay(date)))), (0, typeorm_2.MoreThanOrEqual)((0, typeorm_2.In)(filters.dates.map(date => date_helper_1.DateHelper.getStartOfDay(date)))));
        return this.activityRequestRepository.find({
            where
        });
    }
    async getEarliestActivityByUserId(userId) {
        const earliestActivity = await this.activityRepository.findOne({
            where: { userId },
            order: { date: "ASC" }
        });
        return earliestActivity ?? undefined;
    }
    async findActivityRequest(whereOptions) {
        return this.activityRequestRepository.findOne({ where: whereOptions });
    }
    async findActivityRequestWithActivitiesOrFail(whereOptions) {
        return this.activityRequestRepository.findOneOrFail({ where: whereOptions, relations: { userActivities: true } });
    }
    async findActivityRequestWithActivities(whereOptions) {
        return this.activityRequestRepository.findOne({ where: whereOptions, relations: { userActivities: true } });
    }
    async findActivityRequestOrFail(options) {
        return (await this.activityRequestRepository.findOneOrFail(options));
    }
    async cancelActivityRequest(cancelActivityRequest, cancelActivity) {
        return this.activityRequestRepository.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const activityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            const newActivityRequest = await activityRequestRepository.save({ ...cancelActivityRequest });
            await activityRepository.save(cancelActivity.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })));
            return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS });
        });
    }
    async reviewActivityRequest(reviewActivityRequest, reviewActivity) {
        return this.activityRequestRepository.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const activityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            const newActivityRequest = await activityRequestRepository.save({ ...reviewActivityRequest });
            await activityRepository.save(reviewActivity.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })));
            return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: { ...LOAD_RELATIONS } });
        });
    }
    async getHolidays(dateRange) {
        return this.holidayRepository.find({ where: { countryCode: "SI", date: (0, typeorm_2.Between)(dateRange.dateStart, dateRange.dateEnd) } });
    }
};
exports.ActivitySharedRepository = ActivitySharedRepository;
exports.ActivitySharedRepository = ActivitySharedRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_activity_entity_1.UserActivityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_activity_request_entity_1.UserActivityRequestEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(holiday_entity_1.HolidayEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ActivitySharedRepository);
//# sourceMappingURL=activity-shared.repository.js.map