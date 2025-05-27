"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const emitter_module_1 = require("../../libs/emitters/emitter.module");
const user_address_module_1 = require("./modules/user-address/user-address.module");
const user_assigned_vacation_module_1 = require("./modules/user-assigned-vacation/user-assigned-vacation.module");
const user_admin_hub_controller_1 = require("./controllers/user-admin-hub.controller");
const user_user_hub_controller_1 = require("./controllers/user-user-hub.controller");
const user_repository_1 = require("./repository/user.repository");
const user_service_1 = require("./services/user.service");
const user_entity_1 = require("../../libs/db/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const utility_module_1 = require("../utility/utility.module");
const project_user_entity_1 = require("../../libs/db/entities/project-user.entity");
const master_data_source_service_1 = require("../../libs/db/master-data-source.service");
const user_working_hours_module_1 = require("./modules/user-working-hours/user-working-hours.module");
const user_activity_module_1 = require("./modules/user-activity/modules/user-activity.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, project_user_entity_1.ProjectUserEntity]),
            emitter_module_1.EmitterModule,
            utility_module_1.UtilityModule,
            user_address_module_1.UserAddressModule,
            user_assigned_vacation_module_1.UserAssignedVacationModule,
            user_working_hours_module_1.UserWorkingHoursModule,
            user_activity_module_1.UserActivityModule
        ],
        controllers: [user_user_hub_controller_1.UserUserHubController, user_admin_hub_controller_1.UserAdminHubController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, master_data_source_service_1.MasterDataSource],
        exports: [user_service_1.UserService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map