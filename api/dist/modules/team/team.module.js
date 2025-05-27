"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const team_user_hub_controller_1 = require("./controllers/team-user-hub.controller");
const team_repository_1 = require("./repository/team.repository");
const team_service_1 = require("./services/team.service");
const team_admin_hub_controller_1 = require("./controllers/team-admin-hub.controller");
const typeorm_1 = require("@nestjs/typeorm");
const team_entity_1 = require("../../libs/db/entities/team.entity");
let TeamModule = class TeamModule {
};
exports.TeamModule = TeamModule;
exports.TeamModule = TeamModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([team_entity_1.TeamEntity])],
        controllers: [team_user_hub_controller_1.TeamUserHubController, team_admin_hub_controller_1.TeamAdminHubController],
        providers: [team_service_1.TeamService, team_repository_1.TeamRepository]
    })
], TeamModule);
//# sourceMappingURL=team.module.js.map