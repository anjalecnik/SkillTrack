import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { IUserActivityRequestEnriched } from "../interfaces/user-activity-request-enriched.interface"
import { ActivityBusinessTripService } from "../modules/activity-business-trip/services/activity-business-trip.service"
import { ActivityDailyService } from "../modules/activity-daily/services/activity-daily.service"
import {
	IActivitySharedRequestCancelRequest,
	IActivitySharedRequestCreateFactory,
	IActivitySharedRequestReviewRequest,
	IActivitySharedRequestUpdateFactory,
	IInvokerMetadata
} from "../modules/activity-shared/interfaces"
import { ActivitySickLeaveService } from "../modules/activity-sick-leave/services/activity-sick-leave.service"
import { ActivityVacationService } from "../modules/activity-vacation/services/activity-vacation.service"
import { ActivityPerformanceReviewService } from "../modules/activity-performance-review/services/activity-performance-review.service"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { ActivityRequestTypeHelper } from "src/utils/helpers/activity-request-type.helper"

@Injectable()
export class UserActivityFactoryWorkerService {
	constructor(
		private readonly activityBusinessTripService: ActivityBusinessTripService,
		private readonly activityDailyService: ActivityDailyService,
		private readonly activitySickLeaveService: ActivitySickLeaveService,
		private readonly activityVacationService: ActivityVacationService,
		private readonly activityPerformanceReviewService: ActivityPerformanceReviewService
	) {}

	async createActivityRequest(userInvoker: IInvokerMetadata, { dateStart, dateEnd, ...activity }: IActivitySharedRequestCreateFactory): Promise<IUserActivityRequestEnriched> {
		switch (activity.activityType) {
			case UserActivityType.BusinessTrip:
				return this.activityBusinessTripService.createActivityRequest(userInvoker, { ...activity, dateStart, dateEnd })
			case UserActivityType.Daily:
				return this.activityDailyService.createActivityRequest(userInvoker, { ...activity, dateStart })
			case UserActivityType.SickLeave:
				return this.activitySickLeaveService.createActivityRequest(userInvoker, { ...activity, dateStart, dateEnd })
			case UserActivityType.Vacation:
				return this.activityVacationService.createActivityRequest(userInvoker, { ...activity, dateStart, dateEnd })
			case UserActivityType.PerformanceReview:
				return this.activityPerformanceReviewService.createActivityRequest(userInvoker, { ...activity, dateStart })
			default:
				throw new InternalServerErrorException("Unsupported UserActivityType")
		}
	}

	async updateActivityRequest(userInvoker: IInvokerMetadata, activityRequestUpdate: IActivitySharedRequestUpdateFactory): Promise<IUserActivityRequestEnriched> {
		switch (activityRequestUpdate.activityType) {
			case UserActivityType.BusinessTrip:
				return this.activityBusinessTripService.updateActivityRequest(userInvoker, activityRequestUpdate)
			case UserActivityType.Daily:
				return this.activityDailyService.updateActivityRequest(userInvoker, activityRequestUpdate)
			case UserActivityType.PerformanceReview:
				return this.activityPerformanceReviewService.updateActivityRequest(userInvoker, activityRequestUpdate)
			default:
				throw new InternalServerErrorException("Unsupported UserActivityType")
		}
	}

	async cancelActivityRequest(
		userInvoker: IInvokerMetadata,
		activityRequestCancel: IActivitySharedRequestCancelRequest,
		activityType: UserActivityType
	): Promise<IUserActivityRequestEnriched> {
		switch (activityType) {
			case UserActivityType.BusinessTrip:
				return this.activityBusinessTripService.cancelActivityRequest(userInvoker, activityRequestCancel)
			case UserActivityType.Daily:
				return this.activityDailyService.cancelActivityRequest(userInvoker, activityRequestCancel)
			case UserActivityType.SickLeave:
				return this.activitySickLeaveService.cancelActivityRequest(userInvoker, activityRequestCancel)
			case UserActivityType.Vacation:
				return this.activityVacationService.cancelActivityRequest(userInvoker, activityRequestCancel)
			case UserActivityType.PerformanceReview:
				return this.activityPerformanceReviewService.cancelActivityRequest(userInvoker, activityRequestCancel)
			default:
				throw new InternalServerErrorException("Unsupported UserActivityType")
		}
	}

	async reviewActivityRequest(
		userInvoker: IAuthJwtPassportUserRequest,
		activityRequestReview: IActivitySharedRequestReviewRequest,
		activityType: UserActivityType
	): Promise<IUserActivityRequestEnriched> {
		switch (activityType) {
			case UserActivityType.BusinessTrip:
				return this.activityBusinessTripService.reviewActivityRequest(userInvoker, activityRequestReview)
			case UserActivityType.Daily:
				return this.activityDailyService.reviewActivityRequest(userInvoker, activityRequestReview)
			case UserActivityType.SickLeave:
				return this.activitySickLeaveService.reviewActivityRequest(activityRequestReview)
			case UserActivityType.Vacation:
				return this.activityVacationService.reviewActivityRequest(userInvoker, activityRequestReview)

			default:
				throw new InternalServerErrorException("Unsupported UserActivityType")
		}
	}

	async enrichActivityRequest(
		userInvoker: IAuthJwtPassportUserRequest,
		activityRequest: UserActivityRequestEntity,
		subordinateIds: number[] = []
	): Promise<IUserActivityRequestEnriched> {
		const userInvokerId = userInvoker.user.id
		switch (true) {
			case ActivityRequestTypeHelper.isBusinessTripRequest(activityRequest):
				return this.activityBusinessTripService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds)
			case ActivityRequestTypeHelper.isDailyRequest(activityRequest):
				return this.activityDailyService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds)
			case ActivityRequestTypeHelper.isSickLeaveRequest(activityRequest):
				return this.activitySickLeaveService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds)
			case ActivityRequestTypeHelper.isVacationRequest(activityRequest):
				return this.activityVacationService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds)

			case ActivityRequestTypeHelper.isPerformanceReviewRequest(activityRequest):
				return this.activityPerformanceReviewService.enrichActivityRequest(userInvokerId, activityRequest, subordinateIds)
			default:
				throw new InternalServerErrorException("Unsupported UserActivityType")
		}
	}
}
