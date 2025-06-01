import { IActivityRequestPerformanceReviewCreateRequest } from "../interfaces/activity-request-performance-review-create.interface";
import { IActivityRequestPerformanceReviewUpdateRequest } from "../interfaces/activity-request-performance-rerview-update.interface";
import { ActivitySharedHierarchicalValidationService } from "../../activity-shared/services/activity-shared-hierarchical-validation.service";
import { ActivityPerformanceReviewRepository } from "../repository/activity-performance-review.repository";
import { IActivitySharedRequestCancelDBRequest, IActivitySharedRequestCancelRequest } from "../../activity-shared/interfaces";
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
import { UserPerformanceReviewValidationService } from "src/modules/user/modules/user-performance-review/services/user-performance-review-validation.service";
import { originHub } from "src/utils/types/enums/origin-hub.enum";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
export declare class ActivityPerformanceReviewValidationService {
    private readonly activitySharedHierarchicalValidationService;
    private readonly userPerformanceReviewValidationService;
    private readonly activitySharedService;
    private readonly activitySharedValidationService;
    private readonly activityPerformanceReviewRepository;
    constructor(activitySharedHierarchicalValidationService: ActivitySharedHierarchicalValidationService, userPerformanceReviewValidationService: UserPerformanceReviewValidationService, activitySharedService: ActivitySharedService, activitySharedValidationService: ActivitySharedValidationService, activityPerformanceReviewRepository: ActivityPerformanceReviewRepository);
    preCreateTransformValidation(activityPerformanceReviewCreateRequest: IActivityRequestPerformanceReviewCreateRequest, requestOriginHub: originHub): Promise<void>;
    preCreateSaveValidation(activityPerformanceReviewCreateRequest: IActivityRequestPerformanceReviewCreateRequest): Promise<void>;
    preUpdateTransformValidation(activityPerformanceReviewUpdateRequest: IActivityRequestPerformanceReviewUpdateRequest, requestOriginHub: originHub): Promise<void>;
    preCancelTransformValidation(activityPerformanceReviewCancelRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity>;
    preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void;
}
