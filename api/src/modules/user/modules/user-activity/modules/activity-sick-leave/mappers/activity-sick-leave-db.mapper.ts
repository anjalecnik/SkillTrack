import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { IActivityRequestSickLeaveCreateDBRequest, IActivityRequestSickLeaveCreateRequest, IActivitySickLeaveCreateDBRequest } from "../interfaces"

export abstract class ActivitySickLeaveDBMapper {
	static createActivityRequest(
		createActivityRequest: IActivityRequestSickLeaveCreateRequest,
		dates: Date[],
		totalWorkspaceAssignedHoursPerDay: number,
		totalHours?: number
	): { activityRequest: IActivityRequestSickLeaveCreateDBRequest; activities: IActivitySickLeaveCreateDBRequest[] } {
		const activityRequest: IActivityRequestSickLeaveCreateDBRequest = {
			userId: createActivityRequest.userId,
			reportedByUserId: createActivityRequest.reportedByUserId,
			dateEnd: createActivityRequest.dateEnd,
			dateStart: createActivityRequest.dateStart,
			description: createActivityRequest.description ?? undefined,
			hours: totalHours,
			status: UserActivityStatus.Approved,
			activityType: UserActivityType.SickLeave
		}

		const activities: IActivitySickLeaveCreateDBRequest[] = dates.map((date, _) => ({
			userId: createActivityRequest.userId,
			reportedByUserId: createActivityRequest.reportedByUserId,
			date,
			hours: totalWorkspaceAssignedHoursPerDay,
			status: UserActivityStatus.Approved,
			activityType: UserActivityType.SickLeave
		}))

		return { activityRequest, activities }
	}
}
