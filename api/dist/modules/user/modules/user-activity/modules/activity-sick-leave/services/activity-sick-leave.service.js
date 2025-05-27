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
exports.ActivitySickLeaveService = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_db_mapper_1 = require("../../activity-shared/mappers/activity-shared-db.mapper");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_request_actions_service_1 = require("../../activity-shared/services/activity-shared-request-actions.service");
const activity_sick_leave_db_mapper_1 = require("../mappers/activity-sick-leave-db.mapper");
const activity_sick_leave_repository_1 = require("../repository/activity-sick-leave.repository");
const activity_sick_leave_validation_service_1 = require("./activity-sick-leave-validation.service");
const activity_request_type_helper_1 = require("../../../../../../../utils/helpers/activity-request-type.helper");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
let ActivitySickLeaveService = class ActivitySickLeaveService {
    activitySharedService;
    activitySickLeaveRepository;
    activitySickLeaveValidationService;
    activitySharedRequestActionsService;
    constructor(activitySharedService, activitySickLeaveRepository, activitySickLeaveValidationService, activitySharedRequestActionsService) {
        this.activitySharedService = activitySharedService;
        this.activitySickLeaveRepository = activitySickLeaveRepository;
        this.activitySickLeaveValidationService = activitySickLeaveValidationService;
        this.activitySharedRequestActionsService = activitySharedRequestActionsService;
    }
    async createActivityRequest(userInvoker, activitySickLeaveCreateRequest) {
        await this.activitySickLeaveValidationService.preCreateTransformValidation(activitySickLeaveCreateRequest);
        const dates = await this.activitySharedService.getDatesFromRange(activitySickLeaveCreateRequest);
        const userAssignedWorkHours = 8;
        const hours = (await this.calculateHours(activitySickLeaveCreateRequest)) ?? 8;
        const { activityRequest, activities } = activity_sick_leave_db_mapper_1.ActivitySickLeaveDBMapper.createActivityRequest(activitySickLeaveCreateRequest, dates, userAssignedWorkHours, hours);
        await this.activitySickLeaveValidationService.preCreateSaveValidation(activityRequest, activities);
        const activitySickLeaveEntity = await this.activitySickLeaveRepository.createActivityRequest(activityRequest, activities);
        return this.enrichActivityRequest(userInvoker.user.id, activitySickLeaveEntity);
    }
    async cancelActivityRequest(userInvoker, activitySickLeaveCancelRequest) {
        const activitySickLeaveEntity = await this.activitySickLeaveValidationService.preCancelTransformValidation(activitySickLeaveCancelRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.cancelActivity(activitySickLeaveCancelRequest, activitySickLeaveEntity.userActivities);
        this.activitySickLeaveValidationService.preCancelSaveValidation(activitySickLeaveEntity, activityRequest);
        const canceledActivitySickLeaveEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily);
        return this.enrichActivityRequest(userInvoker.user.id, canceledActivitySickLeaveEntity);
    }
    reviewActivityRequest(_activityRequestReview) {
        throw new common_1.BadRequestException(`Invalid activity type to be reviewed.`, `Invalid activity type for activity request with ID: '${_activityRequestReview.id}'`);
    }
    async enrichActivityRequest(userInvoker, activityRequest, subordinateIds = []) {
        const activityRequestTypeSafe = activity_request_type_helper_1.ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, user_activity_enum_1.UserActivityType.SickLeave);
        const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds);
        return {
            ...activityRequestTypeSafe,
            actions
        };
    }
    async calculateHours(activitySickLeaveCreateRequest) {
        return 24;
    }
};
exports.ActivitySickLeaveService = ActivitySickLeaveService;
exports.ActivitySickLeaveService = ActivitySickLeaveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService,
        activity_sick_leave_repository_1.ActivitySickLeaveRepository,
        activity_sick_leave_validation_service_1.ActivitySickLeaveValidationService,
        activity_shared_request_actions_service_1.ActivitySharedRequestActionsService])
], ActivitySickLeaveService);
//# sourceMappingURL=activity-sick-leave.service.js.map