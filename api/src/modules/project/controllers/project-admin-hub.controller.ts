import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { ROUTE_ADMIN_HUB, ROUTE_PROJECT, API_TAG_PROJECT } from "src/utils/constants"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { UserGuard } from "src/utils/guards"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { ProjectDetailsResponse } from "../dtos/response/project-details.response"
import { ProjectMapper } from "../mappers/project.mapper"
import { ProjectService } from "../services/project.service"
import { ProjectOverviewPaginationFilterRequest } from "../dtos/request/project-overview-pagination-filter.request"
import { ProjectOverviewListResponse } from "../dtos/response/project-overview-list.response"
import { ProjectCreateRequest } from "../dtos/request/project-create.request"
import { ProjectPatchRequest } from "../dtos/request/project-patch.request"
import { ProjectDeleteRequest } from "../dtos/request/project-delete.request"

@Controller(`${ROUTE_ADMIN_HUB}/${ROUTE_PROJECT}`)
@ApiTags(API_TAG_PROJECT)
@ApiBearerAuth()
@UseGuards(UserGuard(UserRole.Admin, UserRole.Owner))
export class ProjectAdminHubController {
	constructor(private readonly projectService: ProjectService) {}

	@Get("/:projectId(\\d+)")
	@ApiOperation({ summary: "Return project by id", description: `This endpoint requires correct role.` })
	@ApiOkResponse({ description: "Project", type: ProjectDetailsResponse })
	@ApiNotFoundResponse({ description: "Project not found" })
	async getProject(@Param("projectId", ParseIntPipe) projectId: number): Promise<ProjectDetailsResponse> {
		const projectDetails = await this.projectService.getProject({
			id: projectId
		})
		return ProjectMapper.mapProjectDetails(projectDetails)
	}

	@Get("")
	@ApiOperation({ summary: "Returns overview list of projects", description: `This endpoint requires correct role.` })
	@ApiOkResponse({ description: "List of users projects", type: ProjectOverviewListResponse, isArray: true })
	@ApiNotFoundResponse({ description: "Project not found" })
	async getProjects(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Query() filter: ProjectOverviewPaginationFilterRequest) {
		const projectEntities = await this.projectService.getProjectList({
			userRole: authPassport.user.role,
			...filter
		})
		return ProjectMapper.mapProjectOverviewPaginationList(projectEntities.data, projectEntities.meta)
	}

	@Post()
	@ApiOperation({ summary: "Create project", description: `This endpoint requires the "Owner" or "Admin" role.` })
	@ApiCreatedResponse({ description: "Created project", type: ProjectDetailsResponse })
	async createProject(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Body() projectCreateRequest: ProjectCreateRequest
	): Promise<ProjectDetailsResponse> {
		const projectDetails = await this.projectService.createProject({
			...projectCreateRequest,
			createdByUserId: authPassport.user.id
		})
		return ProjectMapper.mapProjectDetails(projectDetails)
	}

	@Patch("/:projectId")
	@ApiOperation({ summary: "Update project", description: `This endpoint requires correct role.` })
	@ApiOkResponse({ description: "Updated project", type: ProjectDetailsResponse })
	@ApiNotFoundResponse({ description: "Project not found" })
	async updateProject(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("projectId", ParseIntPipe) projectId: number,
		@Body() projectPatchRequest: ProjectPatchRequest
	): Promise<ProjectDetailsResponse> {
		const projectDetails = await this.projectService.updateProject({
			id: projectId,
			updatedByUserId: authPassport.user.id,
			userRole: authPassport.user.role,
			...projectPatchRequest
		})
		return ProjectMapper.mapProjectDetails(projectDetails)
	}

	@Delete()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Delete project", description: `This endpoint requires the "Owner" or "Admin" role.` })
	@ApiNoContentResponse({ description: "Project/s deleted" })
	@ApiNotFoundResponse({ description: "Project not found" })
	async deleteProjects(@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest, @Query() projectDeleteRequest: ProjectDeleteRequest): Promise<void> {
		await this.projectService.deleteProjects({
			deletedByUserId: authPassport.user.id,
			...projectDeleteRequest
		})
	}
}
