"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitySickLeaveDBMapper = void 0;
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
class ActivitySickLeaveDBMapper {
    static createActivityRequest(createActivityRequest, dates, totalWorkspaceAssignedHoursPerDay, totalHours) {
        const activityRequest = {
            userId: createActivityRequest.userId,
            reportedByUserId: createActivityRequest.reportedByUserId,
            dateEnd: createActivityRequest.dateEnd,
            dateStart: createActivityRequest.dateStart,
            description: createActivityRequest.description ?? undefined,
            hours: totalHours,
            status: user_activity_status_enum_1.UserActivityStatus.Approved,
            activityType: user_activity_enum_1.UserActivityType.SickLeave
        };
        const activities = dates.map((date, _) => ({
            userId: createActivityRequest.userId,
            reportedByUserId: createActivityRequest.reportedByUserId,
            date,
            hours: totalWorkspaceAssignedHoursPerDay,
            status: user_activity_status_enum_1.UserActivityStatus.Approved,
            activityType: user_activity_enum_1.UserActivityType.SickLeave
        }));
        return { activityRequest, activities };
    }
}
exports.ActivitySickLeaveDBMapper = ActivitySickLeaveDBMapper;
//# sourceMappingURL=activity-sick-leave-db.mapper.js.map