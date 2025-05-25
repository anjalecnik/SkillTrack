import { IActivitySharedRequestCancelRequest } from "../../activity-shared/interfaces"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { ActivitySharedValidationService } from "../../activity-shared/services/activity-shared-validation.service"
import { IActivityRequestDailyCreateDBRequest, IActivityRequestDailyDB, IActivityRequestDailyUpdateRequest } from "../interfaces"
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { Config } from "src/utils/config/config"
import { DateHelper } from "src/utils/helpers/date.helper"

@Injectable()
export class ActivityDailyValidationService {
	constructor(private readonly activitySharedService: ActivitySharedService, private readonly activitySharedValidationService: ActivitySharedValidationService) {}

	async getExistingActivityRequests(activityRequest: IActivityRequestDailyCreateDBRequest): Promise<UserActivityRequestEntity[]> {
		const dailyRequestOnSameDay = await this.activitySharedService.getActivityRequestsForDates(
			activityRequest,
			[activityRequest.dateStart],
			[UserActivityStatus.Approved],
			[UserActivityType.Daily]
		)
		return dailyRequestOnSameDay
	}

	async preCreateSaveValidation(activityRequest: IActivityRequestDailyCreateDBRequest): Promise<void> {
		const existingActivityRequests = await this.getExistingActivityRequests(activityRequest)
		if (existingActivityRequests.length > 0) throw new BadRequestException("Only One daily activity request is allowed per day")
	}

	async preUpdateTransformValidation(bulkActivityRequestDailyUpdate: IActivityRequestDailyUpdateRequest): Promise<UserActivityRequestEntity> {
		const activityRequest = await this.activitySharedService.getActivityRequestWithActivities({
			id: bulkActivityRequestDailyUpdate.id
		})
		if (!activityRequest) throw new BadRequestException("Could not find daily activity request")

		this.validateUpdate(activityRequest, bulkActivityRequestDailyUpdate.id)
		await this.activitySharedValidationService.validateIsWorkingDays([activityRequest.dateStart])

		return activityRequest
	}

	async preCancelTransformValidation(activityDailyRequest: IActivitySharedRequestCancelRequest): Promise<UserActivityRequestEntity> {
		const activityRequestEntity = await this.activitySharedService.findActivityRequestOrFail<IActivityRequestDailyDB>(activityDailyRequest)
		return activityRequestEntity
	}

	private validateUpdate(activityRequest: UserActivityRequestEntity | null, id: number): void {
		if (!activityRequest) {
			throw new NotFoundException("Activity request not found", `Activity request '${id}' does not exist`)
		}
		if (activityRequest.activityType !== UserActivityType.Daily) {
			throw new BadRequestException("Invalid Activity type", "Activity type must be 'Daily'")
		}
		if (!activityRequest.dateStart) {
			throw new InternalServerErrorException("Daily activity request should have 'dateStart' property")
		}

		const daysLimit = Config.get<number>("APP_FEATURE_USER_ACTIVITY_DAILY_EDIT_DAYS_LIMIT")
		const dateLimit = DateHelper.subtract(new Date(), daysLimit, "days")
		if (DateHelper.getDateTime(activityRequest.dateStart) < DateHelper.getDateTime(dateLimit)) {
			throw new BadRequestException(`Daily Activity can be edited for only past ${daysLimit} days`)
		}
	}
}
