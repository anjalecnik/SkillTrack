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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const team_repository_1 = require("../repository/team.repository");
let TeamService = class TeamService {
    teamRepository;
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    async createTeam(createTeam) {
        return this.teamRepository.save(createTeam);
    }
    async updateTeam(teamId, updateTeam) {
        return this.teamRepository.update(teamId, {
            ...updateTeam
        });
    }
    async getTeams(query) {
        return this.teamRepository.getTeams(query);
    }
    async getOneTeam(teamId) {
        return this.teamRepository.findOneOrFail(teamId);
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_repository_1.TeamRepository])
], TeamService);
//# sourceMappingURL=team.service.js.map