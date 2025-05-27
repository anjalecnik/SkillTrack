"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateMapper = void 0;
const date_helper_1 = require("../helpers/date.helper");
class DateMapper {
    static mapSeparateDateTime(date) {
        return {
            date: date_helper_1.DateHelper.formatIso8601DayString(date),
            time: date_helper_1.DateHelper.formatHoursMinutesString(date)
        };
    }
}
exports.DateMapper = DateMapper;
//# sourceMappingURL=date.mapper.js.map