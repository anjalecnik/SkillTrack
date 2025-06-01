"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitySharedDBMapper = void 0;
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
class ActivitySharedDBMapper {
    static cancelActivity(activityRequestCancelRequest, activities) {
        return {
            activityRequest: {
                id: activityRequestCancelRequest.id,
                reportedByUserId: activityRequestCancelRequest.reportedByUserId,
                status: user_activity_status_enum_1.UserActivityStatus.Canceled
            },
            activityDaily: activities
                ? activities.map((activity) => ({
                    id: activity.id,
                    reportedByUserId: activityRequestCancelRequest.reportedByUserId,
                    status: user_activity_status_enum_1.UserActivityStatus.Canceled
                }))
                : []
        };
    }
    static reviewActivity(activityRequestReviewRequest, activities) {
        return {
            activityRequest: {
                id: activityRequestReviewRequest.id,
                reviewedByUserId: activityRequestReviewRequest.reviewedByUserId,
                status: activityRequestReviewRequest.status
            },
            activityDaily: activities
                ? activities.map((activity) => ({
                    id: activity.id,
                    reviewedByUserId: activityRequestReviewRequest.reviewedByUserId,
                    status: activityRequestReviewRequest.status
                }))
                : []
        };
    }
}
exports.ActivitySharedDBMapper = ActivitySharedDBMapper;
//# sourceMappingURL=activity-shared-db.mapper.js.map