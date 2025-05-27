import { TeamDto } from "../dtos/team.dto";
import { TeamService } from "../services/team.service";
import { TeamListDto } from "../dtos/response/response-team.dto";
import { GetTeamsQuery } from "../dtos/request/request-team.dto";
export declare class TeamAdminHubController {
    private teamService;
    constructor(teamService: TeamService);
    getTeam(teamId: number): Promise<TeamDto>;
    getWorkspace(params: GetTeamsQuery): Promise<TeamListDto>;
}
