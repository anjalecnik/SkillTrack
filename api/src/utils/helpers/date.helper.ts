/* eslint-disable @typescript-eslint/no-unsafe-call */
import { InternalServerErrorException } from "@nestjs/common"
import dayjs, { extend as dayjsExtend, ManipulateType } from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { HolidayEntity } from "../../libs/db/entities/holiday.entity"
import { Nullable } from "../types/interfaces"
import { HolidayHelper } from "./holiday.helper"

dayjsExtend(utc)
dayjsExtend(timezone)
dayjsExtend(isSameOrAfter)

interface IDateTimeSettings {
	date?: number
	hours?: number
	minutes?: number
	seconds?: number
	milliseconds?: number
}

export class DateHelper {
	static getStartOfDay(date: Date): Date {
		return dayjs(date).hour(0).minute(0).second(0).millisecond(0).toDate()
	}

	static getEndOfDay(date: Date): Date {
		return dayjs(date).hour(23).minute(59).second(59).millisecond(999).toDate()
	}

	static getStartOfYear(date: Date): Date {
		return new Date(date.getFullYear(), 0)
	}

	static getEndOfYear(date: Date): Date {
		return new Date(date.getFullYear(), 12, 0, 23, 59, 59) // set to last second of 31 of December
	}

	static getStartOfMonth(year: number, month: number): Date {
		return new Date(year, month - 1, 1, 23, 59, 59)
	}

	static setDateOfCurrentYearFromMMDDFromat(date: string, currentDate = new Date()): Date {
		return new Date(currentDate.getFullYear().toString() + "-" + date)
	}

	static add(date: Date, value: number, unit: ManipulateType): Date {
		return dayjs(date).add(value, unit).toDate()
	}

	static subtract(date: Date, value: number, unit: ManipulateType): Date {
		return dayjs(date).subtract(value, unit).toDate()
	}

	static setDateTime(date: Date, settings: IDateTimeSettings): Date {
		return dayjs(date)
			.set("date", settings.date !== undefined ? settings.date : dayjs(date).get("date"))
			.set("hours", settings.hours !== undefined ? settings.hours : dayjs(date).get("hours"))
			.set("minutes", settings.minutes !== undefined ? settings.minutes : dayjs(date).get("minutes"))
			.set("seconds", settings.seconds !== undefined ? settings.seconds : dayjs(date).get("seconds"))
			.set("milliseconds", settings.milliseconds !== undefined ? settings.milliseconds : dayjs(date).get("milliseconds"))
			.toDate()
	}

	static isInDateRange(dateFrom: Date, dateTo: Date, dateCheck: Date): boolean {
		return dateCheck.getTime() >= dateFrom.getTime() && dateCheck.getTime() <= dateTo.getTime()
	}

	static isDateRangeOverlapping(start1: Nullable<Date>, end1: Nullable<Date>, start2: Nullable<Date>, end2: Nullable<Date>): boolean {
		const minDate = new Date(-8640000000000000) // Equivalent to -Infinity
		const maxDate = new Date(8640000000000000) // Equivalent to +Infinity

		const startDate1 = new Date(start1 || minDate)
		const endDate1 = new Date(end1 || maxDate)
		const startDate2 = new Date(start2 || minDate)
		const endDate2 = new Date(end2 || maxDate)

		return startDate1.getTime() <= endDate2.getTime() && startDate2.getTime() <= endDate1.getTime()
	}

	static isDateRangeOverlappingExclusive(start1: Nullable<Date>, end1: Nullable<Date>, start2: Nullable<Date>, end2: Nullable<Date>): boolean {
		const minDate = new Date(-8640000000000000) // Equivalent to -Infinity
		const maxDate = new Date(8640000000000000) // Equivalent to +Infinity

		const startDate1 = new Date(start1 || minDate)
		const endDate1 = new Date(end1 || maxDate)
		const startDate2 = new Date(start2 || minDate)
		const endDate2 = new Date(end2 || maxDate)

		return startDate1.getTime() < endDate2.getTime() && startDate2.getTime() < endDate1.getTime()
	}

	static getYearZero(): Date {
		return new Date(0)
	}

	static getPlusInfinity(): Date {
		return new Date(8640000000000000)
	}

	static iterateDateRange({ dateStart, dateEnd }: { dateStart: Date; dateEnd: Date }): Date[] {
		if (dateStart > dateEnd) {
			throw new InternalServerErrorException("dateEnd must be after dateStart")
		}

		const dates: Date[] = []
		for (let iteratorDate = new Date(dateStart); iteratorDate <= dateEnd; iteratorDate.setDate(iteratorDate.getDate() + 1)) {
			dates.push(new Date(iteratorDate))
		}
		return dates
	}

	static isWeekend(date: Date): boolean {
		return date.getDay() % 6 === 0
	}

	static isSameDay(date1: Date, date2: Date): boolean {
		return dayjs(date1).isSame(date2, "day")
	}

	static isStartOfDay(date: Date): boolean {
		return dayjs(date).isSame(dayjs(date).startOf("day"))
	}

	static isEndOfDay(date: Date): boolean {
		return dayjs(date).isSame(dayjs(date).endOf("day"))
	}

