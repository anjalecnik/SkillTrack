"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRequestTypeHelper = void 0;
const user_activity_enum_1 = require("../types/enums/user-activity.enum");
class ActivityRequestTypeHelper {
    static isBusinessTripRequest(activityRequest) {
        return activityRequest.activityType === user_activity_enum_1.UserActivityType.BusinessTrip;
    }
    static isDailyRequest(activityRequest) {
        return activityRequest.activityType === user_activity_enum_1.UserActivityType.Daily;
    }
    static isSickLeaveRequest(activityRequest) {
        return activityRequest.activityType === user_activity_enum_1.UserActivityType.SickLeave;
    }
    static isVacationRequest(activityRequest) {
        return activityRequest.activityType === user_activity_enum_1.UserActivityType.Vacation;
    }
    static isPerformanceReviewRequest(activityRequest) {
        return activityRequest.activityType === user_activity_enum_1.UserActivityType.PerformanceReview;
    }
    static isActivityRequest(activityRequest) {
        switch (true) {
            case this.isBusinessTripRequest(activityRequest):
                return activityRequest;
            case this.isDailyRequest(activityRequest):
                return activityRequest;
            case this.isSickLeaveRequest(activityRequest):
                return activityRequest;
            case this.isVacationRequest(activityRequest):
                return activityRequest;
            case this.isPerformanceReviewRequest(activityRequest):
                return activityRequest;
            default:
                throw new TypeError("Invalid activity request type");
        }
    }
    static setAsActivityRequest(activityRequest, activityType) {
        switch (true) {
            case this.isBusinessTripRequest(activityRequest):
                return activityRequest;
            case this.isDailyRequest(activityRequest):
                return activityRequest;
            case this.isSickLeaveRequest(activityRequest):
                return activityRequest;
            case this.isVacationRequest(activityRequest):
                return activityRequest;
            case this.isPerformanceReviewRequest(activityRequest):
                return activityRequest;
            default:
                throw new TypeError("Invalid activity request type (set As)");
        }
    }
}
exports.ActivityRequestTypeHelper = ActivityRequestTypeHelper;
//# sourceMappingURL=activity-request-type.helper.js.map