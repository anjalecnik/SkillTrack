import { Injectable } from "@nestjs/common"
import {
	IActivitySharedRequestCancelDBRequest,
	IActivitySharedRequestCancelRequest,
	IActivitySharedRequestReviewDBRequest,
	IActivitySharedRequestReviewRequest
} from "../../activity-shared/interfaces"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service"
import { ActivitySharedValidationCollisionService } from "../../activity-shared/services/activity-shared-validation-collision.service"
import { IActivityRequestVacationCreateDBRequest, IActivityRequestVacationDB, IActivityVacationCreateDBRequest } from "../interfaces"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

@Injectable()
export class ActivityVacationValidationService {
	constructor(
		private readonly activitySharedService: ActivitySharedService,
		private readonly activitySharedValidationService: ActivitySharedValidationService,
		private readonly activitySharedValidationCollisionService: ActivitySharedValidationCollisionService
	) {}

	async preCreateSaveValidation(activityRequest: IActivityRequestVacationCreateDBRequest, activities: IActivityVacationCreateDBRequest[]): Promise<void> {
		const activitiesInSameRange = await this.activitySharedService.getActivitiesForActivityDates(activityRequest, activities)
		this.activitySharedValidationCollisionService.validateCollisions(activitiesInSameRange, { collidingActivityOnDay: [UserActivityType.Vacation] })
	}

	async preCancelTransformValidation(activityVacationCancelRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity> {
		const activityVacationEntity = await this.activitySharedService.findActivityRequestOrFail<IActivityRequestVacationDB>(activityVacationCancelRequest)
		if (this.activitySharedService.checkPendingActivityOnCancel(activityVacationEntity)) return activityVacationEntity
		return activityVacationEntity
	}

	preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void {
		this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest)
	}

	async preReviewTransformValidation(activityVacationReviewRequest: IActivitySharedRequestReviewRequest): Promise<UserActivityRequestEntity> {
		const activityVacationEntity = await this.activitySharedService.findActivityRequestOrFail<IActivityRequestVacationDB>(activityVacationReviewRequest)
		await this.activitySharedValidationService.validateReviewer(activityVacationEntity, activityVacationReviewRequest)
		return activityVacationEntity
	}

	preReviewSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestReviewDBRequest): void {
		this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest)
	}
}
