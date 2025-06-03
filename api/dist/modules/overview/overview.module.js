"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverviewModule = void 0;
const common_1 = require("@nestjs/common");
const emitter_module_1 = require("../../libs/emitters/emitter.module");
const user_entity_1 = require("../../libs/db/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const utility_module_1 = require("../utility/utility.module");
const master_data_source_service_1 = require("../../libs/db/master-data-source.service");
const project_entity_1 = require("../../libs/db/entities/project.entity");
const work_position_entity_1 = require("../../libs/db/entities/work-position.entity");
const overview_admin_hub_controller_1 = require("./controllers/overview-admin-hub.controller");
const overview_service_1 = require("./services/overview.service");
const user_repository_1 = require("../user/repository/user.repository");
const jira_service_1 = require("../jira/services/jira.service");
const work_position_repository_1 = require("../work-position/repository/work-position.repository");
const project_repository_1 = require("../project/repository/project.repository");
const project_user_entity_1 = require("../../libs/db/entities/project-user.entity");
const user_activity_entity_1 = require("../../libs/db/entities/user-activity.entity");
const user_activity_repository_1 = require("../user/modules/user-activity/repository/user-activity.repository");
const user_activity_request_entity_1 = require("../../libs/db/entities/user-activity-request.entity");
const notification_entity_1 = require("../../libs/db/entities/notification.entity");
let OverviewModule = class OverviewModule {
};
exports.OverviewModule = OverviewModule;
exports.OverviewModule = OverviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, project_entity_1.ProjectEntity, work_position_entity_1.WorkPositionEntity, project_user_entity_1.ProjectUserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity, notification_entity_1.NotificationEntity]),
            emitter_module_1.EmitterModule,
            utility_module_1.UtilityModule
        ],
        controllers: [overview_admin_hub_controller_1.OverviewAdminHubController],
        providers: [overview_service_1.OverviewService, master_data_source_service_1.MasterDataSource, user_repository_1.UserRepository, jira_service_1.JiraService, work_position_repository_1.WorkPositionRepository, project_repository_1.ProjectRepository, user_activity_repository_1.UserActivityRepository],
        exports: [overview_service_1.OverviewService]
    })
], OverviewModule);
//# sourceMappingURL=overview.module.js.map