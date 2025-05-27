import { IActivitySharedRequestCancelRequest, IInvokerMetadata } from "../../activity-shared/interfaces";
import { IActivityRequestPerformanceReviewCreateRequest } from "../interfaces/activity-request-performance-review-create.interface";
import { IActivityPerformanceReviewEntityEnriched } from "../interfaces/activity-request-performance-review-enriched.interface";
import { ActivityPerformanceReviewRepository } from "../repository/activity-performance-review.repository";
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service";
import { IActivityRequestPerformanceReviewUpdateRequest } from "../interfaces/activity-request-performance-rerview-update.interface";
import { ActivityPerformanceReviewValidationService } from "./activity-performance-review-validation.service";
import { UserPerformanceReviewService } from "../../../../user-performance-review/services/user-performance-review.service";
import { ActivityPerformanceReviewResponse } from "../dtos/response/activity-performance-review.response";
import { IActivityRequestPerformanceReviewListRequest } from "../interfaces/activity-request-performance-review-list.interface";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class ActivityPerformanceReviewService {
    private readonly activitySharedService;
    private readonly activityPerformanceReviewRepository;
    private readonly activitySharedRequestActionsService;
    private readonly activityPerformanceReviewValidationService;
    private readonly userPerformanceReviewService;
    constructor(activitySharedService: ActivitySharedService, activityPerformanceReviewRepository: ActivityPerformanceReviewRepository, activitySharedRequestActionsService: ActivitySharedRequestActionsService, activityPerformanceReviewValidationService: ActivityPerformanceReviewValidationService, userPerformanceReviewService: UserPerformanceReviewService);
    getActivityRequests(filters: IActivityRequestPerformanceReviewListRequest): Promise<ActivityPerformanceReviewResponse[]>;
    createActivityRequest(userInvoker: IInvokerMetadata, activityPerformanceReviewCreateRequest: IActivityRequestPerformanceReviewCreateRequest): Promise<IActivityPerformanceReviewEntityEnriched>;
    updateActivityRequest(userInvoker: IInvokerMetadata, activityRequestPerformanceReviewUpdateRequest: IActivityRequestPerformanceReviewUpdateRequest): Promise<IActivityPerformanceReviewEntityEnriched>;
    cancelActivityRequest(userInvoker: IInvokerMetadata, activityPerformanceReviewCancelRequest: IActivitySharedRequestCancelRequest): Promise<IActivityPerformanceReviewEntityEnriched>;
    enrichActivityRequest(userInvoker: number | UserEntity, activityRequest: UserActivityRequestEntity, subordinateIds?: number[]): Promise<IActivityPerformanceReviewEntityEnriched>;
}
