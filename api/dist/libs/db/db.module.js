"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const holiday_entity_1 = require("./entities/holiday.entity");
const project_user_entity_1 = require("./entities/project-user.entity");
const project_entity_1 = require("./entities/project.entity");
const team_entity_1 = require("./entities/team.entity");
const user_address_entity_1 = require("./entities/user-address.entity");
const user_vacation_assigned_entity_1 = require("./entities/user-vacation-assigned.entity");
const user_entity_1 = require("./entities/user.entity");
const work_position_entity_1 = require("./entities/work-position.entity");
const app_config_module_1 = require("../../config/app-config.module");
const db_config_1 = require("./db.config");
let DbModule = class DbModule {
};
exports.DbModule = DbModule;
exports.DbModule = DbModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [app_config_module_1.AppConfigModule],
                useClass: db_config_1.TypeOrmConfigService
            }),
            typeorm_1.TypeOrmModule.forFeature([holiday_entity_1.HolidayEntity, project_user_entity_1.ProjectUserEntity, project_entity_1.ProjectEntity, team_entity_1.TeamEntity, user_address_entity_1.UserAddressEntity, user_vacation_assigned_entity_1.UserVacationAssignedEntity, user_entity_1.UserEntity, work_position_entity_1.WorkPositionEntity])
        ]
    })
], DbModule);
//# sourceMappingURL=db.module.js.map