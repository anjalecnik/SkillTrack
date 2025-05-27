import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity";
import { FindOptionsRelations, Repository } from "typeorm";
import { IWorkPositionCreateDBRequest, IWorkPositionPaginationFilterDBRequest, IWorkPositionPatchDBRequest } from "../interfaces";
import { IPaginatedResponse } from "src/utils/types/interfaces";
export declare const LOAD_RELATIONS: FindOptionsRelations<WorkPositionEntity>;
export declare class WorkPositionRepository {
    private workPositionRepository;
    constructor(workPositionRepository: Repository<WorkPositionEntity>);
    getWorkPositions(filters: IWorkPositionPaginationFilterDBRequest): Promise<IPaginatedResponse<WorkPositionEntity>>;
    getWorkPosition(id: number): Promise<WorkPositionEntity | null>;
    createWorkPosition(workPositionCreateDBRequest: IWorkPositionCreateDBRequest): Promise<WorkPositionEntity>;
    patchWorkPosition(workPositionPatchDBRequest: IWorkPositionPatchDBRequest): Promise<WorkPositionEntity>;
    deleteWorkPosition(id: number): Promise<void>;
    getWorkPositionPromotions(workPositionId: number): Promise<WorkPositionEntity[]>;
    isWorkPositionAssignedToUser(id: number): Promise<boolean>;
    private setOrder;
}
