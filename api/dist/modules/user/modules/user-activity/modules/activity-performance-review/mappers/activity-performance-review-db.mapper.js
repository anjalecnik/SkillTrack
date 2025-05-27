"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityPerformanceReviewDBMapper = void 0;
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
class ActivityPerformanceReviewDBMapper {
    static createActivityRequest(createActivityRequest) {
        const activityRequest = {
            userId: createActivityRequest.userId,
            reportedByUserId: createActivityRequest.reportedByUserId,
            activityType: createActivityRequest.activityType,
            dateStart: createActivityRequest.dateStart,
            status: user_activity_status_enum_1.UserActivityStatus.Approved
        };
        const activity = {
            userId: createActivityRequest.userId,
            reportedByUserId: createActivityRequest.reportedByUserId,
            activityType: user_activity_enum_1.UserActivityType.PerformanceReview,
            date: createActivityRequest.dateStart,
            status: user_activity_status_enum_1.UserActivityStatus.Approved
        };
        return { activityRequest, activity };
    }
}
exports.ActivityPerformanceReviewDBMapper = ActivityPerformanceReviewDBMapper;
//# sourceMappingURL=activity-performance-review-db.mapper.js.map