	static isWorkingDay(holidays: HolidayEntity[], date: Date): boolean {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		return !(DateHelper.isWeekend(date) || HolidayHelper.isHoliday(holidays, date))
	}

	static isDateAfterDate(date: Date, dateAfter: Date): boolean {
		return dayjs(dateAfter).isAfter(date)
	}

	static isDateAfterOrEqualDate(date: Date, dateAfter: Date): boolean {
		return dayjs(dateAfter).isSameOrAfter(date)
	}

	static calculateDaysBetweenDates(dateStart: Date, dateEnd: Date): number {
		const differenceMs = Math.abs(dateEnd.getTime() - dateStart.getTime())
		return Math.ceil(differenceMs / (1000 * 60 * 60 * 24))
	}

	static getHoursBetweenDates(dateStart: Nullable<Date>, dateEnd: Nullable<Date>): number {
		if (!dateStart || !dateEnd) {
			return 0
		}
		const differenceMs = Math.abs(dateEnd.getTime() - dateStart.getTime())
		return differenceMs / (1000 * 60 * 60)
	}

	static getOverlappingHours(start1: Nullable<Date>, end1: Nullable<Date>, start2: Nullable<Date>, end2: Nullable<Date>): number {
		if (!start1 || !end1 || !start2 || !end2) {
			return 0
		}
		const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime()))
		const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime()))

		return Math.max((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60), 0)
	}

	static getDayOfWeek(date: Date): string {
		const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		const dayIndex = date.getDay()
		return daysOfWeek[dayIndex]
	}

	static subtractWorkspaceOffset(workspaceTimezone: string, date: Date = new Date()): Date {
		return dayjs.tz(dayjs(date).toISOString(), workspaceTimezone).toDate()
	}

	static addWorkspaceOffset(workspaceTimezone: string, date: Date = new Date()): Date {
		const dateOffset = dayjs.tz(date, workspaceTimezone).utcOffset()
		return dayjs(date).add(dateOffset, "minutes").toDate()
	}

	static getWorkspaceEndOfDay(workspaceTimezone: string, date: Date): Date {
		const workspaceTime = DateHelper.subtractWorkspaceOffset(workspaceTimezone, date)
		const workspaceTimeEnd = dayjs(workspaceTime).add(1, "days").subtract(1, "millisecond").toDate()

		return workspaceTimeEnd
	}

	static getDateDifferenceInDays(dateStart: Date, dateEnd: Date): number {
		return dayjs(dateEnd).diff(dayjs(dateStart), "day") + 1
	}

	static getDateTime(date: Date = new Date()): number {
		return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).getTime()
	}

	static parseDate(date: Date): string {
		return date.toISOString().split("T")[0]
	}

	static formatDayMonthYearString(date: Date): string {
		return dayjs(date).format("DD. MM. YYYY")
	}

	static formatActivityDayMonthYearString(date: Date): string {
		return dayjs(date).format("ddd, DD. MMM, YYYY")
	}

	static formatActivityDayMonthString(date: Date): string {
		return dayjs(date).format("ddd, DD. MMM")
	}

	static formatHoursMinutesString(date: Date): string {
		return dayjs(date).format("HH:mm")
	}

	static formatIso8601DayString(date: Date): string {
		return dayjs(date).format("YYYY-MM-DD")
	}

	static formatDateTimeString(date: Date): string {
		return dayjs(date).format("DD.MM.YYYY HH:mm")
	}

	static formatToCustom(date: Date, format: string): string {
		return dayjs(date).format(format)
	}

	static isDateWithinOneYearPast(date: Date): boolean {
		const dateDayjs = dayjs(date)
		return dateDayjs.isAfter(dayjs().subtract(365, "day")) && dateDayjs.isBefore(dayjs())
	}

	static getWeekRange(date: Date): { startDate: Date; endDate: Date } {
		const day = date.getDay() // 0 (Sun) to 6 (Sat)
		const diffToMonday = (day === 0 ? -6 : 1) - day

		const startDate = DateHelper.add(date, diffToMonday, "day")
		const endDate = DateHelper.add(startDate, 6, "day")
		return { startDate, endDate }
	}

	static getStartDateForQuarter(year: number, quarter: string | number): Date {
		const quarterNumber = typeof quarter === "string" ? parseInt(quarter.replace("Q", ""), 10) : quarter

		const lastMonthOfQuarter = quarterNumber * 3
		return DateHelper.getStartOfMonth(year, lastMonthOfQuarter)
	}

	static getTimeRangesFromDates(dates: Date[]): { dateStart: Date; dateEnd: Date }[] {
		if (!dates.length) return []

		const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime())

		return sorted.reduce(
			(ranges, currentDate, index) => {
				const prev = sorted[index - 1]
				const lastRange = ranges[ranges.length - 1]

				if (index === 0) {
					ranges.push({ dateStart: currentDate, dateEnd: currentDate })
				} else if (DateHelper.isSameDay(currentDate, DateHelper.add(prev, 1, "day"))) {
					lastRange.dateEnd = currentDate
				} else {
					ranges.push({ dateStart: currentDate, dateEnd: currentDate })
				}

				return ranges
			},
			[] as { dateStart: Date; dateEnd: Date }[]
		)
	}
}
