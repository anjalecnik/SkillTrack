"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLunchHalMapper = void 0;
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
class ActivityLunchHalMapper {
    static mapActivityListItem(activity) {
        return {
            id: activity.id,
            activityType: user_activity_enum_1.UserActivityType.Lunch,
            date: date_helper_1.DateHelper.formatIso8601DayString(activity.date)
        };
    }
}
exports.ActivityLunchHalMapper = ActivityLunchHalMapper;
//# sourceMappingURL=activity-lunch-hal.mapper.js.map