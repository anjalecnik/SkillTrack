import { IActivitySharedRequestCancelDBRequest, IActivitySharedRequestCancelRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service";
import { ActivitySharedValidationCollisionService } from "../../activity-shared/services/activity-shared-validation-collision.service";
import { IActivityRequestSickLeaveCreateDBRequest, IActivityRequestSickLeaveCreateRequest, IActivitySickLeaveCreateDBRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
export declare class ActivitySickLeaveValidationService {
    private readonly activitySharedService;
    private readonly activitySharedValidationService;
    private readonly activitySharedValidationCollisionService;
    constructor(activitySharedService: ActivitySharedService, activitySharedValidationService: ActivitySharedValidationService, activitySharedValidationCollisionService: ActivitySharedValidationCollisionService);
    preCreateTransformValidation(activitySickLeaveCreateRequest: IActivityRequestSickLeaveCreateRequest): Promise<void>;
    preCreateSaveValidation(activityRequest: IActivityRequestSickLeaveCreateDBRequest, activities: IActivitySickLeaveCreateDBRequest[]): Promise<void>;
    preCancelTransformValidation(activitySickLeaveCancelRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity>;
    preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void;
    private validateDates;
}
