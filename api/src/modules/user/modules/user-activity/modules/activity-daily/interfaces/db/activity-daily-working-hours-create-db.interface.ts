import { UserWorkingHoursType } from "src/utils/types/enums/user-working-hours.enum"
import { IActivityDailyCreateDBRequest } from "./activity-daily-create-db.interface"

export interface IActivityDailyWithWorkingHours {
	activity: IActivityDailyCreateDBRequest
	workingHour: IUserWorkingHoursCreateRequest
}

export interface IUserWorkingHoursCreateRequest {
	type: UserWorkingHoursType
	fromDateStart: Date
	toDateEnd: Date | null
}
