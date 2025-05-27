import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity";
import { ProjectEntity } from "src/libs/db/entities/project.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
import { IPaginatedResponse } from "src/utils/types/interfaces";
import { Repository } from "typeorm";
import { IProjectGetDBRequest, IProjectOverviewPaginationFilterDBRequest, IProjectCreateDBRequest, IProjectDetailsDBResponse, IProjectPatchDBRequest, IProjectDeleteDBRequest } from "../interfaces";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class ProjectRepository {
    private projectRepository;
    private projectUserRepository;
    private userActivityRepository;
    private readonly masterDataSource;
    constructor(projectRepository: Repository<ProjectEntity>, projectUserRepository: Repository<ProjectUserEntity>, userActivityRepository: Repository<UserActivityEntity>, masterDataSource: MasterDataSource);
    getProjectOrThrow(ProjectGetDBRequest: IProjectGetDBRequest): Promise<ProjectEntity>;
    getProjectList(filters: IProjectOverviewPaginationFilterDBRequest): Promise<IPaginatedResponse<ProjectEntity>>;
    createProject(projectCreateDBRequest: IProjectCreateDBRequest, dateStart: Date): Promise<IProjectDetailsDBResponse>;
    updateProject(projectPatchDBRequest: IProjectPatchDBRequest): Promise<IProjectDetailsDBResponse>;
    softDeleteProjects(projectDeleteDBRequest: IProjectDeleteDBRequest): Promise<void>;
    getProjectLeads(projectId: number): Promise<UserEntity[]>;
    getProjectParticipants(projectId: number): Promise<UserEntity[]>;
    calculateProjectTotalHours(projectId: number): Promise<number>;
    private getProjectDetails;
    private getStatusesQuery;
    private setOrder;
}
