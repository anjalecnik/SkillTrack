"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAdminHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const decorators_1 = require("../../../utils/decorators");
const guards_1 = require("../../../utils/guards");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const project_details_response_1 = require("../dtos/response/project-details.response");
const project_mapper_1 = require("../mappers/project.mapper");
const project_service_1 = require("../services/project.service");
const project_overview_pagination_filter_request_1 = require("../dtos/request/project-overview-pagination-filter.request");
const project_overview_list_response_1 = require("../dtos/response/project-overview-list.response");
const project_create_request_1 = require("../dtos/request/project-create.request");
const project_patch_request_1 = require("../dtos/request/project-patch.request");
const project_delete_request_1 = require("../dtos/request/project-delete.request");
let ProjectAdminHubController = class ProjectAdminHubController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getProject(projectId) {
        const projectDetails = await this.projectService.getProject({
            id: projectId
        });
        return project_mapper_1.ProjectMapper.mapProjectDetails(projectDetails);
    }
    async getProjects(authPassport, filter) {
        const projectEntities = await this.projectService.getProjectList({
            userRole: authPassport.user.role,
            ...filter
        });
        return project_mapper_1.ProjectMapper.mapProjectOverviewPaginationList(projectEntities.data, projectEntities.meta);
    }
    async createProject(authPassport, projectCreateRequest) {
        const projectDetails = await this.projectService.createProject({
            ...projectCreateRequest,
            createdByUserId: authPassport.user.id
        });
        return project_mapper_1.ProjectMapper.mapProjectDetails(projectDetails);
    }
    async updateProject(authPassport, projectId, projectPatchRequest) {
        const projectDetails = await this.projectService.updateProject({
            id: projectId,
            updatedByUserId: authPassport.user.id,
            userRole: authPassport.user.role,
            ...projectPatchRequest
        });
        return project_mapper_1.ProjectMapper.mapProjectDetails(projectDetails);
    }
    async deleteProjects(authPassport, projectDeleteRequest) {
        await this.projectService.deleteProjects({
            deletedByUserId: authPassport.user.id,
            ...projectDeleteRequest
        });
    }
};
exports.ProjectAdminHubController = ProjectAdminHubController;
__decorate([
    (0, common_1.Get)("/:projectId(\\d+)"),
    (0, swagger_1.ApiOperation)({ summary: "Return project by id", description: `This endpoint requires correct role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Project", type: project_details_response_1.ProjectDetailsResponse }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Project not found" }),
    __param(0, (0, common_1.Param)("projectId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectAdminHubController.prototype, "getProject", null);
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiOperation)({ summary: "Returns overview list of projects", description: `This endpoint requires correct role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "List of users projects", type: project_overview_list_response_1.ProjectOverviewListResponse, isArray: true }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Project not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_overview_pagination_filter_request_1.ProjectOverviewPaginationFilterRequest]),
    __metadata("design:returntype", Promise)
], ProjectAdminHubController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create project", description: `This endpoint requires the "Owner" or "Admin" role.` }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Created project", type: project_details_response_1.ProjectDetailsResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_create_request_1.ProjectCreateRequest]),
    __metadata("design:returntype", Promise)
], ProjectAdminHubController.prototype, "createProject", null);
__decorate([
    (0, common_1.Patch)("/:projectId"),
    (0, swagger_1.ApiOperation)({ summary: "Update project", description: `This endpoint requires correct role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Updated project", type: project_details_response_1.ProjectDetailsResponse }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Project not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("projectId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, project_patch_request_1.ProjectPatchRequest]),
    __metadata("design:returntype", Promise)
], ProjectAdminHubController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Delete project", description: `This endpoint requires the "Owner" or "Admin" role.` }),
    (0, swagger_1.ApiNoContentResponse)({ description: "Project/s deleted" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Project not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_delete_request_1.ProjectDeleteRequest]),
    __metadata("design:returntype", Promise)
], ProjectAdminHubController.prototype, "deleteProjects", null);
exports.ProjectAdminHubController = ProjectAdminHubController = __decorate([
    (0, common_1.Controller)(`${constants_1.ROUTE_ADMIN_HUB}/${constants_1.ROUTE_PROJECT}`),
    (0, swagger_1.ApiTags)(constants_1.API_TAG_PROJECT),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner)),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectAdminHubController);
//# sourceMappingURL=project-admin-hub.controller.js.map