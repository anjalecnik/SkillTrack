import { PaginationPropsRequest } from "src/utils/types/dtos";
import { ProjectStatus } from "src/utils/types/enums/project-status.enum";
import { ISortingFieldProject } from "../../interfaces";
export declare class ProjectOverviewPaginationFilterRequest extends PaginationPropsRequest {
    ids?: number[];
    name?: string;
    statuses?: ProjectStatus[];
    sort?: ISortingFieldProject;
    metadata?: boolean;
    userIds?: number[];
}
