"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWorkingHoursModule = void 0;
const common_1 = require("@nestjs/common");
const user_working_hours_service_1 = require("./services/user-working-hours.service");
const activity_shared_module_1 = require("../user-activity/modules/activity-shared/activity-shared.module");
const activity_daily_repository_1 = require("../user-activity/modules/activity-daily/repository/activity-daily.repository");
const activity_lunch_module_1 = require("../user-activity/modules/activity-lunch/activity-lunch.module");
const activity_daily_validation_service_1 = require("../user-activity/modules/activity-daily/services/activity-daily-validation.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../../libs/db/entities/user.entity");
const user_activity_entity_1 = require("../../../../libs/db/entities/user-activity.entity");
const user_activity_request_entity_1 = require("../../../../libs/db/entities/user-activity-request.entity");
const user_working_hours_entity_1 = require("../../../../libs/db/entities/user-working-hours.entity");
const master_data_source_service_1 = require("../../../../libs/db/master-data-source.service");
let UserWorkingHoursModule = class UserWorkingHoursModule {
};
exports.UserWorkingHoursModule = UserWorkingHoursModule;
exports.UserWorkingHoursModule = UserWorkingHoursModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity, user_working_hours_entity_1.UserWorkingHoursEntity]), activity_shared_module_1.ActivitySharedModule, activity_lunch_module_1.ActivityLunchModule],
        controllers: [],
        providers: [user_working_hours_service_1.UserWorkingHoursService, activity_daily_repository_1.ActivityDailyRepository, activity_daily_validation_service_1.ActivityDailyValidationService, user_working_hours_service_1.UserWorkingHoursService, master_data_source_service_1.MasterDataSource],
        exports: [user_working_hours_service_1.UserWorkingHoursService]
    })
], UserWorkingHoursModule);
//# sourceMappingURL=user-working-hours.module.js.map