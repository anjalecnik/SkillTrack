import { IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service";
import { IActivityRequestSickLeaveCreateRequest, IActivityRequestSickLeaveEntityEnriched } from "../interfaces";
import { ActivitySickLeaveRepository } from "../repository/activity-sick-leave.repository";
import { ActivitySickLeaveValidationService } from "./activity-sick-leave-validation.service";
import { IInvokerMetadata } from "../../activity-shared/interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class ActivitySickLeaveService {
    private readonly activitySharedService;
    private readonly activitySickLeaveRepository;
    private readonly activitySickLeaveValidationService;
    private readonly activitySharedRequestActionsService;
    constructor(activitySharedService: ActivitySharedService, activitySickLeaveRepository: ActivitySickLeaveRepository, activitySickLeaveValidationService: ActivitySickLeaveValidationService, activitySharedRequestActionsService: ActivitySharedRequestActionsService);
    createActivityRequest(userInvoker: IInvokerMetadata, activitySickLeaveCreateRequest: IActivityRequestSickLeaveCreateRequest): Promise<IActivityRequestSickLeaveEntityEnriched>;
    cancelActivityRequest(userInvoker: IInvokerMetadata, activitySickLeaveCancelRequest: IActivitySharedRequestCancelRequest): Promise<IActivityRequestSickLeaveEntityEnriched>;
    reviewActivityRequest(_activityRequestReview: IActivitySharedRequestReviewRequest): never;
    enrichActivityRequest(userInvoker: number | UserEntity, activityRequest: UserActivityRequestEntity, subordinateIds?: number[]): Promise<IActivityRequestSickLeaveEntityEnriched>;
    calculateHours(activitySickLeaveCreateRequest: IActivityRequestSickLeaveCreateRequest): Promise<number>;
}
