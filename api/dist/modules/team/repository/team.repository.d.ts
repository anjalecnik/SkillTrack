import { TeamEntity } from "src/libs/db/entities/team.entity";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { GetTeamsQuery } from "../dtos/request/request-team.dto";
import { IPaginatedResponse } from "src/utils/types/interfaces";
export declare class TeamRepository {
    private teamRepository;
    private dataSource;
    constructor(teamRepository: Repository<TeamEntity>, dataSource: DataSource);
    save(teamEntity: DeepPartial<TeamEntity>): Promise<TeamEntity>;
    update(teamId: number, teamEntity: DeepPartial<TeamEntity>): Promise<TeamEntity>;
    getTeams(filters: GetTeamsQuery): Promise<IPaginatedResponse<TeamEntity>>;
    findOneOrFail(userId: number): Promise<TeamEntity>;
    private getSortDir;
}
