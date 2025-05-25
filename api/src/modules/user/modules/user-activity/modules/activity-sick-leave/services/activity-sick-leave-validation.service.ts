import { BadRequestException, Injectable } from "@nestjs/common"
import { IActivitySharedRequestCancelDBRequest, IActivitySharedRequestCancelRequest } from "../../activity-shared/interfaces"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service"
import { ActivitySharedValidationCollisionService } from "../../activity-shared/services/activity-shared-validation-collision.service"
import { IActivityRequestSickLeaveCreateDBRequest, IActivityRequestSickLeaveCreateRequest, IActivityRequestSickLeaveDB, IActivitySickLeaveCreateDBRequest } from "../interfaces"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

@Injectable()
export class ActivitySickLeaveValidationService {
	constructor(
		private readonly activitySharedService: ActivitySharedService,
		private readonly activitySharedValidationService: ActivitySharedValidationService,
		private readonly activitySharedValidationCollisionService: ActivitySharedValidationCollisionService
	) {}

	async preCreateTransformValidation(activitySickLeaveCreateRequest: IActivityRequestSickLeaveCreateRequest): Promise<void> {
		this.validateDates(activitySickLeaveCreateRequest)
	}

	async preCreateSaveValidation(activityRequest: IActivityRequestSickLeaveCreateDBRequest, activities: IActivitySickLeaveCreateDBRequest[]): Promise<void> {
		const activitiesInSameRange = await this.activitySharedService.getActivitiesForActivityDates(activityRequest, activities)
		this.activitySharedValidationCollisionService.validateCollisions(activitiesInSameRange, { collidingActivityOnDay: [UserActivityType.SickLeave] })
	}

	async preCancelTransformValidation(activitySickLeaveCancelRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity> {
		const activitySickLeaveEntity = await this.activitySharedService.findActivityRequestOrFail<IActivityRequestSickLeaveDB>(activitySickLeaveCancelRequest)
		if (this.activitySharedService.checkPendingActivityOnCancel(activitySickLeaveEntity)) return activitySickLeaveEntity

		return activitySickLeaveEntity
	}

	preCancelSaveValidation(currentActivityRequest: UserActivityRequestEntity, newActivityRequest: IActivitySharedRequestCancelDBRequest): void {
		this.activitySharedValidationService.validateActivityStatusChange(currentActivityRequest, newActivityRequest)
	}

	private validateDates({ dateStart, dateEnd, hours }: IActivityRequestSickLeaveCreateRequest): void {
		if (!hours) {
			return
		}

		if (!DateHelper.isSameDay(dateStart, dateEnd)) {
			throw new BadRequestException(
				"Start and end dates must be the same when specifying hours",
				`Start date: ${dateStart.toISOString()} not the same as end date: ${dateEnd.toISOString()}`
			)
		}
	}
}
