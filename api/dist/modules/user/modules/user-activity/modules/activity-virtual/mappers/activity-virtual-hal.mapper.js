"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityVirtualHalMapper = void 0;
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
class ActivityVirtualHalMapper {
    static mapActivityListItem(data) {
        return {
            activityType: data.activityType,
            holidayName: data.holidayName ?? undefined,
            date: date_helper_1.DateHelper.formatIso8601DayString(data.date)
        };
    }
}
exports.ActivityVirtualHalMapper = ActivityVirtualHalMapper;
//# sourceMappingURL=activity-virtual-hal.mapper.js.map