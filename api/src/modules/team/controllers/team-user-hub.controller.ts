import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common"
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ROUTE_USER_HUB } from "src/utils/constants"
import { UserGuard } from "src/utils/guards"
import { TeamService } from "../services/team.service"
import { TeamDto } from "../dtos/team.dto"
import { TeamMapper } from "../mappers/team.mapper"

@ApiTags("Teams")
@Controller(`${ROUTE_USER_HUB}/teams`)
@UseGuards(UserGuard())
export class TeamUserHubController {
	constructor(private teamService: TeamService) {}

	@Get("/:teamId")
	@ApiOperation({ summary: "Return team by id", description: `This endpoint requires correct role.` })
	@ApiOkResponse({ description: "Team", type: TeamDto })
	@ApiNotFoundResponse({ description: "Team not found" })
	async getTeam(@Param("teamId", ParseIntPipe) teamId: number): Promise<TeamDto> {
		const teamEntity = await this.teamService.getOneTeam(teamId)
		return TeamMapper.mapTeamListItem(teamEntity)
	}
}
