import { IActivitySharedRequestCancelDBRequest, IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewDBRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service";
import { IActivityRequestBusinessTripDB } from "../interfaces/db/activity-request-business-trip-db.interface";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
export declare class ActivityBusinessTripValidationService {
    private readonly activitySharedService;
    private readonly activitySharedValidationService;
    constructor(activitySharedService: ActivitySharedService, activitySharedValidationService: ActivitySharedValidationService);
    preCancelTransformValidation(activityBusinessTripCancelRequest: IActivitySharedRequestCancelRequest): Promise<IActivityRequestBusinessTripDB>;
    preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void;
    preReviewTransformValidation(activityBusinessTripReviewRequest: IActivitySharedRequestReviewRequest): Promise<IActivityRequestBusinessTripDB>;
    preReviewSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestReviewDBRequest): void;
}
