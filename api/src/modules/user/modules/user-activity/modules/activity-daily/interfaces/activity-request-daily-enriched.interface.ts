import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { IActivityRequestDailyDB } from "./db"
import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum"

export interface IActivityRequestDailyEntityEnriched extends IActivityRequestDailyDB {
	activities: UserActivityEntity[]
	lunch: boolean
	actions: UserActivityRequestActions[]
}
