import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { IActivitySharedReporterValidation } from "../../activity-shared/interfaces"
import {
	IActivityBusinessTripCreateDBRequest,
	IActivityRequestBusinessTripCreateDBRequest,
	IActivityRequestBusinessTripCreateRequest,
	IActivityRequestBusinessTripUpdateDBRequest
} from "../interfaces"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export abstract class ActivityBusinessTripDBMapper {
	static createActivityRequest(
		createActivityRequest: IActivityRequestBusinessTripCreateRequest,
		dates: Date[],
		assignedUserWorkHours: number
	): {
		activityRequest: IActivityRequestBusinessTripCreateDBRequest
		activities: IActivityBusinessTripCreateDBRequest[]
	} {
		const activityRequest: IActivityRequestBusinessTripCreateDBRequest = {
			userId: createActivityRequest.userId,
			reportedByUserId: createActivityRequest.reportedByUserId,
			activityType: createActivityRequest.activityType,
			description: createActivityRequest.description ?? undefined,
			projectId: createActivityRequest.projectId ?? undefined,
			dateStart: createActivityRequest.dateStart,
			dateEnd: createActivityRequest.dateEnd,
			distanceInKM: createActivityRequest.distanceInKM ?? undefined,
			location: createActivityRequest.location,
			status: UserActivityStatus.PendingApproval
		}

		const activities: IActivityBusinessTripCreateDBRequest[] = this.mapActivitiesPerDay(createActivityRequest, dates, assignedUserWorkHours, createActivityRequest.projectId)

		return { activityRequest, activities }
	}

	static updateActivityRequest(
		updateActivityRequest: IActivityRequestBusinessTripUpdateDBRequest,
		dates: Date[],
		assignedUserWorkHours: number
	): {
		activities: IActivityBusinessTripCreateDBRequest[]
	} {
		const activities = this.mapActivitiesPerDay(updateActivityRequest, dates, assignedUserWorkHours, updateActivityRequest.projectId)

		return {
			activities
		}
	}

	private static mapActivitiesPerDay(
		reporter: IActivitySharedReporterValidation,
		dates: Date[],
		assignedUserWorkHours: number,
		projectId: number | undefined | null
	): IActivityBusinessTripCreateDBRequest[] {
		return dates.map(date => ({
			userId: reporter.userId,
			reportedByUserId: reporter.reportedByUserId,
			date: date,
			status: UserActivityStatus.PendingApproval,
			activityType: UserActivityType.BusinessTrip,
			hours: assignedUserWorkHours,
			projectId: projectId ?? undefined
		}))
	}
}
