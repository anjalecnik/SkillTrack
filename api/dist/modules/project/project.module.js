"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const project_entity_1 = require("../../libs/db/entities/project.entity");
const user_repository_1 = require("../user/repository/user.repository");
const project_admin_hub_controller_1 = require("./controllers/project-admin-hub.controller");
const project_user_hub_controller_1 = require("./controllers/project-user-hub.controller");
const project_repository_1 = require("./repository/project.repository");
const project_service_1 = require("./services/project.service");
const user_entity_1 = require("../../libs/db/entities/user.entity");
const project_user_entity_1 = require("../../libs/db/entities/project-user.entity");
const user_activity_entity_1 = require("../../libs/db/entities/user-activity.entity");
const master_data_source_service_1 = require("../../libs/db/master-data-source.service");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectEntity, user_entity_1.UserEntity, project_user_entity_1.ProjectUserEntity, user_activity_entity_1.UserActivityEntity])],
        controllers: [project_user_hub_controller_1.ProjectUserHubController, project_admin_hub_controller_1.ProjectAdminHubController],
        providers: [project_service_1.ProjectService, project_repository_1.ProjectRepository, user_repository_1.UserRepository, master_data_source_service_1.MasterDataSource],
        exports: [project_repository_1.ProjectRepository]
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map