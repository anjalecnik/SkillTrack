"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_module_1 = require("../activity-shared/activity-shared.module");
const activity_expense_repository_1 = require("./repository/activity-expense.repository");
const activity_expense_service_1 = require("./services/activity-expense.service");
const activity_expense_validation_service_1 = require("./services/activity-expense-validation.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_activity_request_entity_1 = require("../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../../../libs/db/entities/user.entity");
const master_data_source_service_1 = require("../../../../../../libs/db/master-data-source.service");
let ActivityExpenseModule = class ActivityExpenseModule {
};
exports.ActivityExpenseModule = ActivityExpenseModule;
exports.ActivityExpenseModule = ActivityExpenseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity]), activity_shared_module_1.ActivitySharedModule],
        providers: [activity_expense_service_1.ActivityExpenseService, activity_expense_validation_service_1.ActivityExpenseValidationService, activity_expense_repository_1.ActivityExpenseRepository, master_data_source_service_1.MasterDataSource],
        exports: [activity_expense_service_1.ActivityExpenseService]
    })
], ActivityExpenseModule);
//# sourceMappingURL=activity-expense.module.js.map