import { TeamEntity } from "src/libs/db/entities/team.entity";
import { TeamRepository } from "../repository/team.repository";
import { GetTeamsQuery } from "../dtos/request/request-team.dto";
import { CreateTeamDto, UpdateTeamDto } from "../dtos/team.dto";
import { IPaginatedResponse } from "src/utils/types/interfaces";
export declare class TeamService {
    private teamRepository;
    constructor(teamRepository: TeamRepository);
    createTeam(createTeam: CreateTeamDto): Promise<TeamEntity>;
    updateTeam(teamId: number, updateTeam: UpdateTeamDto): Promise<TeamEntity>;
    getTeams(query: GetTeamsQuery): Promise<IPaginatedResponse<TeamEntity>>;
    getOneTeam(teamId: number): Promise<TeamEntity>;
}
