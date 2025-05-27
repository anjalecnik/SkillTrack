import { IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service";
import { IActivityRequestBusinessTripCreateRequest, IActivityRequestBusinessTripEntityEnriched, IActivityRequestBusinessTripUpdateRequest } from "../interfaces";
import { ActivityBusinessTripRepository } from "../repository/activity-business-trip.repository";
import { ActivityBusinessTripValidationService } from "../services/activity-business-trip-validation.service";
import { IInvokerMetadata } from "../../activity-shared/interfaces";
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class ActivityBusinessTripService {
    private readonly activitySharedService;
    private readonly activityBusinessTripValidationService;
    private readonly activityBusinessTripRepository;
    private readonly activitySharedRequestActionsService;
    constructor(activitySharedService: ActivitySharedService, activityBusinessTripValidationService: ActivityBusinessTripValidationService, activityBusinessTripRepository: ActivityBusinessTripRepository, activitySharedRequestActionsService: ActivitySharedRequestActionsService);
    createActivityRequest(userInvoker: IInvokerMetadata, activityBusinessTripCreateRequest: IActivityRequestBusinessTripCreateRequest): Promise<IActivityRequestBusinessTripEntityEnriched>;
    updateActivityRequest(userInvoker: IInvokerMetadata, activityRequestBusinessTripUpdateRequest: IActivityRequestBusinessTripUpdateRequest): Promise<IActivityRequestBusinessTripEntityEnriched>;
    cancelActivityRequest(userInvoker: IInvokerMetadata, activityBusinessTripCancelRequest: IActivitySharedRequestCancelRequest): Promise<IActivityRequestBusinessTripEntityEnriched>;
    reviewActivityRequest(userInvoker: IAuthJwtPassportUserRequest, activityBusinessTripReviewRequest: IActivitySharedRequestReviewRequest): Promise<IActivityRequestBusinessTripEntityEnriched>;
    enrichActivityRequest(userInvoker: number | UserEntity, activityRequest: UserActivityRequestEntity, subordinateIds?: number[]): Promise<IActivityRequestBusinessTripEntityEnriched>;
    private getUpdateDates;
}
