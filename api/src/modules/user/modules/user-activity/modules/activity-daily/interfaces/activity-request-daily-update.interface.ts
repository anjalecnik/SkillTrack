import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum"
import { RequiredNotNull } from "src/utils/types/interfaces"
import { IUserWorkingHoursDailyCreateRequest } from "../../../../user-working-hours/interfaces"

export interface IActivityRequestDailyUpdateRequest extends RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "userId" | "reportedByUserId" | "activityType">> {
	date: Date
	workLocation: UserActivityWorkLocation
	workingHours: IUserWorkingHoursDailyCreateRequest[]
	lunch: boolean
}
