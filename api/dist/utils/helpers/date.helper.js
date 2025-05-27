"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importStar(require("dayjs"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const holiday_helper_1 = require("./holiday.helper");
dayjs_1.default.extend(utc_1.default);
(0, dayjs_1.extend)(timezone_1.default);
(0, dayjs_1.extend)(isSameOrAfter_1.default);
class DateHelper {
    static getStartOfDay(date) {
        return (0, dayjs_1.default)(date).hour(0).minute(0).second(0).millisecond(0).toDate();
    }
    static getEndOfDay(date) {
        return (0, dayjs_1.default)(date).hour(23).minute(59).second(59).millisecond(999).toDate();
    }
    static getStartOfYear(date) {
        return new Date(date.getFullYear(), 0);
    }
    static getEndOfYear(date) {
        return new Date(date.getFullYear(), 12, 0, 23, 59, 59);
    }
    static getStartOfMonth(year, month) {
        return new Date(year, month - 1, 1, 23, 59, 59);
    }
    static setDateOfCurrentYearFromMMDDFromat(date, currentDate = new Date()) {
        return new Date(currentDate.getFullYear().toString() + "-" + date);
    }
    static add(date, value, unit) {
        return (0, dayjs_1.default)(date).add(value, unit).toDate();
    }
    static subtract(date, value, unit) {
        return (0, dayjs_1.default)(date).subtract(value, unit).toDate();
    }
    static setDateTime(date, settings) {
        return (0, dayjs_1.default)(date)
            .set("date", settings.date !== undefined ? settings.date : (0, dayjs_1.default)(date).get("date"))
            .set("hours", settings.hours !== undefined ? settings.hours : (0, dayjs_1.default)(date).get("hours"))
            .set("minutes", settings.minutes !== undefined ? settings.minutes : (0, dayjs_1.default)(date).get("minutes"))
            .set("seconds", settings.seconds !== undefined ? settings.seconds : (0, dayjs_1.default)(date).get("seconds"))
            .set("milliseconds", settings.milliseconds !== undefined ? settings.milliseconds : (0, dayjs_1.default)(date).get("milliseconds"))
            .toDate();
    }
    static isInDateRange(dateFrom, dateTo, dateCheck) {
        return dateCheck.getTime() >= dateFrom.getTime() && dateCheck.getTime() <= dateTo.getTime();
    }
    static isDateRangeOverlapping(start1, end1, start2, end2) {
        const minDate = new Date(-8640000000000000);
        const maxDate = new Date(8640000000000000);
        const startDate1 = new Date(start1 || minDate);
        const endDate1 = new Date(end1 || maxDate);
        const startDate2 = new Date(start2 || minDate);
        const endDate2 = new Date(end2 || maxDate);
        return startDate1.getTime() <= endDate2.getTime() && startDate2.getTime() <= endDate1.getTime();
    }
    static isDateRangeOverlappingExclusive(start1, end1, start2, end2) {
        const minDate = new Date(-8640000000000000);
        const maxDate = new Date(8640000000000000);
        const startDate1 = new Date(start1 || minDate);
        const endDate1 = new Date(end1 || maxDate);
        const startDate2 = new Date(start2 || minDate);
        const endDate2 = new Date(end2 || maxDate);
        return startDate1.getTime() < endDate2.getTime() && startDate2.getTime() < endDate1.getTime();
    }
    static getYearZero() {
        return new Date(0);
    }
    static getPlusInfinity() {
        return new Date(8640000000000000);
    }
    static iterateDateRange({ dateStart, dateEnd }) {
        if (dateStart > dateEnd) {
            throw new common_1.InternalServerErrorException("dateEnd must be after dateStart");
        }
        const dates = [];
        for (let iteratorDate = new Date(dateStart); iteratorDate <= dateEnd; iteratorDate.setDate(iteratorDate.getDate() + 1)) {
            dates.push(new Date(iteratorDate));
        }
        return dates;
    }
    static isWeekend(date) {
        return date.getDay() % 6 === 0;
    }
    static isSameDay(date1, date2) {
        return (0, dayjs_1.default)(date1).isSame(date2, "day");
    }
    static isStartOfDay(date) {
        return (0, dayjs_1.default)(date).isSame((0, dayjs_1.default)(date).startOf("day"));
    }
    static isEndOfDay(date) {
        return (0, dayjs_1.default)(date).isSame((0, dayjs_1.default)(date).endOf("day"));
    }
    static isWorkingDay(holidays, date) {
        return !(DateHelper.isWeekend(date) || holiday_helper_1.HolidayHelper.isHoliday(holidays, date));
    }
    static isDateAfterDate(date, dateAfter) {
        return (0, dayjs_1.default)(dateAfter).isAfter(date);
    }
    static isDateAfterOrEqualDate(date, dateAfter) {
        return (0, dayjs_1.default)(dateAfter).isSameOrAfter(date);
    }
    static calculateDaysBetweenDates(dateStart, dateEnd) {
        const differenceMs = Math.abs(dateEnd.getTime() - dateStart.getTime());
        return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    }
    static getHoursBetweenDates(dateStart, dateEnd) {
        if (!dateStart || !dateEnd) {
            return 0;
        }
        const differenceMs = Math.abs(dateEnd.getTime() - dateStart.getTime());
        return differenceMs / (1000 * 60 * 60);
    }
    static getOverlappingHours(start1, end1, start2, end2) {
        if (!start1 || !end1 || !start2 || !end2) {
            return 0;
        }
        const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime()));
        const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime()));
        return Math.max((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60), 0);
    }
    static getDayOfWeek(date) {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
    }
    static subtractWorkspaceOffset(workspaceTimezone, date = new Date()) {
        return dayjs_1.default.tz((0, dayjs_1.default)(date).toISOString(), workspaceTimezone).toDate();
    }
    static addWorkspaceOffset(workspaceTimezone, date = new Date()) {
        const dateOffset = dayjs_1.default.tz(date, workspaceTimezone).utcOffset();
        return (0, dayjs_1.default)(date).add(dateOffset, "minutes").toDate();
    }
    static getWorkspaceEndOfDay(workspaceTimezone, date) {
        const workspaceTime = DateHelper.subtractWorkspaceOffset(workspaceTimezone, date);
        const workspaceTimeEnd = (0, dayjs_1.default)(workspaceTime).add(1, "days").subtract(1, "millisecond").toDate();
        return workspaceTimeEnd;
    }
    static getDateDifferenceInDays(dateStart, dateEnd) {
        return (0, dayjs_1.default)(dateEnd).diff((0, dayjs_1.default)(dateStart), "day") + 1;
    }
    static getDateTime(date = new Date()) {
        return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).getTime();
    }
    static parseDate(date) {
        return date.toISOString().split("T")[0];
    }
    static formatDayMonthYearString(date) {
        return (0, dayjs_1.default)(date).format("DD. MM. YYYY");
    }
    static formatActivityDayMonthYearString(date) {
        return (0, dayjs_1.default)(date).format("ddd, DD. MMM, YYYY");
    }
    static formatActivityDayMonthString(date) {
        return (0, dayjs_1.default)(date).format("ddd, DD. MMM");
    }
    static formatHoursMinutesString(date) {
        return (0, dayjs_1.default)(date).format("HH:mm");
    }
    static formatIso8601DayString(date) {
        return (0, dayjs_1.default)(date).format("YYYY-MM-DD");
    }
    static formatDateTimeString(date) {
        return (0, dayjs_1.default)(date).format("DD.MM.YYYY HH:mm");
    }
    static formatToCustom(date, format) {
        return (0, dayjs_1.default)(date).format(format);
    }
    static isDateWithinOneYearPast(date) {
        const dateDayjs = (0, dayjs_1.default)(date);
        return dateDayjs.isAfter((0, dayjs_1.default)().subtract(365, "day")) && dateDayjs.isBefore((0, dayjs_1.default)());
    }
    static getWeekRange(date) {
        const day = date.getDay();
        const diffToMonday = (day === 0 ? -6 : 1) - day;
        const startDate = DateHelper.add(date, diffToMonday, "day");
        const endDate = DateHelper.add(startDate, 6, "day");
        return { startDate, endDate };
    }
    static getStartDateForQuarter(year, quarter) {
        const quarterNumber = typeof quarter === "string" ? parseInt(quarter.replace("Q", ""), 10) : quarter;
        const lastMonthOfQuarter = quarterNumber * 3;
        return DateHelper.getStartOfMonth(year, lastMonthOfQuarter);
    }
    static getTimeRangesFromDates(dates) {
        if (!dates.length)
            return [];
        const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
        return sorted.reduce((ranges, currentDate, index) => {
            const prev = sorted[index - 1];
            const lastRange = ranges[ranges.length - 1];
            if (index === 0) {
                ranges.push({ dateStart: currentDate, dateEnd: currentDate });
            }
            else if (DateHelper.isSameDay(currentDate, DateHelper.add(prev, 1, "day"))) {
                lastRange.dateEnd = currentDate;
            }
            else {
                ranges.push({ dateStart: currentDate, dateEnd: currentDate });
            }
            return ranges;
        }, []);
    }
}
exports.DateHelper = DateHelper;
//# sourceMappingURL=date.helper.js.map