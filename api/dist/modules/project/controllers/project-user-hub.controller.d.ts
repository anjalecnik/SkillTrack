import { ProjectService } from "../services/project.service";
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { ProjectDetailsResponse } from "../dtos/response/project-details.response";
import { ProjectOverviewPaginationFilterRequest } from "../dtos/request/project-overview-pagination-filter.request";
export declare class ProjectUserHubController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    getProject(authPassport: IAuthJwtPassportUserRequest, projectId: number): Promise<ProjectDetailsResponse>;
    getProjects(authPassport: IAuthJwtPassportUserRequest, filter: ProjectOverviewPaginationFilterRequest): Promise<import("../../../utils/types/interfaces").IPaginatedResponse<import("../dtos/response/project-overview-list-item.response").ProjectOverviewListItemResponse>>;
}
