import { TeamService } from "../services/team.service";
import { TeamDto } from "../dtos/team.dto";
export declare class TeamUserHubController {
    private teamService;
    constructor(teamService: TeamService);
    getTeam(teamId: number): Promise<TeamDto>;
}
