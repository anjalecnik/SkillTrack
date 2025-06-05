"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityModule = void 0;
const common_1 = require("@nestjs/common");
const admin_hub_activity_controller_1 = require("../controllers/admin-hub-activity.controller");
const user_hub_activity_controller_1 = require("../controllers/user-hub-activity.controller");
const user_activity_repository_1 = require("../repository/user-activity.repository");
const user_activity_factory_worker_service_1 = require("../services/user-activity-factory-worker.service");
const user_activity_service_1 = require("../services/user-activity.service");
const activity_business_trip_module_1 = require("./activity-business-trip/activity-business-trip.module");
const activity_daily_module_1 = require("./activity-daily/activity-daily.module");
const activity_performance_review_module_1 = require("./activity-performance-review/activity-performance-review.module");
const activity_shared_module_1 = require("./activity-shared/activity-shared.module");
const activity_sick_leave_module_1 = require("./activity-sick-leave/activity-sick-leave.module");
const activity_vacation_module_1 = require("./activity-vacation/activity-vacation.module");
const activity_virtual_module_1 = require("./activity-virtual/activity-virtual.module");
const master_data_source_service_1 = require("../../../../../libs/db/master-data-source.service");
const utility_service_1 = require("../../../../utility/services/utility.service");
const utility_repository_1 = require("../../../../utility/repository/utility.repository");
const typeorm_1 = require("@nestjs/typeorm");
const holiday_entity_1 = require("../../../../../libs/db/entities/holiday.entity");
const project_entity_1 = require("../../../../../libs/db/entities/project.entity");
const user_activity_request_entity_1 = require("../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../libs/db/entities/user-activity.entity");
const user_address_entity_1 = require("../../../../../libs/db/entities/user-address.entity");
const user_working_hours_entity_1 = require("../../../../../libs/db/entities/user-working-hours.entity");
const user_entity_1 = require("../../../../../libs/db/entities/user.entity");
let UserActivityModule = class UserActivityModule {
};
exports.UserActivityModule = UserActivityModule;
exports.UserActivityModule = UserActivityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity, user_working_hours_entity_1.UserWorkingHoursEntity, project_entity_1.ProjectEntity, holiday_entity_1.HolidayEntity, user_address_entity_1.UserAddressEntity]),
            activity_shared_module_1.ActivitySharedModule,
            activity_daily_module_1.ActivityDailyModule,
            activity_business_trip_module_1.ActivityBusinessTripModule,
            activity_vacation_module_1.ActivityVacationModule,
            activity_sick_leave_module_1.ActivitySickLeaveModule,
            activity_virtual_module_1.ActivityVirtualModule,
            activity_performance_review_module_1.ActivityPerformanceReviewModule
        ],
        controllers: [admin_hub_activity_controller_1.AdminHubActivityController, user_hub_activity_controller_1.UserHubActivityController],
        providers: [user_activity_service_1.UserActivityService, user_activity_factory_worker_service_1.UserActivityFactoryWorkerService, user_activity_repository_1.UserActivityRepository, master_data_source_service_1.MasterDataSource, utility_service_1.UtilityService, utility_repository_1.UtilityRepository, common_1.ValidationPipe],
        exports: [user_activity_service_1.UserActivityService]
    })
], UserActivityModule);
//# sourceMappingURL=user-activity.module.js.map