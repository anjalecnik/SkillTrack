"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityVacationDBMapper = void 0;
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
class ActivityVacationDBMapper {
    static createActivityVacation({ userId, reportedByUserId }, date, vacationAssignedId) {
        return {
            userId,
            reportedByUserId,
            date,
            vacationAssignedId,
            status: user_activity_status_enum_1.UserActivityStatus.PendingApproval,
            activityType: user_activity_enum_1.UserActivityType.Vacation
        };
    }
    static createActivityRequest(createActivityRequest, activities) {
        const activityRequest = {
            userId: createActivityRequest.userId,
            reportedByUserId: createActivityRequest.reportedByUserId,
            activityType: user_activity_enum_1.UserActivityType.Vacation,
            description: createActivityRequest.description ?? undefined,
            dateStart: createActivityRequest.dateStart,
            dateEnd: createActivityRequest.dateEnd,
            status: user_activity_status_enum_1.UserActivityStatus.PendingApproval
        };
        return { activityRequest, activities };
    }
}
exports.ActivityVacationDBMapper = ActivityVacationDBMapper;
//# sourceMappingURL=activity-vacation-db.mapper.js.map