import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"

export interface IUserWorkingHoursFilterDBRequest extends Partial<Pick<UserWorkingHoursEntity, "type" | "toDateEnd" | "userId">> {
	fromDateStart: Date
	toDateStart: Date
}
