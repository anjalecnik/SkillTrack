import { TeamEntity } from "src/libs/db/entities/team.entity";
import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { IPaginatedResponse } from "src/utils/types/interfaces";
import { TeamDto } from "../dtos/team.dto";
import { TeamDetailsResponse } from "../dtos/team-details.response";
export declare abstract class TeamMapper {
    static mapTeamPaginationList(teamEntities: TeamEntity[], meta: PaginatedMetaResponse): IPaginatedResponse<TeamDto>;
    static mapTeamListItem(teamEntity: TeamEntity): TeamDto;
    static mapTeamDetails(teamEntity: TeamEntity): TeamDetailsResponse;
}
