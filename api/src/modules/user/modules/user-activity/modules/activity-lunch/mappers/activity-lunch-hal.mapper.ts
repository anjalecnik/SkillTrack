import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { ActivityLunchListItemHalResponse } from "../dtos/response/activity-lunch-list-item-hal.response"

export abstract class ActivityLunchHalMapper {
	static mapActivityListItem(activity: UserActivityEntity): ActivityLunchListItemHalResponse {
		return {
			id: activity.id,
			activityType: UserActivityType.Lunch,
			date: DateHelper.formatIso8601DayString(activity.date)
		}
	}
}
