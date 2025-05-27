"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamAdminHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const guards_1 = require("../../../utils/guards");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const team_dto_1 = require("../dtos/team.dto");
const team_service_1 = require("../services/team.service");
const team_mapper_1 = require("../mappers/team.mapper");
const response_team_dto_1 = require("../dtos/response/response-team.dto");
const request_team_dto_1 = require("../dtos/request/request-team.dto");
let TeamAdminHubController = class TeamAdminHubController {
    teamService;
    constructor(teamService) {
        this.teamService = teamService;
    }
    async getTeam(teamId) {
        const teamEntity = await this.teamService.getOneTeam(teamId);
        return team_mapper_1.TeamMapper.mapTeamListItem(teamEntity);
    }
    async getWorkspace(params) {
        const teamEntities = await this.teamService.getTeams({ ...params });
        return team_mapper_1.TeamMapper.mapTeamPaginationList(teamEntities.data, teamEntities.meta);
    }
};
exports.TeamAdminHubController = TeamAdminHubController;
__decorate([
    (0, common_1.Get)("/:teamId"),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)()),
    (0, swagger_1.ApiOperation)({ summary: "Return team by id", description: `This endpoint requires correct role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Team", type: team_dto_1.TeamDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Team not found" }),
    __param(0, (0, common_1.Param)("teamId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamAdminHubController.prototype, "getTeam", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "[Admin] Returns list of team", description: `This endpoint requires the "Admin" or "SuperAdmin" role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Team", type: response_team_dto_1.TeamListDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_team_dto_1.GetTeamsQuery]),
    __metadata("design:returntype", Promise)
], TeamAdminHubController.prototype, "getWorkspace", null);
exports.TeamAdminHubController = TeamAdminHubController = __decorate([
    (0, swagger_1.ApiTags)("Teams"),
    (0, common_1.Controller)(`${constants_1.ROUTE_ADMIN_HUB}/teams`),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner)),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamAdminHubController);
//# sourceMappingURL=team-admin-hub.controller.js.map