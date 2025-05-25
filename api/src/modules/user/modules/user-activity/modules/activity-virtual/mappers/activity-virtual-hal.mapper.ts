import { DateHelper } from "src/utils/helpers/date.helper"
import { ActivityVirtualListItemHalResponse } from "../dtos/response/activity-virtual-list-item-hal.response"
import { IUserVirtualActivity } from "../interfaces"

export abstract class ActivityVirtualHalMapper {
	static mapActivityListItem(data: IUserVirtualActivity): ActivityVirtualListItemHalResponse {
		return {
			activityType: data.activityType,
			holidayName: data.holidayName ?? undefined,
			date: DateHelper.formatIso8601DayString(data.date)
		}
	}
}
