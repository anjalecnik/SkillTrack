import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"

export interface IUserWorkingHoursDeleteDBRequest extends Required<Pick<UserWorkingHoursEntity, "userId">> {
	date: Date
}
