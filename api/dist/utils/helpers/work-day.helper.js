"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkDayHelper = void 0;
const date_helper_1 = require("./date.helper");
const defaultFilter = { holidays: undefined, workingDays: undefined };
class WorkDayHelper {
    static getWorkingDays(checkForDates, { holidays, workingDays } = { holidays: undefined, workingDays: undefined }) {
        const defaultForHolyday = [];
        const defaultForWorkFreeDay = false;
        return checkForDates.reduce((accDate, currentDate) => {
            const foundHolidays = holidays
                ? holidays.reduce((accHoliday, currentHoliday) => {
                    if (date_helper_1.DateHelper.isSameDay(currentDate, currentHoliday.date))
                        return [...accHoliday, currentHoliday];
                    return accHoliday;
                }, [])
                : defaultForHolyday;
            const isWorkFreeDay = workingDays ? !workingDays.includes(currentDate.getDay()) : defaultForWorkFreeDay;
            const isHoliday = foundHolidays.length > 0;
            return [
                ...accDate,
                {
                    date: currentDate,
                    isHoliday,
                    isWorkFreeDay,
                    isWorkingDay: !isWorkFreeDay && !isHoliday,
                    holidays: foundHolidays
                }
            ];
        }, []);
    }
    static getWorkingDay(checkForDate, filter = defaultFilter) {
        return this.getWorkingDays([checkForDate], filter).at(0);
    }
    static isWorkingDay(checkForDate, filter = defaultFilter) {
        return this.getWorkingDays([checkForDate], filter).at(0).isWorkingDay;
    }
}
exports.WorkDayHelper = WorkDayHelper;
//# sourceMappingURL=work-day.helper.js.map