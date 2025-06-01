import { UserAssignedVacationService } from "../../../../user-assigned-vacation/services/user-assigned-vacation.service";
import { IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service";
import { IActivityRequestVacationCreateRequest, IActivityRequestVacationEntityEnriched, IActivityVacationCreateDBRequest } from "../interfaces";
import { ActivityVacationRepository } from "../repository/activity-vacation.repository";
import { ActivityVacationValidationService } from "./activity-vacation-validation.service";
import { IInvokerMetadata } from "../../activity-shared/interfaces";
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class ActivityVacationService {
    private readonly activitySharedService;
    private readonly activityVacationRepository;
    private readonly activityVacationValidationService;
    private readonly userAssignedVacationService;
    private readonly activitySharedRequestActionsService;
    constructor(activitySharedService: ActivitySharedService, activityVacationRepository: ActivityVacationRepository, activityVacationValidationService: ActivityVacationValidationService, userAssignedVacationService: UserAssignedVacationService, activitySharedRequestActionsService: ActivitySharedRequestActionsService);
    createActivityRequest(userInvoker: IInvokerMetadata, activityVacationCreateRequest: IActivityRequestVacationCreateRequest): Promise<IActivityRequestVacationEntityEnriched>;
    cancelActivityRequest(userInvoker: IInvokerMetadata, activityVacationCancelRequest: IActivitySharedRequestCancelRequest): Promise<IActivityRequestVacationEntityEnriched>;
    reviewActivityRequest(userInvoker: IAuthJwtPassportUserRequest, activityVacationReviewRequest: IActivitySharedRequestReviewRequest): Promise<IActivityRequestVacationEntityEnriched>;
    enrichActivityRequest(userInvoker: number | UserEntity, activityRequest: UserActivityRequestEntity, subordinateIds?: number[]): Promise<IActivityRequestVacationEntityEnriched>;
    linkVacationToAssignedVacation(activityVacationCreateRequest: IActivityRequestVacationCreateRequest, dates: Date[]): Promise<IActivityVacationCreateDBRequest[]>;
    private getCurrentAndPreviousAssignedVacations;
    private getLeftover;
}
