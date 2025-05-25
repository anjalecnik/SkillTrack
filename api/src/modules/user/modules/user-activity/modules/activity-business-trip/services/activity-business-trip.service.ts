import { Injectable } from "@nestjs/common"
import { IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces"
import { ActivitySharedDBMapper } from "../../activity-shared/mappers/activity-shared-db.mapper"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service"
import { IActivityRequestBusinessTripCreateRequest, IActivityRequestBusinessTripEntityEnriched, IActivityRequestBusinessTripUpdateRequest } from "../interfaces"
import { ActivityBusinessTripDBMapper } from "../mappers/activity-business-trip-db.mapper"
import { ActivityBusinessTripRepository } from "../repository/activity-business-trip.repository"
import { ActivityBusinessTripValidationService } from "../services/activity-business-trip-validation.service"
import { IInvokerMetadata } from "../../activity-shared/interfaces"
import { UserActivityRequestHelper } from "src/utils/helpers/user-activity-request.helper"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { ActivityRequestTypeHelper } from "src/utils/helpers/activity-request-type.helper"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"

@Injectable()
export class ActivityBusinessTripService {
	constructor(
		private readonly activitySharedService: ActivitySharedService,
		private readonly activityBusinessTripValidationService: ActivityBusinessTripValidationService,
		private readonly activityBusinessTripRepository: ActivityBusinessTripRepository,
		private readonly activitySharedRequestActionsService: ActivitySharedRequestActionsService
	) {}

	async createActivityRequest(
		userInvoker: IInvokerMetadata,
		activityBusinessTripCreateRequest: IActivityRequestBusinessTripCreateRequest
	): Promise<IActivityRequestBusinessTripEntityEnriched> {
		const assignedUserWorkHours = await this.activitySharedService.getUserExpectedWorkHours()
		const dates = await this.activitySharedService.getDatesFromRange({
			...activityBusinessTripCreateRequest,
			dateStart: activityBusinessTripCreateRequest.dateStart,
			dateEnd: activityBusinessTripCreateRequest.dateEnd
		})
		const { activityRequest, activities } = ActivityBusinessTripDBMapper.createActivityRequest(activityBusinessTripCreateRequest, dates, assignedUserWorkHours)

		const activityBusinessTripEntity = await this.activityBusinessTripRepository.createActivityRequest(activityRequest, activities)

		return this.enrichActivityRequest(userInvoker.user.id, activityBusinessTripEntity)
	}

	async updateActivityRequest(
		userInvoker: IInvokerMetadata,
		activityRequestBusinessTripUpdateRequest: IActivityRequestBusinessTripUpdateRequest
	): Promise<IActivityRequestBusinessTripEntityEnriched> {
		const { id, userId } = activityRequestBusinessTripUpdateRequest
		const existingActivityRequest = await this.activitySharedService.getActivityRequestWithActivitiesOrFail({ id, userId })
		const existingActivityRequestWithActivities = UserActivityRequestHelper.validateActivitiesRelation(existingActivityRequest)
		const { dates } = await this.getUpdateDates(activityRequestBusinessTripUpdateRequest, existingActivityRequest)

		const assignedUserWorkHours = await this.activitySharedService.getUserExpectedWorkHours()
		const { activities } = ActivityBusinessTripDBMapper.updateActivityRequest(activityRequestBusinessTripUpdateRequest, dates, assignedUserWorkHours)

		const activityBusinessTripEntity = await this.activityBusinessTripRepository.updateActivityRequest(
			activityRequestBusinessTripUpdateRequest,
			existingActivityRequestWithActivities.userActivities,
			activities
		)

		return this.enrichActivityRequest(userInvoker.user.id, activityBusinessTripEntity)
	}

	async cancelActivityRequest(
		userInvoker: IInvokerMetadata,
		activityBusinessTripCancelRequest: IActivitySharedRequestCancelRequest
	): Promise<IActivityRequestBusinessTripEntityEnriched> {
		const activityRequestBusinessTripEntity = await this.activityBusinessTripValidationService.preCancelTransformValidation(activityBusinessTripCancelRequest)
		const { activityRequest, activityDaily } = ActivitySharedDBMapper.cancelActivity(activityBusinessTripCancelRequest, activityRequestBusinessTripEntity.userActivities ?? [])

		this.activityBusinessTripValidationService.preCancelSaveValidation(activityRequestBusinessTripEntity, activityRequest)
		const canceledActivityBusinessTripEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily)

		const canceledActivityBusinessTrips = canceledActivityBusinessTripEntity.userActivities ?? []

		return this.enrichActivityRequest(userInvoker.user.id, canceledActivityBusinessTripEntity)
	}

	async reviewActivityRequest(
		userInvoker: IAuthJwtPassportUserRequest,
		activityBusinessTripReviewRequest: IActivitySharedRequestReviewRequest
	): Promise<IActivityRequestBusinessTripEntityEnriched> {
		const activityRequestBusinessTripEntity = await this.activityBusinessTripValidationService.preReviewTransformValidation(activityBusinessTripReviewRequest)
		const { activityRequest, activityDaily } = ActivitySharedDBMapper.reviewActivity(activityBusinessTripReviewRequest, activityRequestBusinessTripEntity.userActivities)

		this.activityBusinessTripValidationService.preReviewSaveValidation(activityRequestBusinessTripEntity, activityRequest)
		const reviewedActivityBusinessTripEntity = await this.activitySharedService.reviewActivityRequest(activityRequest, activityDaily)

		return this.enrichActivityRequest(userInvoker.user.id, reviewedActivityBusinessTripEntity)
	}

	async enrichActivityRequest(
		userInvoker: number | UserEntity,
		activityRequest: UserActivityRequestEntity,
		subordinateIds: number[] = []
	): Promise<IActivityRequestBusinessTripEntityEnriched> {
		const activityRequestTypeSafe = ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, UserActivityType.BusinessTrip)
		const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequestTypeSafe, subordinateIds)
		return {
			...activityRequestTypeSafe,
			actions
		}
	}

	private async getUpdateDates(activityRequestBusinessTripUpdateRequest: IActivityRequestBusinessTripUpdateRequest, existingActivityRequest: UserActivityRequestEntity) {
		const dateStartUpdating = activityRequestBusinessTripUpdateRequest.dateStart
		const dateEndUpdating = activityRequestBusinessTripUpdateRequest.dateEnd
		const dateStartExisting = existingActivityRequest.dateStart
		const dateEndExisting = existingActivityRequest.dateEnd!

		const dateStart = dateStartUpdating ? dateStartUpdating : dateStartExisting
		const dateEnd = dateEndUpdating ? dateEndUpdating : dateEndExisting

		const dateStartAdjustUnassigned = dateStartUpdating && dateStartUpdating < dateStartExisting ? dateStartUpdating : dateStartExisting
		const dateEndAdjustUnassigned = dateEndUpdating && dateEndUpdating > dateEndExisting ? dateEndUpdating : dateEndExisting

		const dates = await this.activitySharedService.getDatesFromRange({
			...activityRequestBusinessTripUpdateRequest,
			dateStart: dateStart,
			dateEnd: dateEnd
		})
		const datesAdjustUnassigned = await this.activitySharedService.getDatesFromRange({
			...activityRequestBusinessTripUpdateRequest,
			dateStart: dateStartAdjustUnassigned,
			dateEnd: dateEndAdjustUnassigned
		})

		return {
			dates,
			datesAdjustUnassigned,
			dateStart,
			dateEnd
		}
	}
}
