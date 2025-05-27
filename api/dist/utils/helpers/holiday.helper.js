"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayHelper = void 0;
const date_helper_1 = require("./date.helper");
class HolidayHelper {
    static isHoliday(holidays, date) {
        return !!holidays.find(holiday => date_helper_1.DateHelper.isSameDay(holiday.date, date));
    }
    static checkHoliday(holidays, date) {
        const holiday = holidays.find(holiday => date_helper_1.DateHelper.isSameDay(holiday.date, date));
        return {
            isHoliday: Boolean(holiday),
            holidayName: holiday?.name || null
        };
    }
    static isHolidayOnWorkday(holidays, date) {
        return HolidayHelper.isHoliday(holidays, date) && !date_helper_1.DateHelper.isWeekend(new Date(date));
    }
}
exports.HolidayHelper = HolidayHelper;
//# sourceMappingURL=holiday.helper.js.map