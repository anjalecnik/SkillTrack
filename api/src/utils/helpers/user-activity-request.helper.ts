import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { WithRequired } from "../types/interfaces"
import { TypeHelper } from "./type.helper"

export abstract class UserActivityRequestHelper {
	static validateUserRelation(activityRequest: UserActivityRequestEntity): WithRequired<UserActivityRequestEntity, "user"> {
		return TypeHelper.validateRelation(activityRequest, "user")
	}

	static validateActivitiesRelation(activityRequest: UserActivityRequestEntity): WithRequired<UserActivityRequestEntity, "userActivities"> {
		return TypeHelper.validateRelation(activityRequest, "userActivities")
	}
}
