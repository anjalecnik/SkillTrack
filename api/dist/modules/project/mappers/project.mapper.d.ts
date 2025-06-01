import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { IPaginatedResponse } from "src/utils/types/interfaces";
import { ProjectDetailsResponse } from "../dtos/response/project-details.response";
import { IProjectDetailsResponse, IProjectOverviewPaginationItemResponse } from "../interfaces";
import { ProjectOverviewListItemResponse } from "../dtos/response/project-overview-list-item.response";
export declare abstract class ProjectMapper {
    static mapProjectDetails({ projectEntity, projectParticipantEntities, status, totalHours, totalDays }: IProjectDetailsResponse): ProjectDetailsResponse;
    static mapProjectOverviewPaginationList(projects: IProjectOverviewPaginationItemResponse[], meta: PaginatedMetaResponse): IPaginatedResponse<ProjectOverviewListItemResponse>;
    private static mapProjectParticipantShort;
    private static mapProjectOverviewListItem;
}
