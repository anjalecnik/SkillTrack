import { HolidayEntity } from "../../libs/db/entities/holiday.entity"
import { IWorkDayMeta } from "../types/interfaces"
import { DateHelper } from "./date.helper"

interface IWorkDaySearchFilter {
	holidays?: HolidayEntity[]
	workingDays?: number[]
}
const defaultFilter: IWorkDaySearchFilter = { holidays: undefined, workingDays: undefined }

export abstract class WorkDayHelper {
	static getWorkingDays(checkForDates: Date[], { holidays, workingDays }: IWorkDaySearchFilter = { holidays: undefined, workingDays: undefined }): IWorkDayMeta[] {
		const defaultForHolyday: HolidayEntity[] = [] // By default is not a holiday
		const defaultForWorkFreeDay: boolean = false // By default is work day

		return checkForDates.reduce((accDate: IWorkDayMeta[], currentDate: Date): IWorkDayMeta[] => {
			const foundHolidays = holidays
				? holidays.reduce((accHoliday: HolidayEntity[], currentHoliday: HolidayEntity): HolidayEntity[] => {
						if (DateHelper.isSameDay(currentDate, currentHoliday.date)) return [...accHoliday, currentHoliday]
						return accHoliday
					}, [])
				: defaultForHolyday

			const isWorkFreeDay = workingDays ? !workingDays.includes(currentDate.getDay()) : defaultForWorkFreeDay
			const isHoliday = foundHolidays.length > 0
			return [
				...accDate,
				{
					date: currentDate,
					isHoliday,
					isWorkFreeDay,
					isWorkingDay: !isWorkFreeDay && !isHoliday,
					holidays: foundHolidays
				}
			]
		}, [])
	}

	static getWorkingDay(checkForDate: Date, filter: IWorkDaySearchFilter = defaultFilter): IWorkDayMeta {
		return this.getWorkingDays([checkForDate], filter).at(0)!
	}

	static isWorkingDay(checkForDate: Date, filter: IWorkDaySearchFilter = defaultFilter): boolean {
		return this.getWorkingDays([checkForDate], filter).at(0)!.isWorkingDay
	}
}
