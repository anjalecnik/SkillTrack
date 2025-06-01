"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityDailyModule = void 0;
const common_1 = require("@nestjs/common");
const user_working_hours_module_1 = require("../../../user-working-hours/user-working-hours.module");
const activity_shared_module_1 = require("../activity-shared/activity-shared.module");
const activity_daily_repository_1 = require("./repository/activity-daily.repository");
const activity_daily_service_1 = require("./services/activity-daily.service");
const activity_daily_validation_service_1 = require("./services/activity-daily-validation.service");
const activity_lunch_module_1 = require("../activity-lunch/activity-lunch.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_activity_request_entity_1 = require("../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../../../libs/db/entities/user.entity");
const master_data_source_service_1 = require("../../../../../../libs/db/master-data-source.service");
const utility_service_1 = require("../../../../../utility/services/utility.service");
const user_working_hours_entity_1 = require("../../../../../../libs/db/entities/user-working-hours.entity");
const user_working_hours_service_1 = require("../../../user-working-hours/services/user-working-hours.service");
const utility_repository_1 = require("../../../../../utility/repository/utility.repository");
const project_entity_1 = require("../../../../../../libs/db/entities/project.entity");
const holiday_entity_1 = require("../../../../../../libs/db/entities/holiday.entity");
const user_address_entity_1 = require("../../../../../../libs/db/entities/user-address.entity");
const user_address_service_1 = require("../../../user-address/services/user-address.service");
const user_address_repository_1 = require("../../../user-address/repository/user-address.repository");
let ActivityDailyModule = class ActivityDailyModule {
};
exports.ActivityDailyModule = ActivityDailyModule;
exports.ActivityDailyModule = ActivityDailyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity, user_working_hours_entity_1.UserWorkingHoursEntity, project_entity_1.ProjectEntity, holiday_entity_1.HolidayEntity, user_address_entity_1.UserAddressEntity]),
            activity_shared_module_1.ActivitySharedModule,
            user_working_hours_module_1.UserWorkingHoursModule,
            activity_lunch_module_1.ActivityLunchModule
        ],
        providers: [
            activity_daily_service_1.ActivityDailyService,
            activity_daily_validation_service_1.ActivityDailyValidationService,
            activity_daily_repository_1.ActivityDailyRepository,
            master_data_source_service_1.MasterDataSource,
            utility_service_1.UtilityService,
            user_working_hours_service_1.UserWorkingHoursService,
            utility_repository_1.UtilityRepository,
            user_address_service_1.UserAddressService,
            user_address_repository_1.UserAddressRepository
        ],
        exports: [activity_daily_service_1.ActivityDailyService]
    })
], ActivityDailyModule);
//# sourceMappingURL=activity-daily.module.js.map