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
exports.ActivityVacationService = void 0;
const common_1 = require("@nestjs/common");
const user_assigned_vacation_service_1 = require("../../../../user-assigned-vacation/services/user-assigned-vacation.service");
const activity_shared_db_mapper_1 = require("../../activity-shared/mappers/activity-shared-db.mapper");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_request_actions_service_1 = require("../../activity-shared/services/activity-shared-request-actions.service");
const activity_vacation_db_mapper_1 = require("../mappers/activity-vacation-db.mapper");
const activity_vacation_repository_1 = require("../repository/activity-vacation.repository");
const activity_vacation_validation_service_1 = require("./activity-vacation-validation.service");
const activity_request_type_helper_1 = require("../../../../../../../utils/helpers/activity-request-type.helper");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
const vacation_helper_1 = require("../../../../../../../utils/helpers/vacation.helper");
let ActivityVacationService = class ActivityVacationService {
    activitySharedService;
    activityVacationRepository;
    activityVacationValidationService;
    userAssignedVacationService;
    activitySharedRequestActionsService;
    constructor(activitySharedService, activityVacationRepository, activityVacationValidationService, userAssignedVacationService, activitySharedRequestActionsService) {
        this.activitySharedService = activitySharedService;
        this.activityVacationRepository = activityVacationRepository;
        this.activityVacationValidationService = activityVacationValidationService;
        this.userAssignedVacationService = userAssignedVacationService;
        this.activitySharedRequestActionsService = activitySharedRequestActionsService;
    }
    async createActivityRequest(userInvoker, activityVacationCreateRequest) {
        const dates = await this.activitySharedService.getDatesFromRange(activityVacationCreateRequest);
        const activityVacations = await this.linkVacationToAssignedVacation(activityVacationCreateRequest, dates);
        const { activityRequest, activities } = activity_vacation_db_mapper_1.ActivityVacationDBMapper.createActivityRequest(activityVacationCreateRequest, activityVacations);
        await this.activityVacationValidationService.preCreateSaveValidation(activityRequest, activities);
        const activityVacationEntity = await this.activityVacationRepository.createActivityRequest(activityRequest, activities);
        return this.enrichActivityRequest(userInvoker.user.id, activityVacationEntity);
    }
    async cancelActivityRequest(userInvoker, activityVacationCancelRequest) {
        const activityVacationEntity = await this.activityVacationValidationService.preCancelTransformValidation(activityVacationCancelRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.cancelActivity(activityVacationCancelRequest, activityVacationEntity.userActivities);
        this.activityVacationValidationService.preCancelSaveValidation(activityVacationEntity, activityRequest);
        const canceledActivityVacationEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily);
        return this.enrichActivityRequest(userInvoker.user.id, canceledActivityVacationEntity);
    }
    async reviewActivityRequest(userInvoker, activityVacationReviewRequest) {
        const activityVacationEntity = await this.activityVacationValidationService.preReviewTransformValidation(activityVacationReviewRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.reviewActivity(activityVacationReviewRequest, activityVacationEntity.userActivities);
        this.activityVacationValidationService.preReviewSaveValidation(activityVacationEntity, activityRequest);
        const reviewedActivityVacationEntity = await this.activitySharedService.reviewActivityRequest(activityRequest, activityDaily);
        const reviewedActivityVacations = reviewedActivityVacationEntity.userActivities ?? [];
        return this.enrichActivityRequest(userInvoker.user.id, reviewedActivityVacationEntity);
    }
    async enrichActivityRequest(userInvoker, activityRequest, subordinateIds = []) {
        const activityRequestTypeSafe = activity_request_type_helper_1.ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, user_activity_enum_1.UserActivityType.Vacation);
        const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds);
        return {
            ...activityRequestTypeSafe,
            actions
        };
    }
    async linkVacationToAssignedVacation(activityVacationCreateRequest, dates) {
        const { currentYearVacation, previousYearVacation } = await this.getCurrentAndPreviousAssignedVacations(activityVacationCreateRequest.userId);
        const oldVacationExpirationDate = vacation_helper_1.VacationHelper.getOldVacationExpirationDate(currentYearVacation);
        let currentLeftover = await this.getLeftover(currentYearVacation);
        let previousLeftover = await this.getLeftover(previousYearVacation);
        const isValidDateFrame = (date, expirationDate) => {
            if (!expirationDate)
                return false;
            return date <= expirationDate;
        };
        const activityVacations = dates.map((date, index) => {
            if (previousLeftover > 0 && previousYearVacation && isValidDateFrame(date, oldVacationExpirationDate)) {
                previousLeftover -= 1;
                return activity_vacation_db_mapper_1.ActivityVacationDBMapper.createActivityVacation(activityVacationCreateRequest, date, previousYearVacation.id);
            }
            if (currentLeftover > 0 && currentYearVacation) {
                currentLeftover -= 1;
                return activity_vacation_db_mapper_1.ActivityVacationDBMapper.createActivityVacation(activityVacationCreateRequest, date, currentYearVacation.id);
            }
            throw new common_1.BadRequestException(`Not enough assigned vacation days. Shorten your vacation for ${dates.length - index} days.`, `Not enough assigned vacation days. Requested vacation length: ${dates.length} for workspace user ID: '${activityVacationCreateRequest.userId}'`);
        });
        return activityVacations;
    }
    async getCurrentAndPreviousAssignedVacations(userId) {
        const currentDate = date_helper_1.DateHelper.addWorkspaceOffset("Europe/Ljubljana");
        const previousDate = date_helper_1.DateHelper.subtract(currentDate, 1, "years");
        const currentYear = currentDate.getFullYear();
        const previousYear = previousDate.getFullYear();
        let currentYearVacation = await this.activityVacationRepository.getUserAssignedVacation(userId, currentYear);
        const previousYearVacation = await this.activityVacationRepository.getUserAssignedVacation(userId, previousYear);
        if (!currentYearVacation) {
            currentYearVacation = await this.userAssignedVacationService.createAssignedVacationForYear(userId, currentYear);
        }
        return {
            currentYearVacation,
            previousYearVacation
        };
    }
    async getLeftover(vacation) {
        if (!vacation) {
            return 0;
        }
        const vacationsUsed = vacation.vacations?.length ?? 0;
        const vacationsUsedInitial = vacation.initialUsedDays ?? 0;
        const vacationsUsedTotal = vacationsUsed + vacationsUsedInitial;
        const assignedDays = vacation.assignedDays ? vacation.assignedDays : 50;
        return assignedDays - vacationsUsedTotal;
    }
};
exports.ActivityVacationService = ActivityVacationService;
exports.ActivityVacationService = ActivityVacationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService,
        activity_vacation_repository_1.ActivityVacationRepository,
        activity_vacation_validation_service_1.ActivityVacationValidationService,
        user_assigned_vacation_service_1.UserAssignedVacationService,
        activity_shared_request_actions_service_1.ActivitySharedRequestActionsService])
], ActivityVacationService);
//# sourceMappingURL=activity-vacation.service.js.map