import { TeamEntity } from "src/libs/db/entities/team.entity"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { TeamDto } from "../dtos/team.dto"
import { TeamDetailsResponse } from "../dtos/team-details.response"

export abstract class TeamMapper {
	static mapTeamPaginationList(teamEntities: TeamEntity[], meta: PaginatedMetaResponse): IPaginatedResponse<TeamDto> {
		return {
			meta,
			data: teamEntities.map(team => this.mapTeamListItem(team))
		}
	}

	static mapTeamListItem(teamEntity: TeamEntity): TeamDto {
		return {
			id: teamEntity.id,
			name: teamEntity.name,
			description: teamEntity.description,
			createdBy: teamEntity.createdBy,
			modifiedBy: teamEntity.modifiedBy
		}
	}

	static mapTeamDetails(teamEntity: TeamEntity): TeamDetailsResponse {
		return {
			id: teamEntity.id,
			name: teamEntity.name,
			description: teamEntity.description
		}
	}
}
