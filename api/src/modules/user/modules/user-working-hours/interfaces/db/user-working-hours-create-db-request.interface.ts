import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"

export interface IUserWorkingHoursCreateDBRequest
	extends Required<Pick<UserWorkingHoursEntity, "type" | "fromDateStart" | "userId">>,
		Partial<Pick<UserWorkingHoursEntity, "toDateEnd">> {}
