import { DateHelper } from "../helpers/date.helper"
import { DateTimeWithoutTimezoneResponse } from "../types/dtos"

export class DateMapper {
	static mapSeparateDateTime(date: Date): DateTimeWithoutTimezoneResponse {
		return {
			date: DateHelper.formatIso8601DayString(date),
			time: DateHelper.formatHoursMinutesString(date)
		}
	}
}
