import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common"
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ROUTE_ADMIN_HUB } from "src/utils/constants"
import { UserGuard } from "src/utils/guards"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { TeamDto } from "../dtos/team.dto"
import { TeamService } from "../services/team.service"
import { TeamMapper } from "../mappers/team.mapper"
import { TeamListDto } from "../dtos/response/response-team.dto"
import { GetTeamsQuery } from "../dtos/request/request-team.dto"

@ApiTags("Teams")
@Controller(`${ROUTE_ADMIN_HUB}/teams`)
@UseGuards(UserGuard(UserRole.Admin, UserRole.Owner))
export class TeamAdminHubController {
	constructor(private teamService: TeamService) {}

	@Get("/:teamId")
	@UseGuards(UserGuard())
	@ApiOperation({ summary: "Return team by id", description: `This endpoint requires correct role.` })
	@ApiOkResponse({ description: "Team", type: TeamDto })
	@ApiNotFoundResponse({ description: "Team not found" })
	async getTeam(@Param("teamId", ParseIntPipe) teamId: number): Promise<TeamDto> {
		const teamEntity = await this.teamService.getOneTeam(teamId)
		return TeamMapper.mapTeamListItem(teamEntity)
	}

	@Get()
	@ApiOperation({ summary: "[Admin] Returns list of team", description: `This endpoint requires the "Admin" or "SuperAdmin" role.` })
	@ApiOkResponse({ description: "Team", type: TeamListDto })
	async getWorkspace(@Query() params: GetTeamsQuery): Promise<TeamListDto> {
		const teamEntities = await this.teamService.getTeams({ ...params })
		return TeamMapper.mapTeamPaginationList(teamEntities.data, teamEntities.meta)
	}
}
