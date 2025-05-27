"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityBusinessTripDBMapper = void 0;
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
class ActivityBusinessTripDBMapper {
    static createActivityRequest(createActivityRequest, dates, assignedUserWorkHours) {
        const activityRequest = {
            userId: createActivityRequest.userId,
            reportedByUserId: createActivityRequest.reportedByUserId,
            activityType: createActivityRequest.activityType,
            description: createActivityRequest.description ?? undefined,
            projectId: createActivityRequest.projectId ?? undefined,
            dateStart: createActivityRequest.dateStart,
            dateEnd: createActivityRequest.dateEnd,
            distanceInKM: createActivityRequest.distanceInKM ?? undefined,
            location: createActivityRequest.location,
            status: user_activity_status_enum_1.UserActivityStatus.PendingApproval
        };
        const activities = this.mapActivitiesPerDay(createActivityRequest, dates, assignedUserWorkHours, createActivityRequest.projectId);
        return { activityRequest, activities };
    }
    static updateActivityRequest(updateActivityRequest, dates, assignedUserWorkHours) {
        const activities = this.mapActivitiesPerDay(updateActivityRequest, dates, assignedUserWorkHours, updateActivityRequest.projectId);
        return {
            activities
        };
    }
    static mapActivitiesPerDay(reporter, dates, assignedUserWorkHours, projectId) {
        return dates.map(date => ({
            userId: reporter.userId,
            reportedByUserId: reporter.reportedByUserId,
            date: date,
            status: user_activity_status_enum_1.UserActivityStatus.PendingApproval,
            activityType: user_activity_enum_1.UserActivityType.BusinessTrip,
            hours: assignedUserWorkHours,
            projectId: projectId ?? undefined
        }));
    }
}
exports.ActivityBusinessTripDBMapper = ActivityBusinessTripDBMapper;
//# sourceMappingURL=activity-business-trip-db.mapper.js.map