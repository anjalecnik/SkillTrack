import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { ProjectOverviewListItemResponse } from "./project-overview-list-item.response";
export declare class ProjectOverviewListResponse {
    meta: PaginatedMetaResponse;
    data: ProjectOverviewListItemResponse[];
}
