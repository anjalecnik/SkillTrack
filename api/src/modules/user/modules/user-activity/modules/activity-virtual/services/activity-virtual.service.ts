import { Injectable } from "@nestjs/common"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { HolidayHelper } from "src/utils/helpers/holiday.helper"
import { UserVirtualActivityType } from "src/utils/types/enums/user-virtual-activity.enum"
import { IUserVirtualActivity } from "../interfaces"

@Injectable()
export class ActivityVirtualService {
	constructor() {}

	createVirtualActivity(date: Date, holidays: HolidayEntity[]): IUserVirtualActivity | null {
		let activityType
		const { isHoliday, holidayName } = HolidayHelper.checkHoliday(holidays, date)

		if (isHoliday) {
			activityType = UserVirtualActivityType.Holiday
		} else if (DateHelper.isWeekend(date)) {
			activityType = UserVirtualActivityType.Weekend
		} else if (DateHelper.isWorkingDay(holidays, date)) {
			activityType = UserVirtualActivityType.Empty
		} else {
			throw new Error("Unhandled date scenario")
		}

		return {
			date: date,
			activityType: activityType,
			holidayName: holidayName ?? undefined
		}
	}
}
