import { IPaginatedResponse } from "src/utils/types/interfaces";
import { IProjectGetRequest, IProjectDetailsResponse, IProjectCreateRequest, IProjectOverviewPaginationFilterRequest, IProjectOverviewPaginationItemResponse, IProjectDeleteRequest, IProjectPatchRequest } from "../interfaces";
import { ProjectRepository } from "../repository/project.repository";
import { IAuthJwtPassportUserDataRequest } from "src/modules/auth/interfaces";
export declare class ProjectService {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    getProject(projectGetRequest: IProjectGetRequest): Promise<IProjectDetailsResponse>;
    getProjectList(filters: IProjectOverviewPaginationFilterRequest): Promise<IPaginatedResponse<IProjectOverviewPaginationItemResponse>>;
    createProject(projectCreateRequest: IProjectCreateRequest): Promise<IProjectDetailsResponse>;
    updateProject(projectPatchRequest: IProjectPatchRequest): Promise<IProjectDetailsResponse>;
    deleteProjects(projectDeleteRequest: IProjectDeleteRequest): Promise<void>;
    private enrichProjectData;
    private getProjectOverview;
    private getProjectDetails;
    private getProjectDBDetails;
    private getProjectStatus;
    private getProjectTotalDays;
    filterProjectForUserHub(projectDetails: IProjectDetailsResponse, authUser: IAuthJwtPassportUserDataRequest): IProjectDetailsResponse;
}
