import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export interface IActivitySharedCollisionRules {
	collidingActivityOnDay?: UserActivityType[] // Activity should not be on the same day
	collidingActivityWorkHoursOnDay?: UserActivityType[] // Activity can be on the same day but should not exceed maximum  working hours
}
