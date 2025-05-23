import { IActivityRequestBusinessTripDB } from "src/modules/user/modules/user-activity/modules/activity-business-trip/interfaces"
import { IActivityRequestDailyDB } from "src/modules/user/modules/user-activity/modules/activity-daily/interfaces"
import { IActivityRequestPerformanceReviewDB } from "src/modules/user/modules/user-activity/modules/activity-performance-review/interfaces/db/activity-request-performance-review-db.interface"
import { IActivityRequestSickLeaveDB } from "src/modules/user/modules/user-activity/modules/activity-sick-leave/interfaces"
import { IActivityRequestVacationDB } from "src/modules/user/modules/user-activity/modules/activity-vacation/interfaces"
import { UserActivityType } from "../types/enums/user-activity.enum"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"

// Map UserActivityType to response interfaces
type ActivityRequestResponseMap = {
	[UserActivityType.BusinessTrip]: IActivityRequestBusinessTripDB
	[UserActivityType.Daily]: IActivityRequestDailyDB
	[UserActivityType.SickLeave]: IActivityRequestSickLeaveDB
	[UserActivityType.Vacation]: IActivityRequestVacationDB
	[UserActivityType.PerformanceReview]: IActivityRequestPerformanceReviewDB
	[UserActivityType.Unassigned]: never
	[UserActivityType.PublicHoliday]: never
	[UserActivityType.Lunch]: never
}

// Define the input type with a generic response mapping
interface ActivityRequestInput<T extends UserActivityType> extends UserActivityRequestEntity {
	activityType: T
}

export abstract class ActivityRequestTypeHelper {
	static isBusinessTripRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestBusinessTripDB {
		return activityRequest.activityType === UserActivityType.BusinessTrip
	}

	static isDailyRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestDailyDB {
		return activityRequest.activityType === UserActivityType.Daily
	}

	static isSickLeaveRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestSickLeaveDB {
		return activityRequest.activityType === UserActivityType.SickLeave
	}

	static isVacationRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestVacationDB {
		return activityRequest.activityType === UserActivityType.Vacation
	}

	static isPerformanceReviewRequest(activityRequest: UserActivityRequestEntity): activityRequest is IActivityRequestPerformanceReviewDB {
		return activityRequest.activityType === UserActivityType.PerformanceReview
	}

	static isActivityRequest<T extends UserActivityType>(activityRequest: ActivityRequestInput<T>): ActivityRequestResponseMap[T] {
		switch (true) {
			case this.isBusinessTripRequest(activityRequest):
				return activityRequest as IActivityRequestBusinessTripDB as ActivityRequestResponseMap[T]
			case this.isDailyRequest(activityRequest):
				return activityRequest as IActivityRequestDailyDB as ActivityRequestResponseMap[T]
			case this.isSickLeaveRequest(activityRequest):
				return activityRequest as IActivityRequestSickLeaveDB as ActivityRequestResponseMap[T]
			case this.isVacationRequest(activityRequest):
				return activityRequest as IActivityRequestVacationDB as ActivityRequestResponseMap[T]
			case this.isPerformanceReviewRequest(activityRequest):
				return activityRequest as IActivityRequestPerformanceReviewDB as ActivityRequestResponseMap[T]
			default:
				throw new TypeError("Invalid activity request type")
		}
	}

	static setAsActivityRequest<T extends UserActivityType>(activityRequest: UserActivityRequestEntity, activityType: T): ActivityRequestResponseMap[T] {
		switch (true) {
			case this.isBusinessTripRequest(activityRequest):
				return activityRequest as ActivityRequestResponseMap[typeof activityType]
			case this.isDailyRequest(activityRequest):
				return activityRequest as ActivityRequestResponseMap[typeof activityType]
			case this.isSickLeaveRequest(activityRequest):
				return activityRequest as ActivityRequestResponseMap[typeof activityType]
			case this.isVacationRequest(activityRequest):
				return activityRequest as ActivityRequestResponseMap[typeof activityType]
			case this.isPerformanceReviewRequest(activityRequest):
				return activityRequest as ActivityRequestResponseMap[typeof activityType]
			default:
				throw new TypeError("Invalid activity request type (set As)")
		}
	}
}
