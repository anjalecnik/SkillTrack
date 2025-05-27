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
exports.ActivityDailyService = void 0;
const common_1 = require("@nestjs/common");
const user_working_hours_service_1 = require("../../../../user-working-hours/services/user-working-hours.service");
const activity_shared_db_mapper_1 = require("../../activity-shared/mappers/activity-shared-db.mapper");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_request_actions_service_1 = require("../../activity-shared/services/activity-shared-request-actions.service");
const activity_daily_db_mapper_1 = require("../mappers/activity-daily-db-mapper");
const activity_daily_repository_1 = require("../repository/activity-daily.repository");
const activity_daily_validation_service_1 = require("../services/activity-daily-validation.service");
const activity_lunch_service_1 = require("../../activity-lunch/services/activity-lunch.service");
const utility_service_1 = require("../../../../../../utility/services/utility.service");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const activity_request_type_helper_1 = require("../../../../../../../utils/helpers/activity-request-type.helper");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
let ActivityDailyService = class ActivityDailyService {
    activitySharedService;
    activityDailyRepository;
    activityDailyValidationService;
    userWorkingHoursService;
    utilityService;
    activitySharedRequestActionsService;
    activityLunchService;
    constructor(activitySharedService, activityDailyRepository, activityDailyValidationService, userWorkingHoursService, utilityService, activitySharedRequestActionsService, activityLunchService) {
        this.activitySharedService = activitySharedService;
        this.activityDailyRepository = activityDailyRepository;
        this.activityDailyValidationService = activityDailyValidationService;
        this.userWorkingHoursService = userWorkingHoursService;
        this.utilityService = utilityService;
        this.activitySharedRequestActionsService = activitySharedRequestActionsService;
        this.activityLunchService = activityLunchService;
    }
    async getLastDailyRequestActivity(userInvoker, { date, ...workspaceCommon }) {
        const getDailyDate = async (date) => {
            if (date)
                return date;
            const timezone = "Europe/Ljubljana";
            return date_helper_1.DateHelper.subtractWorkspaceOffset(timezone);
        };
        const dailyDate = await getDailyDate(date);
        const lastDailyActivity = await this.activityDailyRepository.getUserLastActivityDailyRequest({ ...workspaceCommon, date: dailyDate });
        if (!lastDailyActivity)
            return undefined;
        return this.enrichActivityRequest(userInvoker.user.id, lastDailyActivity);
    }
    async createActivityRequest(userInvoker, bulkActivityDailyCreate) {
        const { activityRequest, activities } = activity_daily_db_mapper_1.ActivityDailyDBMapper.createActivityRequest(bulkActivityDailyCreate);
        await this.activityDailyValidationService.preCreateSaveValidation(activityRequest);
        const userWorkingHours = this.userWorkingHoursService.addWorkingHours(bulkActivityDailyCreate.workingHours, bulkActivityDailyCreate.dateStart);
        const activitiesWithWorkingHours = this.mapActivitiesToWorkingHours(activities, userWorkingHours);
        const newActivityRequest = await this.activityDailyRepository.createActivityRequest(activityRequest, activitiesWithWorkingHours);
        if (bulkActivityDailyCreate.lunch) {
            await this.activityLunchService.createLunchActivity({
                userId: bulkActivityDailyCreate.userId,
                date: bulkActivityDailyCreate.dateStart,
                activityRequestId: newActivityRequest.id
            });
        }
        const activityRequestDB = activity_request_type_helper_1.ActivityRequestTypeHelper.setAsActivityRequest(newActivityRequest, user_activity_enum_1.UserActivityType.Daily);
        return this.enrichActivityRequest(userInvoker.user.id, activityRequestDB);
    }
    async updateActivityRequest(userInvoker, bulkActivityRequestDailyUpdate) {
        const activityRequestEntity = await this.activityDailyValidationService.preUpdateTransformValidation(bulkActivityRequestDailyUpdate);
        const userWorkingHours = this.userWorkingHoursService.addWorkingHours(bulkActivityRequestDailyUpdate.workingHours, activityRequestEntity.dateStart);
        const activitiesWithWorkingHours = activity_daily_db_mapper_1.ActivityDailyDBMapper.mapUpdateActivityRequest(bulkActivityRequestDailyUpdate, activityRequestEntity, userWorkingHours);
        const updateActivityRequest = await this.activityDailyRepository.updateActivityRequest({ id: activityRequestEntity.id, reportedByUserId: bulkActivityRequestDailyUpdate.reportedByUserId }, activitiesWithWorkingHours);
        await this.activityLunchService.updateLunchActivity(bulkActivityRequestDailyUpdate.lunch, {
            userId: bulkActivityRequestDailyUpdate.userId,
            date: activityRequestEntity.dateStart,
            activityRequestId: updateActivityRequest.id
        });
        return this.enrichActivityRequest(userInvoker.user.id, updateActivityRequest);
    }
    async cancelActivityRequest(userInvoker, activityDailyRequest) {
        const activityRequestEntity = await this.activityDailyValidationService.preCancelTransformValidation(activityDailyRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.cancelActivity(activityRequestEntity, activityRequestEntity.userActivities);
        const cancelActivityRequest = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily);
        await this.activityLunchService.deleteLunchActivity({
            userId: userInvoker.user.id,
            activityRequestId: activityRequestEntity.id,
            date: activityRequestEntity.dateStart
        });
        return this.enrichActivityRequest(userInvoker.user.id, cancelActivityRequest);
    }
    async enrichActivityRequest(userInvoker, activityRequest, subordinateIds = []) {
        const activityRequestTypeSafe = activity_request_type_helper_1.ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, user_activity_enum_1.UserActivityType.Daily);
        const activities = await this.activityDailyRepository.getDailyActivitiesByActivityRequest(activityRequest.id);
        const lunchActivities = await this.activityLunchService.getLunchOnDay({
            userId: activityRequest.userId,
            date: activityRequest.dateStart,
            activityRequestId: activityRequest.id
        });
        const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds);
        return {
            ...activityRequestTypeSafe,
            lunch: lunchActivities.length > 0 ? true : false,
            activities,
            actions
        };
    }
    async enrichActivity(activity) {
        const workingHours = activity.workingHours;
        await this.activityDailyRepository.getDailyActivity(activity.id);
        return {
            ...activity,
            activityType: user_activity_enum_1.UserActivityType.Daily,
            workingHours: workingHours
        };
    }
    reviewActivityRequest(_userInvoker, _activityRequestReview) {
        throw new common_1.BadRequestException(`Invalid activity type to be reviewed.`, `Daily activity cannot be reviewed.`);
    }
    mapActivitiesToWorkingHours(activities, workingHours) {
        return activities.map(activity => {
            const index = workingHours.findIndex(wh => wh.projectId === activity.projectId);
            if (index === -1) {
                throw new common_1.NotFoundException(`No matching working hours for project ID: ${activity.projectId}`);
            }
            const [matchingHours] = workingHours.splice(index, 1);
            return {
                activity: activity,
                workingHour: {
                    type: matchingHours.type,
                    fromDateStart: matchingHours.fromDateStart,
                    toDateEnd: matchingHours.toDateEnd,
                    userId: activity.userId
                }
            };
        });
    }
    async getRelevantDailyActivities(userId, date) {
        return this.activityDailyRepository.getAllUserDailyActivities(userId, date);
    }
    async getWorkingHoursOnDate(userId, dateString) {
        const date = new Date(dateString);
        const startOfDay = date_helper_1.DateHelper.getStartOfDay(date);
        const endOfDay = date_helper_1.DateHelper.getEndOfDay(date);
        return this.activityDailyRepository.getWorkingHoursOnDate(userId, startOfDay, endOfDay);
    }
    async addWorkingHours(activities, timeRanges) {
        const createRequests = [];
        activities.forEach((activity, index) => {
            if (!activity.projectId)
                return;
            createRequests.push({
                projectId: activity.projectId,
                timeRange: timeRanges[index]
            });
        });
        return this.userWorkingHoursService.addWorkingHours(createRequests, activities[0].date);
    }
    async assignWorkingHoursResponseToActivities(activities, workingHours) {
        for (const activity of activities) {
            const workingHour = workingHours.find(wh => wh.projectId === activity.projectId);
            if (!workingHour)
                throw new common_1.NotFoundException(`No matching working hours for project ID: ${activity.projectId}`);
            const workingHoursEntity = {
                type: workingHour.type,
                fromDateStart: workingHour.fromDateStart,
                toDateEnd: workingHour.toDateEnd,
                userId: activity.userId
            };
            await this.activityDailyRepository.assignNewWorkingHoursToActivity(activity, workingHoursEntity);
        }
    }
    async assignWorkingHoursToActivities(activities, workingHours) {
        for (let i = 0; i < Math.min(activities.length, workingHours.length); i++) {
            await this.activityDailyRepository.assignExistingWorkingHoursToActivity(activities[i], workingHours[i]);
        }
    }
    async assignNewWorkingHourDeleteOld(activity, workingHour, oldWorkingHours) {
        await this.activityDailyRepository.deleteWorkingHours(oldWorkingHours.map(wh => wh.id));
        await this.activityDailyRepository.assignNewWorkingHoursToActivity(activity, workingHour);
    }
    async handleLunchActivities(dailyActivity, breakEntries) {
        await this.activityDailyRepository.deleteWorkingHours(breakEntries.map(wh => wh.id));
        await this.activityLunchService.createLunchActivity({
            userId: dailyActivity.userId,
            date: dailyActivity.date,
            activityRequestId: dailyActivity.activityRequestId
        });
    }
};
exports.ActivityDailyService = ActivityDailyService;
exports.ActivityDailyService = ActivityDailyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService,
        activity_daily_repository_1.ActivityDailyRepository,
        activity_daily_validation_service_1.ActivityDailyValidationService,
        user_working_hours_service_1.UserWorkingHoursService,
        utility_service_1.UtilityService,
        activity_shared_request_actions_service_1.ActivitySharedRequestActionsService,
        activity_lunch_service_1.ActivityLunchService])
], ActivityDailyService);
//# sourceMappingURL=activity-daily.service.js.map