import { IActivitySharedRequestCancelDBRequest, IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewDBRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service";
import { ActivitySharedValidationCollisionService } from "../../activity-shared/services/activity-shared-validation-collision.service";
import { IActivityRequestVacationCreateDBRequest, IActivityVacationCreateDBRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
export declare class ActivityVacationValidationService {
    private readonly activitySharedService;
    private readonly activitySharedValidationService;
    private readonly activitySharedValidationCollisionService;
    constructor(activitySharedService: ActivitySharedService, activitySharedValidationService: ActivitySharedValidationService, activitySharedValidationCollisionService: ActivitySharedValidationCollisionService);
    preCreateSaveValidation(activityRequest: IActivityRequestVacationCreateDBRequest, activities: IActivityVacationCreateDBRequest[]): Promise<void>;
    preCancelTransformValidation(activityVacationCancelRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity>;
    preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void;
    preReviewTransformValidation(activityVacationReviewRequest: IActivitySharedRequestReviewRequest): Promise<UserActivityRequestEntity>;
    preReviewSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestReviewDBRequest): void;
}
