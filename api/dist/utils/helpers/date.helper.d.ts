import { ManipulateType } from "dayjs";
import { HolidayEntity } from "../../libs/db/entities/holiday.entity";
import { Nullable } from "../types/interfaces";
interface IDateTimeSettings {
    date?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}
export declare class DateHelper {
    static getStartOfDay(date: Date): Date;
    static getEndOfDay(date: Date): Date;
    static getStartOfYear(date: Date): Date;
    static getEndOfYear(date: Date): Date;
    static getStartOfMonth(year: number, month: number): Date;
    static setDateOfCurrentYearFromMMDDFromat(date: string, currentDate?: Date): Date;
    static add(date: Date, value: number, unit: ManipulateType): Date;
    static subtract(date: Date, value: number, unit: ManipulateType): Date;
    static setDateTime(date: Date, settings: IDateTimeSettings): Date;
    static isInDateRange(dateFrom: Date, dateTo: Date, dateCheck: Date): boolean;
    static isDateRangeOverlapping(start1: Nullable<Date>, end1: Nullable<Date>, start2: Nullable<Date>, end2: Nullable<Date>): boolean;
    static isDateRangeOverlappingExclusive(start1: Nullable<Date>, end1: Nullable<Date>, start2: Nullable<Date>, end2: Nullable<Date>): boolean;
    static getYearZero(): Date;
    static getPlusInfinity(): Date;
    static iterateDateRange({ dateStart, dateEnd }: {
        dateStart: Date;
        dateEnd: Date;
    }): Date[];
    static isWeekend(date: Date): boolean;
    static isSameDay(date1: Date, date2: Date): boolean;
    static isStartOfDay(date: Date): boolean;
    static isEndOfDay(date: Date): boolean;
    static isWorkingDay(holidays: HolidayEntity[], date: Date): boolean;
    static isDateAfterDate(date: Date, dateAfter: Date): boolean;
    static isDateAfterOrEqualDate(date: Date, dateAfter: Date): boolean;
    static calculateDaysBetweenDates(dateStart: Date, dateEnd: Date): number;
    static getHoursBetweenDates(dateStart: Nullable<Date>, dateEnd: Nullable<Date>): number;
    static getOverlappingHours(start1: Nullable<Date>, end1: Nullable<Date>, start2: Nullable<Date>, end2: Nullable<Date>): number;
    static getDayOfWeek(date: Date): string;
    static subtractWorkspaceOffset(workspaceTimezone: string, date?: Date): Date;
    static addWorkspaceOffset(workspaceTimezone: string, date?: Date): Date;
    static getWorkspaceEndOfDay(workspaceTimezone: string, date: Date): Date;
    static getDateDifferenceInDays(dateStart: Date, dateEnd: Date): number;
    static getDateTime(date?: Date): number;
    static parseDate(date: Date): string;
    static formatDayMonthYearString(date: Date): string;
    static formatActivityDayMonthYearString(date: Date): string;
    static formatActivityDayMonthString(date: Date): string;
    static formatHoursMinutesString(date: Date): string;
    static formatIso8601DayString(date: Date): string;
    static formatDateTimeString(date: Date): string;
    static formatToCustom(date: Date, format: string): string;
    static isDateWithinOneYearPast(date: Date): boolean;
    static getWeekRange(date: Date): {
        startDate: Date;
        endDate: Date;
    };
    static getStartDateForQuarter(year: number, quarter: string | number): Date;
    static getTimeRangesFromDates(dates: Date[]): {
        dateStart: Date;
        dateEnd: Date;
    }[];
}
export {};
