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
exports.TeamUserHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const guards_1 = require("../../../utils/guards");
const team_service_1 = require("../services/team.service");
const team_dto_1 = require("../dtos/team.dto");
const team_mapper_1 = require("../mappers/team.mapper");
let TeamUserHubController = class TeamUserHubController {
    teamService;
    constructor(teamService) {
        this.teamService = teamService;
    }
    async getTeam(teamId) {
        const teamEntity = await this.teamService.getOneTeam(teamId);
        return team_mapper_1.TeamMapper.mapTeamListItem(teamEntity);
    }
};
exports.TeamUserHubController = TeamUserHubController;
__decorate([
    (0, common_1.Get)("/:teamId"),
    (0, swagger_1.ApiOperation)({ summary: "Return team by id", description: `This endpoint requires correct role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Team", type: team_dto_1.TeamDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Team not found" }),
    __param(0, (0, common_1.Param)("teamId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamUserHubController.prototype, "getTeam", null);
exports.TeamUserHubController = TeamUserHubController = __decorate([
    (0, swagger_1.ApiTags)("Teams"),
    (0, common_1.Controller)(`${constants_1.ROUTE_USER_HUB}/teams`),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)()),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamUserHubController);
//# sourceMappingURL=team-user-hub.controller.js.map