import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import {
	IActivitySharedCancelDBRequest,
	IActivitySharedRequestCancelDBRequest,
	IActivitySharedRequestCancelRequest,
	IActivitySharedRequestReviewDBRequest,
	IActivitySharedRequestReviewRequest,
	IActivitySharedReviewDBRequest
} from "../interfaces"

export abstract class ActivitySharedDBMapper {
	static cancelActivity(
		activityRequestCancelRequest: IActivitySharedRequestCancelRequest,
		activities: UserActivityEntity[] | undefined | null
	): { activityRequest: IActivitySharedRequestCancelDBRequest; activityDaily: IActivitySharedCancelDBRequest[] } {
		return {
			activityRequest: {
				id: activityRequestCancelRequest.id,
				reportedByUserId: activityRequestCancelRequest.reportedByUserId,
				status: UserActivityStatus.Canceled
			},
			activityDaily: activities
				? activities.map(
						(activity): IActivitySharedCancelDBRequest => ({
							id: activity.id,
							reportedByUserId: activityRequestCancelRequest.reportedByUserId,
							status: UserActivityStatus.Canceled
						})
				  )
				: []
		}
	}

	static reviewActivity(
		activityRequestReviewRequest: IActivitySharedRequestReviewRequest,
		activities: UserActivityEntity[] | undefined | null
	): { activityRequest: IActivitySharedRequestReviewDBRequest; activityDaily: IActivitySharedReviewDBRequest[] } {
		return {
			activityRequest: {
				id: activityRequestReviewRequest.id,
				reviewedByUserId: activityRequestReviewRequest.reviewedByUserId,
				status: activityRequestReviewRequest.status
			},
			activityDaily: activities
				? activities.map(
						(activity): IActivitySharedReviewDBRequest => ({
							id: activity.id,
							reviewedByUserId: activityRequestReviewRequest.reviewedByUserId,
							status: activityRequestReviewRequest.status
						})
				  )
				: []
		}
	}
}
