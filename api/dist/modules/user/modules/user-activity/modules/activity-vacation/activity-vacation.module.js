"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityVacationModule = void 0;
const common_1 = require("@nestjs/common");
const user_assigned_vacation_module_1 = require("../../../user-assigned-vacation/user-assigned-vacation.module");
const activity_shared_module_1 = require("../activity-shared/activity-shared.module");
const activity_vacation_repository_1 = require("./repository/activity-vacation.repository");
const activity_vacation_service_1 = require("./services/activity-vacation.service");
const activity_vacation_validation_service_1 = require("./services/activity-vacation-validation.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_activity_request_entity_1 = require("../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../../../libs/db/entities/user.entity");
const user_vacation_assigned_entity_1 = require("../../../../../../libs/db/entities/user-vacation-assigned.entity");
const master_data_source_service_1 = require("../../../../../../libs/db/master-data-source.service");
const mail_service_1 = require("../../../../../mail/services/mail.service");
let ActivityVacationModule = class ActivityVacationModule {
};
exports.ActivityVacationModule = ActivityVacationModule;
exports.ActivityVacationModule = ActivityVacationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity, user_vacation_assigned_entity_1.UserVacationAssignedEntity]), activity_shared_module_1.ActivitySharedModule, user_assigned_vacation_module_1.UserAssignedVacationModule],
        providers: [activity_vacation_service_1.ActivityVacationService, activity_vacation_validation_service_1.ActivityVacationValidationService, activity_vacation_repository_1.ActivityVacationRepository, master_data_source_service_1.MasterDataSource, mail_service_1.MailService],
        exports: [activity_vacation_service_1.ActivityVacationService, activity_vacation_validation_service_1.ActivityVacationValidationService]
    })
], ActivityVacationModule);
//# sourceMappingURL=activity-vacation.module.js.map