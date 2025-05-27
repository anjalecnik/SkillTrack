import { WorkPositionService } from "../services/work-position.service";
import { WorkPositionPaginationListResponse } from "../dtos/response/work-position-pagination-list.response";
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { WorkPositionPaginationFilterRequest } from "../dtos/request/work-position-pagination-filter.request";
import { WorkPositionListItemResponse } from "../dtos/response/work-position-list-item.response";
import { WorkPositionPatchRequest } from "../dtos/request/work-position-patch.request";
import { WorkPositionCreateRequest } from "../dtos/request/work-position-create.request";
export declare class WorkPositionAdminHubController {
    private readonly workPositionService;
    constructor(workPositionService: WorkPositionService);
    getWorkPositions(authPassport: IAuthJwtPassportUserRequest, filter: WorkPositionPaginationFilterRequest): Promise<WorkPositionPaginationListResponse>;
    getWorkPosition(workPositionId: number): Promise<WorkPositionListItemResponse>;
    createWorkPosition(authPassport: IAuthJwtPassportUserRequest, workPositionCreateRequest: WorkPositionCreateRequest): Promise<WorkPositionListItemResponse>;
    patchWorkPosition(authPassport: IAuthJwtPassportUserRequest, workPositionId: number, workPositionPatchRequest: WorkPositionPatchRequest): Promise<WorkPositionListItemResponse>;
    deleteWorkspaceWorkPosition(authPassport: IAuthJwtPassportUserRequest, workPositionId: number): Promise<void>;
}
