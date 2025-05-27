import { IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service";
import { IActivityRequestExpenseCreateRequest, IActivityRequestExpenseEntityEnriched } from "../interfaces";
import { ActivityExpenseRepository } from "../repository/activity-expense.repository";
import { ActivityExpenseValidationService } from "./activity-expense-validation.service";
import { IInvokerMetadata } from "../../activity-shared/interfaces";
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class ActivityExpenseService {
    private readonly activitySharedService;
    private readonly activityExpenseRepository;
    private readonly activityExpenseValidationService;
    private readonly activitySharedRequestActionsService;
    constructor(activitySharedService: ActivitySharedService, activityExpenseRepository: ActivityExpenseRepository, activityExpenseValidationService: ActivityExpenseValidationService, activitySharedRequestActionsService: ActivitySharedRequestActionsService);
    createActivityRequest(userInvoker: IInvokerMetadata, activityExpenseCreateRequest: IActivityRequestExpenseCreateRequest): Promise<IActivityRequestExpenseEntityEnriched>;
    cancelActivityRequest(userInvoker: IInvokerMetadata, activityExpenseCancelRequest: IActivitySharedRequestCancelRequest): Promise<IActivityRequestExpenseEntityEnriched>;
    reviewActivityRequest(userInvoker: IAuthJwtPassportUserRequest, activityExpenseReviewRequest: IActivitySharedRequestReviewRequest): Promise<IActivityRequestExpenseEntityEnriched>;
    enrichActivityRequest(userInvoker: number | UserEntity, activityRequest: UserActivityRequestEntity, subordinateIds?: number[]): Promise<IActivityRequestExpenseEntityEnriched>;
}
