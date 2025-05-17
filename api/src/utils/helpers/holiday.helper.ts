import { HolidayEntity } from "../../libs/db/entities/holiday.entity"
import { DateHelper } from "./date.helper"

export class HolidayHelper {
	static isHoliday(holidays: HolidayEntity[], date: Date): boolean {
		return !!holidays.find(holiday => DateHelper.isSameDay(holiday.date, date))
	}

	static checkHoliday(holidays: HolidayEntity[], date: Date): { isHoliday: boolean; holidayName: string | null } {
		const holiday = holidays.find(holiday => DateHelper.isSameDay(holiday.date, date))
		return {
			isHoliday: Boolean(holiday),
			holidayName: holiday?.name || null
		}
	}

	static isHolidayOnWorkday(holidays: HolidayEntity[], date: Date): boolean {
		return HolidayHelper.isHoliday(holidays, date) && !DateHelper.isWeekend(new Date(date))
	}
}
