import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { ProjectDetailsResponse } from "../dtos/response/project-details.response";
import { ProjectService } from "../services/project.service";
import { ProjectOverviewPaginationFilterRequest } from "../dtos/request/project-overview-pagination-filter.request";
import { ProjectCreateRequest } from "../dtos/request/project-create.request";
import { ProjectPatchRequest } from "../dtos/request/project-patch.request";
import { ProjectDeleteRequest } from "../dtos/request/project-delete.request";
export declare class ProjectAdminHubController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    getProject(projectId: number): Promise<ProjectDetailsResponse>;
    getProjects(authPassport: IAuthJwtPassportUserRequest, filter: ProjectOverviewPaginationFilterRequest): Promise<import("../../../utils/types/interfaces").IPaginatedResponse<import("../dtos/response/project-overview-list-item.response").ProjectOverviewListItemResponse>>;
    createProject(authPassport: IAuthJwtPassportUserRequest, projectCreateRequest: ProjectCreateRequest): Promise<ProjectDetailsResponse>;
    updateProject(authPassport: IAuthJwtPassportUserRequest, projectId: number, projectPatchRequest: ProjectPatchRequest): Promise<ProjectDetailsResponse>;
    deleteProjects(authPassport: IAuthJwtPassportUserRequest, projectDeleteRequest: ProjectDeleteRequest): Promise<void>;
}
