import { BadRequestException, Injectable } from "@nestjs/common"
import { IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces"
import { ActivitySharedDBMapper } from "../../activity-shared/mappers/activity-shared-db.mapper"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service"
import { IActivityRequestSickLeaveCreateRequest, IActivityRequestSickLeaveEntityEnriched } from "../interfaces"
import { ActivitySickLeaveDBMapper } from "../mappers/activity-sick-leave-db.mapper"
import { ActivitySickLeaveRepository } from "../repository/activity-sick-leave.repository"
import { ActivitySickLeaveValidationService } from "./activity-sick-leave-validation.service"
import { IInvokerMetadata } from "../../activity-shared/interfaces"
import { ActivityRequestTypeHelper } from "src/utils/helpers/activity-request-type.helper"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

@Injectable()
export class ActivitySickLeaveService {
	constructor(
		private readonly activitySharedService: ActivitySharedService,
		private readonly activitySickLeaveRepository: ActivitySickLeaveRepository,
		private readonly activitySickLeaveValidationService: ActivitySickLeaveValidationService,
		private readonly activitySharedRequestActionsService: ActivitySharedRequestActionsService
	) {}

	async createActivityRequest(
		userInvoker: IInvokerMetadata,
		activitySickLeaveCreateRequest: IActivityRequestSickLeaveCreateRequest
	): Promise<IActivityRequestSickLeaveEntityEnriched> {
		await this.activitySickLeaveValidationService.preCreateTransformValidation(activitySickLeaveCreateRequest)

		const dates = await this.activitySharedService.getDatesFromRange(activitySickLeaveCreateRequest)
		const userAssignedWorkHours = 8

		const hours = (await this.calculateHours(activitySickLeaveCreateRequest)) ?? 8
		const { activityRequest, activities } = ActivitySickLeaveDBMapper.createActivityRequest(activitySickLeaveCreateRequest, dates, userAssignedWorkHours, hours)

		await this.activitySickLeaveValidationService.preCreateSaveValidation(activityRequest, activities)
		const activitySickLeaveEntity = await this.activitySickLeaveRepository.createActivityRequest(activityRequest, activities)

		return this.enrichActivityRequest(userInvoker.user.id, activitySickLeaveEntity)
	}

	async cancelActivityRequest(
		userInvoker: IInvokerMetadata,
		activitySickLeaveCancelRequest: IActivitySharedRequestCancelRequest
	): Promise<IActivityRequestSickLeaveEntityEnriched> {
		const activitySickLeaveEntity = await this.activitySickLeaveValidationService.preCancelTransformValidation(activitySickLeaveCancelRequest)
		const { activityRequest, activityDaily } = ActivitySharedDBMapper.cancelActivity(activitySickLeaveCancelRequest, activitySickLeaveEntity.userActivities)

		this.activitySickLeaveValidationService.preCancelSaveValidation(activitySickLeaveEntity, activityRequest)
		const canceledActivitySickLeaveEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily)

		return this.enrichActivityRequest(userInvoker.user.id, canceledActivitySickLeaveEntity)
	}

	reviewActivityRequest(_activityRequestReview: IActivitySharedRequestReviewRequest): never {
		throw new BadRequestException(`Invalid activity type to be reviewed.`, `Invalid activity type for activity request with ID: '${_activityRequestReview.id}'`)
	}

	async enrichActivityRequest(
		userInvoker: number | UserEntity,
		activityRequest: UserActivityRequestEntity,
		subordinateIds: number[] = []
	): Promise<IActivityRequestSickLeaveEntityEnriched> {
		const activityRequestTypeSafe = ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, UserActivityType.SickLeave)
		const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds)
		return {
			...activityRequestTypeSafe,
			actions
		}
	}

	async calculateHours(activitySickLeaveCreateRequest: IActivityRequestSickLeaveCreateRequest) {
		return 24
	}
}
