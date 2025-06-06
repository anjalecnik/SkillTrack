import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { API_TAG_PROJECT, ROUTE_PROJECT, ROUTE_USER_HUB } from "src/utils/constants"
import { UserGuard } from "src/utils/guards"
import { ProjectService } from "../services/project.service"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { ProjectDetailsResponse } from "../dtos/response/project-details.response"
import { ProjectMapper } from "../mappers/project.mapper"
import { UserManagerGuard } from "src/utils/guards/user-manager.guard"
import { ProjectOverviewPaginationFilterRequest } from "../dtos/request/project-overview-pagination-filter.request"
import { ProjectOverviewListResponse } from "../dtos/response/project-overview-list.response"

@Controller(`${ROUTE_USER_HUB}/${ROUTE_PROJECT}`)
@ApiTags(API_TAG_PROJECT)
@ApiBearerAuth()
@UseGuards(UserGuard())
export class ProjectUserHubController {
	constructor(private readonly projectService: ProjectService) {}

	@Get("/:projectId(\\d+)")
	@ApiOperation({ summary: "Return project by id", description: `This endpoint requires correct role.` })
	@ApiOkResponse({ description: "Project", type: ProjectDetailsResponse })
	@ApiNotFoundResponse({ description: "Project not found" })
	async getProject(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Param("projectId", ParseIntPipe) projectId: number): Promise<ProjectDetailsResponse> {
		let projectDetails = await this.projectService.getProject({
			id: projectId
		})
		projectDetails = this.projectService.filterProjectForUserHub(projectDetails, authPassport.user)
		return ProjectMapper.mapProjectDetails(projectDetails)
	}

	@Get("")
	@ApiOperation({ summary: "Returns overview list of projects", description: `This endpoint requires supervisor role.` })
	@ApiOkResponse({ description: "List of users projects", type: ProjectOverviewListResponse, isArray: true })
	@ApiNotFoundResponse({ description: "Project not found" })
	async getProjects(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,

		@Query() filter: ProjectOverviewPaginationFilterRequest
	) {
		const projectEntities = await this.projectService.getProjectList({
			userRole: authPassport.user.role,
			...filter
		})
		return ProjectMapper.mapProjectOverviewPaginationList(projectEntities.data, projectEntities.meta)
	}
}
