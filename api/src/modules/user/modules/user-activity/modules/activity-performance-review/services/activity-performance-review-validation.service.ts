import { Injectable } from "@nestjs/common"
import { IActivityRequestPerformanceReviewCreateRequest } from "../interfaces/activity-request-performance-review-create.interface"
import { IActivityRequestPerformanceReviewUpdateRequest } from "../interfaces/activity-request-performance-rerview-update.interface"
import { ActivitySharedHierarchicalValidationService } from "../../activity-shared/services/activity-shared-hierarchical-validation.service"
import { ActivityPerformanceReviewRepository } from "../repository/activity-performance-review.repository"
import { IActivitySharedRequestCancelDBRequest, IActivitySharedRequestCancelRequest } from "../../activity-shared/interfaces"
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { IActivityRequestPerformanceReviewDB } from "../interfaces/db/activity-request-performance-review-db.interface"
import { UserPerformanceReviewValidationService } from "src/modules/user/modules/user-performance-review/services/user-performance-review-validation.service"
import { originHub } from "src/utils/types/enums/origin-hub.enum"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"

@Injectable()
export class ActivityPerformanceReviewValidationService {
	constructor(
		private readonly activitySharedHierarchicalValidationService: ActivitySharedHierarchicalValidationService,
		private readonly userPerformanceReviewValidationService: UserPerformanceReviewValidationService,
		private readonly activitySharedService: ActivitySharedService,
		private readonly activitySharedValidationService: ActivitySharedValidationService,
		private readonly activityPerformanceReviewRepository: ActivityPerformanceReviewRepository
	) {}

	async preCreateTransformValidation(activityPerformanceReviewCreateRequest: IActivityRequestPerformanceReviewCreateRequest, requestOriginHub: originHub): Promise<void> {
		await this.activitySharedHierarchicalValidationService.validateHierarchicalViolationAndGetIsPrivilege(activityPerformanceReviewCreateRequest, requestOriginHub)
	}

	async preCreateSaveValidation(activityPerformanceReviewCreateRequest: IActivityRequestPerformanceReviewCreateRequest): Promise<void> {
		const performanceReviewIds = await this.activityPerformanceReviewRepository.getPerformanceReviewActivities(activityPerformanceReviewCreateRequest)
		await this.userPerformanceReviewValidationService.preCreateSaveValidation(activityPerformanceReviewCreateRequest, performanceReviewIds)
	}

	async preUpdateTransformValidation(activityPerformanceReviewUpdateRequest: IActivityRequestPerformanceReviewUpdateRequest, requestOriginHub: originHub): Promise<void> {
		await this.activitySharedHierarchicalValidationService.validateHierarchicalViolationAndGetIsPrivilege(activityPerformanceReviewUpdateRequest, requestOriginHub)
	}

	async preCancelTransformValidation(activityPerformanceReviewCancelRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity> {
		const activityVacationEntity = await this.activitySharedService.findActivityRequestOrFail<IActivityRequestPerformanceReviewDB>(activityPerformanceReviewCancelRequest)
		return activityVacationEntity
	}

	preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void {
		this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest)
	}
}
