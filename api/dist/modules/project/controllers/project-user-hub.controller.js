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
exports.ProjectUserHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const guards_1 = require("../../../utils/guards");
const project_service_1 = require("../services/project.service");
const decorators_1 = require("../../../utils/decorators");
const project_details_response_1 = require("../dtos/response/project-details.response");
const project_mapper_1 = require("../mappers/project.mapper");
const user_manager_guard_1 = require("../../../utils/guards/user-manager.guard");
const project_overview_pagination_filter_request_1 = require("../dtos/request/project-overview-pagination-filter.request");
const project_overview_list_response_1 = require("../dtos/response/project-overview-list.response");
let ProjectUserHubController = class ProjectUserHubController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getProject(authPassport, projectId) {
        let projectDetails = await this.projectService.getProject({
            id: projectId
        });
        projectDetails = this.projectService.filterProjectForUserHub(projectDetails, authPassport.user);
        return project_mapper_1.ProjectMapper.mapProjectDetails(projectDetails);
    }
    async getProjects(authPassport, filter) {
        const projectEntities = await this.projectService.getProjectList({
            userRole: authPassport.user.role,
            ...filter
        });
        return project_mapper_1.ProjectMapper.mapProjectOverviewPaginationList(projectEntities.data, projectEntities.meta);
    }
};
exports.ProjectUserHubController = ProjectUserHubController;
__decorate([
    (0, common_1.Get)("/:projectId(\\d+)"),
    (0, swagger_1.ApiOperation)({ summary: "Return project by id", description: `This endpoint requires correct role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Project", type: project_details_response_1.ProjectDetailsResponse }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Project not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("projectId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectUserHubController.prototype, "getProject", null);
__decorate([
    (0, common_1.Get)(""),
    (0, common_1.UseGuards)(user_manager_guard_1.UserManagerGuard),
    (0, swagger_1.ApiOperation)({ summary: "Returns overview list of projects", description: `This endpoint requires supervisor role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "List of users projects", type: project_overview_list_response_1.ProjectOverviewListResponse, isArray: true }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Project not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_overview_pagination_filter_request_1.ProjectOverviewPaginationFilterRequest]),
    __metadata("design:returntype", Promise)
], ProjectUserHubController.prototype, "getProjects", null);
exports.ProjectUserHubController = ProjectUserHubController = __decorate([
    (0, common_1.Controller)(`${constants_1.ROUTE_USER_HUB}/${constants_1.ROUTE_PROJECT}`),
    (0, swagger_1.ApiTags)(constants_1.API_TAG_PROJECT),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)()),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectUserHubController);
//# sourceMappingURL=project-user-hub.controller.js.map