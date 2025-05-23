import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { IActivityRequestVacationCreateDBRequest, IActivityRequestVacationCreateRequest, IActivityVacationCreateDBRequest } from "../interfaces"

export abstract class ActivityVacationDBMapper {
	static createActivityVacation({ userId, reportedByUserId }: IActivityRequestVacationCreateRequest, date: Date, vacationAssignedId: number): IActivityVacationCreateDBRequest {
		return {
			userId,
			reportedByUserId,
			date,
			vacationAssignedId,
			status: UserActivityStatus.PendingApproval,
			activityType: UserActivityType.Vacation
		}
	}

	static createActivityRequest(
		createActivityRequest: IActivityRequestVacationCreateRequest,
		activities: IActivityVacationCreateDBRequest[]
	): {
		activityRequest: IActivityRequestVacationCreateDBRequest
		activities: IActivityVacationCreateDBRequest[]
	} {
		const activityRequest: IActivityRequestVacationCreateDBRequest = {
			userId: createActivityRequest.userId,
			reportedByUserId: createActivityRequest.reportedByUserId,
			activityType: UserActivityType.Vacation,
			description: createActivityRequest.description ?? undefined,
			dateStart: createActivityRequest.dateStart,
			dateEnd: createActivityRequest.dateEnd,
			status: UserActivityStatus.PendingApproval
		}

		return { activityRequest, activities }
	}
}
