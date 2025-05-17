import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { API_TAG_WORK_POSITION, ROUTE_ADMIN_HUB, ROUTE_WORK_POSITION } from "src/utils/constants"
import { UserGuard } from "src/utils/guards"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { WorkPositionService } from "../services/work-position.service"
import { WorkPositionPaginationListResponse } from "../dtos/response/work-position-pagination-list.response"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { WorkPositionPaginationFilterRequest } from "../dtos/request/work-position-pagination-filter.request"
import { WorkPositionMapper } from "../mappers/work-position.mapper"
import { AuthJwtPassportUserDetails } from "src/utils/decorators"
import { WorkPositionListItemResponse } from "../dtos/response/work-position-list-item.response"
import { WorkPositionPatchRequest } from "../dtos/request/work-position-patch.request"
import { WorkPositionCreateRequest } from "../dtos/request/work-position-create.request"

@Controller(`/${ROUTE_ADMIN_HUB}/${ROUTE_WORK_POSITION}`)
@ApiTags(API_TAG_WORK_POSITION)
@ApiBearerAuth()
@UseGuards(UserGuard(UserRole.Admin, UserRole.Owner))
export class WorkPositionAdminHubController {
	constructor(private readonly workPositionService: WorkPositionService) {}

	@Get()
	@ApiOperation({ summary: "Returns list of work positions", description: `This endpoint requires the "Admin" or "SuperAdmin" role.` })
	@ApiOkResponse({ description: "Work positions", type: WorkPositionPaginationListResponse })
	async getWorkPositions(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Query() filter: WorkPositionPaginationFilterRequest
	): Promise<WorkPositionPaginationListResponse> {
		const workPositions = await this.workPositionService.getWorkPositions({
			userId: authPassport.user.id,
			...filter
		})
		return WorkPositionMapper.mapWorkPositionPaginationList(workPositions.data, workPositions.meta)
	}

	@Get("/:workPositionId")
	@UseGuards(UserGuard())
	@ApiOperation({ summary: "Returns work position by ID", description: `This endpoint requires correct role.` })
	@ApiOkResponse({ description: "Work position", type: WorkPositionListItemResponse })
	async getWorkPosition(@Param("workPositionId", ParseIntPipe) workPositionId: number): Promise<WorkPositionListItemResponse> {
		const workPositionEntity = await this.workPositionService.getWorkPosition(workPositionId)
		return WorkPositionMapper.mapWorkPositionListItem(workPositionEntity)
	}

	@Post()
	@ApiOperation({ summary: "[Admin] Create work position", description: `This endpoint requires the "Admin" or "SuperAdmin" role.` })
	@ApiCreatedResponse({ description: "Created work position", type: WorkPositionListItemResponse })
	async createWorkPosition(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Body() workPositionCreateRequest: WorkPositionCreateRequest
	): Promise<WorkPositionListItemResponse> {
		const workPositionEntity = await this.workPositionService.createWorkPosition({
			...workPositionCreateRequest,
			createdByUserId: authPassport.user.id,
			updatedByUserId: authPassport.user.id
		})
		return WorkPositionMapper.mapWorkPositionListItem(workPositionEntity)
	}

	@Patch("/:workPositionId")
	@ApiOperation({ summary: "[Admin] Update work position", description: `This endpoint requires the "Admin" or "SuperAdmin" role.` })
	@ApiOkResponse({ description: "Updated work position", type: WorkPositionListItemResponse })
	async patchWorkPosition(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("workPositionId", ParseIntPipe) workPositionId: number,
		@Body() workPositionPatchRequest: WorkPositionPatchRequest
	): Promise<WorkPositionListItemResponse> {
		const workPositionEntity = await this.workPositionService.patchWorkPosition({
			...workPositionPatchRequest,
			id: workPositionId,
			updatedByUserId: authPassport.user.id
		})
		return WorkPositionMapper.mapWorkPositionListItem(workPositionEntity)
	}

	@Delete("/:workPositionId")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Delete work position" })
	@ApiOkResponse({ description: "Deleted work position" })
	@ApiNotFoundResponse({ description: "Work position not found" })
	async deleteWorkspaceWorkPosition(
		@AuthJwtPassportUserDetails() authPassport: IAuthJwtPassportUserRequest,
		@Param("workPositionId", ParseIntPipe) workPositionId: number
	): Promise<void> {
		await this.workPositionService.deleteWorkPosition({
			id: workPositionId,
			userId: authPassport.user.id
		})
	}
}
