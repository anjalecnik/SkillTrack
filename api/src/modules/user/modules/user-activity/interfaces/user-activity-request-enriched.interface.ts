import { IActivityRequestBusinessTripEntityEnriched } from "../modules/activity-business-trip/interfaces"
import { IActivityRequestDailyEntityEnriched } from "../modules/activity-daily/interfaces"
import {
	IActivityPerformanceReviewEntityEnriched,
	IActivityRequestPerformanceReviewEntityEnriched
} from "../modules/activity-performance-review/interfaces/activity-request-performance-review-enriched.interface"
import { IActivityRequestSickLeaveEntityEnriched } from "../modules/activity-sick-leave/interfaces"
import { IActivityRequestVacationEntityEnriched } from "../modules/activity-vacation/interfaces"

export type IUserActivityRequestEnriched =
	| IActivityRequestBusinessTripEntityEnriched
	| IActivityRequestDailyEntityEnriched
	| IActivityRequestSickLeaveEntityEnriched
	| IActivityRequestVacationEntityEnriched
	| IActivityRequestPerformanceReviewEntityEnriched
	| IActivityPerformanceReviewEntityEnriched
