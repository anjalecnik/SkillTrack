import { IActivitySharedRequestCancelRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service";
import { IActivityRequestDailyCreateDBRequest, IActivityRequestDailyUpdateRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
export declare class ActivityDailyValidationService {
    private readonly activitySharedService;
    private readonly activitySharedValidationService;
    constructor(activitySharedService: ActivitySharedService, activitySharedValidationService: ActivitySharedValidationService);
    getExistingActivityRequests(activityRequest: IActivityRequestDailyCreateDBRequest): Promise<UserActivityRequestEntity[]>;
    preCreateSaveValidation(activityRequest: IActivityRequestDailyCreateDBRequest): Promise<void>;
    preUpdateTransformValidation(bulkActivityRequestDailyUpdate: IActivityRequestDailyUpdateRequest): Promise<UserActivityRequestEntity>;
    preCancelTransformValidation(activityDailyRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity>;
    private validateUpdate;
}
