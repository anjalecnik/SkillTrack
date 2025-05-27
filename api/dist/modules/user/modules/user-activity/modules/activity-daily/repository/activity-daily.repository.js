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
exports.ActivityDailyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const activity_daily_validation_service_1 = require("../services/activity-daily-validation.service");
const user_activity_request_entity_1 = require("../../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../../libs/db/entities/user-activity.entity");
const user_working_hours_entity_1 = require("../../../../../../../libs/db/entities/user-working-hours.entity");
const master_data_source_service_1 = require("../../../../../../../libs/db/master-data-source.service");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const activity_request_type_helper_1 = require("../../../../../../../utils/helpers/activity-request-type.helper");
const LOAD_RELATIONS = {
    userActivities: { project: true },
    user: { workPosition: true }
};
let ActivityDailyRepository = class ActivityDailyRepository {
    activityRepository;
    requestRepository;
    workingHoursRepository;
    masterDataSource;
    activityDailyValidationService;
    constructor(activityRepository, requestRepository, workingHoursRepository, masterDataSource, activityDailyValidationService) {
        this.activityRepository = activityRepository;
        this.requestRepository = requestRepository;
        this.workingHoursRepository = workingHoursRepository;
        this.masterDataSource = masterDataSource;
        this.activityDailyValidationService = activityDailyValidationService;
    }
    async getUserLastActivityDailyRequest({ userId, date, hasProject }) {
        const userActivitiesFilter = hasProject ? { projectId: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) } : undefined;
        const lastDailyRequest = await this.requestRepository.findOne({
            where: {
                dateStart: (0, typeorm_2.LessThanOrEqual)(date),
                userId,
                activityType: user_activity_enum_1.UserActivityType.Daily,
                status: user_activity_status_enum_1.UserActivityStatus.Approved,
                userActivities: userActivitiesFilter
            },
            relations: { userActivities: { project: true }, user: { workPosition: true } },
            order: { dateStart: "DESC" }
        });
        if (!lastDailyRequest || !activity_request_type_helper_1.ActivityRequestTypeHelper.isDailyRequest(lastDailyRequest))
            return undefined;
        return lastDailyRequest;
    }
    async getDailyActivitiesByActivityRequest(activityRequestId) {
        return this.activityRepository.find({
            where: {
                activityRequestId,
                activityType: user_activity_enum_1.UserActivityType.Daily,
                status: (0, typeorm_2.In)([user_activity_status_enum_1.UserActivityStatus.Approved, user_activity_status_enum_1.UserActivityStatus.PendingApproval])
            },
            relations: { workingHours: true, project: true },
            order: {
                workingHours: {
                    fromDateStart: "ASC"
                }
            }
        });
    }
    async createActivityRequest(createActivityRequest, activitiesWithWorkingHours) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const activityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            const workingHoursRepository = entityManager.getRepository(user_working_hours_entity_1.UserWorkingHoursEntity);
            await this.activityDailyValidationService.preCreateSaveValidation(createActivityRequest);
            const newActivityRequest = await activityRequestRepository.save({ ...createActivityRequest });
            for (const { activity, workingHour } of activitiesWithWorkingHours) {
                const newWorkingHour = await workingHoursRepository.save(workingHour);
                await activityRepository.save({ ...activity, workingHoursId: newWorkingHour.id, activityRequestId: newActivityRequest.id });
            }
            return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS });
        });
    }
    async updateActivityRequest(updateActivityRequest, activitiesWithWorkingHours) {
        return this.masterDataSource.dataSource.manager.transaction(async (entityManager) => {
            const activityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const workingHoursRepository = entityManager.getRepository(user_working_hours_entity_1.UserWorkingHoursEntity);
            const existingActivities = await activityRepository.find({
                where: { activityRequestId: updateActivityRequest.id, activityType: user_activity_enum_1.UserActivityType.Daily },
                relations: { workingHours: true }
            });
            const existingWorkingHoursIds = existingActivities.filter(a => a.workingHours).map(a => a.workingHours.id);
            await activityRepository.remove(existingActivities);
            await workingHoursRepository.delete(existingWorkingHoursIds);
            for (const { activity, workingHour } of activitiesWithWorkingHours) {
                const newWorkingHour = await workingHoursRepository.save(workingHour);
                await activityRepository.save({ ...activity, workingHoursId: newWorkingHour.id, activityRequestId: updateActivityRequest.id });
            }
            await activityRequestRepository.update(updateActivityRequest.id, { reportedByUserId: updateActivityRequest.reportedByUserId });
            return activityRequestRepository.findOneOrFail({ where: { id: updateActivityRequest.id }, relations: LOAD_RELATIONS });
        });
    }
    async getDailyActivitiesOnDate(fromDateStart, toDateEnd, userId) {
        return this.activityRepository.find({
            where: {
                userId,
                activityType: user_activity_enum_1.UserActivityType.Daily,
                status: user_activity_status_enum_1.UserActivityStatus.Approved,
                date: (0, typeorm_2.Between)(fromDateStart, toDateEnd)
            },
            relations: { workingHours: true }
        });
    }
    async getLunchActivitiesOnDate(fromDateStart, toDateEnd, userId) {
        return this.activityRepository.find({
            where: {
                userId,
                activityType: user_activity_enum_1.UserActivityType.Lunch,
                date: (0, typeorm_2.Between)(fromDateStart, toDateEnd)
            }
        });
    }
    async getDailyActivity(activityId) {
        return this.activityRepository.findOneOrFail({
            where: { id: activityId },
            relations: { workingHours: true }
        });
    }
    async getActivityRequestById(activityRequestId) {
        return this.requestRepository.findOneOrFail({ where: { id: activityRequestId, activityType: user_activity_enum_1.UserActivityType.Daily } });
    }
    async getAllUserDailyActivities(userId, date) {
        return this.activityRepository.find({
            where: { userId, activityType: user_activity_enum_1.UserActivityType.Daily, status: user_activity_status_enum_1.UserActivityStatus.Approved, date: (0, typeorm_2.MoreThanOrEqual)(date) },
            relations: { workingHours: true },
            order: { date: "DESC" }
        });
    }
    async getWorkingHoursOnDate(userId, startDate, endDate) {
        return this.workingHoursRepository.find({ where: { userId, fromDateStart: (0, typeorm_2.Between)(startDate, endDate) } });
    }
    async assignNewWorkingHoursToActivity(activity, workingHours) {
        const newWorkingHour = await this.workingHoursRepository.save(workingHours);
        activity.workingHoursId = newWorkingHour.id;
        activity.workingHours = newWorkingHour;
        return this.activityRepository.save(activity);
    }
    async assignExistingWorkingHoursToActivity(activity, workingHour) {
        activity.workingHoursId = workingHour.id;
        activity.workingHours = workingHour;
        return this.activityRepository.save(activity);
    }
    async deleteWorkingHours(workingHoursIds) {
        await this.workingHoursRepository.delete(workingHoursIds);
    }
};
exports.ActivityDailyRepository = ActivityDailyRepository;
exports.ActivityDailyRepository = ActivityDailyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_activity_entity_1.UserActivityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_activity_request_entity_1.UserActivityRequestEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_working_hours_entity_1.UserWorkingHoursEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        master_data_source_service_1.MasterDataSource,
        activity_daily_validation_service_1.ActivityDailyValidationService])
], ActivityDailyRepository);
//# sourceMappingURL=activity-daily.repository.js.map