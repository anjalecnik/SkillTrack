import { PaginationPropsRequest } from "src/utils/types/dtos";
import { ProjectStatus } from "src/utils/types/enums/project-status.enum";
export declare const sortingFieldProjectValidationArray: readonly ["id", "name", "dateStart", "dateEnd"];
export type ISortingFieldProject = (typeof sortingFieldProjectValidationArray)[number];
export interface IProjectOverviewPaginationFilterDBRequest extends PaginationPropsRequest {
    ids?: number[];
    name?: string;
    statuses?: ProjectStatus[];
    sort?: ISortingFieldProject;
    metadata?: boolean;
    userIds?: number[];
}
