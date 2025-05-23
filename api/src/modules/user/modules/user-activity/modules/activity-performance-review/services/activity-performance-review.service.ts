import { Injectable } from "@nestjs/common"
import { IActivitySharedRequestCancelRequest, IInvokerMetadata } from "../../activity-shared/interfaces"
import { IActivityRequestPerformanceReviewCreateRequest } from "../interfaces/activity-request-performance-review-create.interface"
import { IActivityPerformanceReviewEntityEnriched } from "../interfaces/activity-request-performance-review-enriched.interface"
import { ActivityPerformanceReviewDBMapper } from "../mappers/activity-performance-review-db.mapper"
import { ActivityPerformanceReviewRepository } from "../repository/activity-performance-review.repository"
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service"
import { IActivityRequestPerformanceReviewUpdateRequest } from "../interfaces/activity-request-performance-rerview-update.interface"
import { ActivityPerformanceReviewValidationService } from "./activity-performance-review-validation.service"
import { UserPerformanceReviewService } from "../../../../user-performance-review/services/user-performance-review.service"
import { ActivityPerformanceReviewResponse } from "../dtos/response/activity-performance-review.response"
import { IActivityRequestPerformanceReviewListRequest } from "../interfaces/activity-request-performance-review-list.interface"
import { ActivityPerformanceReviewMapper } from "../mappers/activity-performance-review.mapper"
import { ActivitySharedDBMapper } from "../../activity-shared/mappers/activity-shared-db.mapper"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ActivityRequestTypeHelper } from "src/utils/helpers/activity-request-type.helper"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

@Injectable()
export class ActivityPerformanceReviewService {
	constructor(
		private readonly activitySharedService: ActivitySharedService,
		private readonly activityPerformanceReviewRepository: ActivityPerformanceReviewRepository,
		private readonly activitySharedRequestActionsService: ActivitySharedRequestActionsService,
		private readonly activityPerformanceReviewValidationService: ActivityPerformanceReviewValidationService,
		private readonly userPerformanceReviewService: UserPerformanceReviewService
	) {}

	async getActivityRequests(filters: IActivityRequestPerformanceReviewListRequest): Promise<ActivityPerformanceReviewResponse[]> {
		const activities = await this.activityPerformanceReviewRepository.getPerformanceReviewActivitiesForUser(filters)
		const performanceReviews = await this.userPerformanceReviewService.getPerformanceReviewsById(activities.flatMap(activity => activity.performanceReviewId ?? []))

		return ActivityPerformanceReviewMapper.mapPerformanceReviews(performanceReviews, filters.userId, activities)
	}

	async createActivityRequest(
		userInvoker: IInvokerMetadata,
		activityPerformanceReviewCreateRequest: IActivityRequestPerformanceReviewCreateRequest
	): Promise<IActivityPerformanceReviewEntityEnriched> {
		await this.activityPerformanceReviewValidationService.preCreateTransformValidation(activityPerformanceReviewCreateRequest, userInvoker.requestOriginHub)
		const { activityRequest, activity } = ActivityPerformanceReviewDBMapper.createActivityRequest(activityPerformanceReviewCreateRequest)

		await this.activityPerformanceReviewValidationService.preCreateSaveValidation(activityPerformanceReviewCreateRequest)

		const createdPerformanceReview = await this.userPerformanceReviewService.createPerformanceReview(activityPerformanceReviewCreateRequest)
		const activityPerformanceReviewEntity = await this.activityPerformanceReviewRepository.createActivityRequest(activityRequest, activity, createdPerformanceReview.id)

		return this.enrichActivityRequest(userInvoker.user.id, activityPerformanceReviewEntity)
	}

	async updateActivityRequest(
		userInvoker: IInvokerMetadata,
		activityRequestPerformanceReviewUpdateRequest: IActivityRequestPerformanceReviewUpdateRequest
	): Promise<IActivityPerformanceReviewEntityEnriched> {
		const { id: activityRequestId } = activityRequestPerformanceReviewUpdateRequest
		await this.activityPerformanceReviewValidationService.preUpdateTransformValidation(activityRequestPerformanceReviewUpdateRequest, userInvoker.requestOriginHub)

		const performanceReviewId = await this.userPerformanceReviewService.getPerformanceReviewIdByRequestId(activityRequestId)

		await this.userPerformanceReviewService.updatePerformanceReview({ ...activityRequestPerformanceReviewUpdateRequest, id: performanceReviewId })
		const activityRequestEntity = await this.activityPerformanceReviewRepository.updateActivityRequest(activityRequestId)

		return this.enrichActivityRequest(userInvoker.user.id, activityRequestEntity)
	}

	async cancelActivityRequest(
		userInvoker: IInvokerMetadata,
		activityPerformanceReviewCancelRequest: IActivitySharedRequestCancelRequest
	): Promise<IActivityPerformanceReviewEntityEnriched> {
		const activityPerformanceReviewEntity = await this.activityPerformanceReviewValidationService.preCancelTransformValidation(activityPerformanceReviewCancelRequest)
		const { activityRequest, activityDaily } = ActivitySharedDBMapper.cancelActivity(activityPerformanceReviewCancelRequest, activityPerformanceReviewEntity.userActivities)

		this.activityPerformanceReviewValidationService.preCancelSaveValidation(activityPerformanceReviewEntity, activityRequest)
		const canceledActivityPerformanceReviewEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily)

		const performanceReviewId = await this.userPerformanceReviewService.getPerformanceReviewIdByRequestId(activityRequest.id)
		await this.userPerformanceReviewService.deletePerformanceReview({ id: performanceReviewId })

		return this.enrichActivityRequest(userInvoker.user.id, canceledActivityPerformanceReviewEntity)
	}

	async enrichActivityRequest(
		userInvoker: number | UserEntity,
		activityRequest: UserActivityRequestEntity,
		subordinateIds: number[] = []
	): Promise<IActivityPerformanceReviewEntityEnriched> {
		const activityRequestTypeSafe = ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, UserActivityType.PerformanceReview)
		const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds)
		return {
			...activityRequestTypeSafe,
			actions
		}
	}
}
