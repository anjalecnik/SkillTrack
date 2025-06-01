import { WorkPositionRepository } from "../repository/work-position.repository";
import { IWorkPositionCreateRequest, IWorkPositionDeleteRequest, IWorkPositionPaginationFilterRequest, IWorkPositionPatchRequest } from "../interfaces";
import { IPaginatedResponse } from "src/utils/types/interfaces";
import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity";
export declare class WorkPositionService {
    private readonly workPositionRepository;
    constructor(workPositionRepository: WorkPositionRepository);
    getWorkPositions(filters: IWorkPositionPaginationFilterRequest): Promise<IPaginatedResponse<WorkPositionEntity>>;
    getWorkPosition(workPositionId: number): Promise<WorkPositionEntity>;
    createWorkPosition(workPositionCreateRequest: IWorkPositionCreateRequest): Promise<WorkPositionEntity>;
    patchWorkPosition(workPositionPatchRequest: IWorkPositionPatchRequest): Promise<WorkPositionEntity>;
    deleteWorkPosition(workPositionDeleteRequest: IWorkPositionDeleteRequest): Promise<void>;
    private validateWorkPositionExistOrThrow;
    private validateWorkPositionNotAssignedOrThrow;
    private validateWorkPositionNotPromotionOrThrow;
}
