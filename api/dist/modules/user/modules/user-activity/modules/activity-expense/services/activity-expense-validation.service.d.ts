import { IActivitySharedRequestCancelDBRequest, IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
export declare class ActivityExpenseValidationService {
    private readonly activitySharedService;
    private readonly activitySharedValidationService;
    constructor(activitySharedService: ActivitySharedService, activitySharedValidationService: ActivitySharedValidationService);
    preCancelTransformValidation(activityExpenseCancelRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity>;
    preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void;
    preReviewTransformValidation(activityExpenseReviewRequest: IActivitySharedRequestReviewRequest): Promise<UserActivityRequestEntity>;
}
