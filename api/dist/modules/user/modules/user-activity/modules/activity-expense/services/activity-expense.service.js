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
exports.ActivityExpenseService = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_db_mapper_1 = require("../../activity-shared/mappers/activity-shared-db.mapper");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_request_actions_service_1 = require("../../activity-shared/services/activity-shared-request-actions.service");
const activity_expense_db_mapper_1 = require("../mappers/activity-expense-db.mapper");
const activity_expense_repository_1 = require("../repository/activity-expense.repository");
const activity_expense_validation_service_1 = require("./activity-expense-validation.service");
const activity_request_type_helper_1 = require("../../../../../../../utils/helpers/activity-request-type.helper");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
let ActivityExpenseService = class ActivityExpenseService {
    activitySharedService;
    activityExpenseRepository;
    activityExpenseValidationService;
    activitySharedRequestActionsService;
    constructor(activitySharedService, activityExpenseRepository, activityExpenseValidationService, activitySharedRequestActionsService) {
        this.activitySharedService = activitySharedService;
        this.activityExpenseRepository = activityExpenseRepository;
        this.activityExpenseValidationService = activityExpenseValidationService;
        this.activitySharedRequestActionsService = activitySharedRequestActionsService;
    }
    async createActivityRequest(userInvoker, activityExpenseCreateRequest) {
        const { activityRequest, activities } = activity_expense_db_mapper_1.ActivityExpenseDBMapper.createActivityRequest(activityExpenseCreateRequest);
        const activityExpenseEntity = await this.activityExpenseRepository.createActivityRequest(activityRequest, activities);
        return this.enrichActivityRequest(userInvoker.user.id, activityExpenseEntity);
    }
    async cancelActivityRequest(userInvoker, activityExpenseCancelRequest) {
        const activityExpenseRequestEntity = await this.activityExpenseValidationService.preCancelTransformValidation(activityExpenseCancelRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.cancelActivity(activityExpenseCancelRequest, activityExpenseRequestEntity.userActivities);
        this.activityExpenseValidationService.preCancelSaveValidation(activityExpenseRequestEntity, activityRequest);
        const canaledActivityExpenseEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily);
        return this.enrichActivityRequest(userInvoker.user.id, canaledActivityExpenseEntity);
    }
    async reviewActivityRequest(userInvoker, activityExpenseReviewRequest) {
        const activityExpenseEntity = await this.activityExpenseValidationService.preReviewTransformValidation(activityExpenseReviewRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.reviewActivity(activityExpenseReviewRequest, activityExpenseEntity.userActivities);
        const reviewedActivityExpenseEntity = await this.activitySharedService.reviewActivityRequest(activityRequest, activityDaily);
        return this.enrichActivityRequest(userInvoker.user.id, reviewedActivityExpenseEntity);
    }
    async enrichActivityRequest(userInvoker, activityRequest, subordinateIds = []) {
        const activityRequestTypeSafe = activity_request_type_helper_1.ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, user_activity_enum_1.UserActivityType.Expense);
        const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds);
        return {
            ...activityRequestTypeSafe,
            actions
        };
    }
};
exports.ActivityExpenseService = ActivityExpenseService;
exports.ActivityExpenseService = ActivityExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService,
        activity_expense_repository_1.ActivityExpenseRepository,
        activity_expense_validation_service_1.ActivityExpenseValidationService,
        activity_shared_request_actions_service_1.ActivitySharedRequestActionsService])
], ActivityExpenseService);
//# sourceMappingURL=activity-expense.service.js.map