"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityOverviewModule = void 0;
const common_1 = require("@nestjs/common");
const activity_overview_user_hub_controller_1 = require("./controllers/activity-overview-user-hub.controller");
const user_activity_repository_1 = require("../user/modules/user-activity/repository/user-activity.repository");
const user_repository_1 = require("../user/repository/user.repository");
const activity_overview_admin_hub_controller_1 = require("./controllers/activity-overview-admin-hub.controller");
const activity_overview_repository_1 = require("./repository/activity-overview.repository");
const activity_overview_service_1 = require("./services/activity-overview.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_activity_entity_1 = require("../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../libs/db/entities/user.entity");
const user_activity_request_entity_1 = require("../../libs/db/entities/user-activity-request.entity");
const user_performance_review_entity_1 = require("../../libs/db/entities/user-performance-review.entity");
const master_data_source_service_1 = require("../../libs/db/master-data-source.service");
const utility_module_1 = require("../utility/utility.module");
const project_user_entity_1 = require("../../libs/db/entities/project-user.entity");
let ActivityOverviewModule = class ActivityOverviewModule {
};
exports.ActivityOverviewModule = ActivityOverviewModule;
exports.ActivityOverviewModule = ActivityOverviewModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, project_user_entity_1.ProjectUserEntity, user_activity_request_entity_1.UserActivityRequestEntity, user_performance_review_entity_1.UserPerformanceReviewEntity]), utility_module_1.UtilityModule],
        controllers: [activity_overview_admin_hub_controller_1.ActivityOverviewAdminHubController, activity_overview_user_hub_controller_1.ActivityOverviewUserHubController],
        providers: [activity_overview_service_1.ActivityOverviewService, activity_overview_repository_1.ActivityOverviewRepository, user_repository_1.UserRepository, user_activity_repository_1.UserActivityRepository, master_data_source_service_1.MasterDataSource]
    })
], ActivityOverviewModule);
//# sourceMappingURL=activity-overview.module.js.map