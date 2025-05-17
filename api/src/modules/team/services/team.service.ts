import { Injectable } from "@nestjs/common"
import { TeamEntity } from "src/libs/db/entities/team.entity"
import { TeamRepository } from "../repository/team.repository"
import { GetTeamsQuery } from "../dtos/request/request-team.dto"
import { CreateTeamDto, UpdateTeamDto } from "../dtos/team.dto"
import { IPaginatedResponse } from "src/utils/types/interfaces"

@Injectable()
export class TeamService {
	constructor(private teamRepository: TeamRepository) {}

	async createTeam(createTeam: CreateTeamDto): Promise<TeamEntity> {
		return this.teamRepository.save(createTeam)
	}

	async updateTeam(teamId: number, updateTeam: UpdateTeamDto): Promise<TeamEntity> {
		return this.teamRepository.update(teamId, {
			...updateTeam
		})
	}

	async getTeams(query: GetTeamsQuery): Promise<IPaginatedResponse<TeamEntity>> {
		return this.teamRepository.getTeams(query)
	}

	async getOneTeam(teamId: number): Promise<TeamEntity> {
		return this.teamRepository.findOneOrFail(teamId)
	}
}
