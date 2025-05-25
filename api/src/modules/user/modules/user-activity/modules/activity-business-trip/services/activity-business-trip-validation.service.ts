import { Injectable } from "@nestjs/common"
import {
	IActivitySharedRequestCancelDBRequest,
	IActivitySharedRequestCancelRequest,
	IActivitySharedRequestReviewDBRequest,
	IActivitySharedRequestReviewRequest
} from "../../activity-shared/interfaces"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service"
import { IActivityRequestBusinessTripDB } from "../interfaces/db/activity-request-business-trip-db.interface"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"

@Injectable()
export class ActivityBusinessTripValidationService {
	constructor(private readonly activitySharedService: ActivitySharedService, private readonly activitySharedValidationService: ActivitySharedValidationService) {}

	async preCancelTransformValidation(activityBusinessTripCancelRequest: IActivitySharedRequestCancelRequest): Promise<IActivityRequestBusinessTripDB> {
		const activityRequestBusinessTripEntity = await this.activitySharedService.findActivityRequestOrFail<IActivityRequestBusinessTripDB>(activityBusinessTripCancelRequest)
		if (this.activitySharedService.checkPendingActivityOnCancel(activityRequestBusinessTripEntity)) return activityRequestBusinessTripEntity
		return activityRequestBusinessTripEntity
	}

	preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void {
		this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest)
	}

	async preReviewTransformValidation(activityBusinessTripReviewRequest: IActivitySharedRequestReviewRequest): Promise<IActivityRequestBusinessTripDB> {
		const activityRequestBusinessTripEntity = await this.activitySharedService.findActivityRequestOrFail<IActivityRequestBusinessTripDB>(activityBusinessTripReviewRequest)
		await this.activitySharedValidationService.validateReviewer(activityRequestBusinessTripEntity, activityBusinessTripReviewRequest)
		return activityRequestBusinessTripEntity
	}

	preReviewSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestReviewDBRequest): void {
		this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest)
	}
}
