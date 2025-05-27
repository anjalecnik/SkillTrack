"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityRequestHelper = void 0;
const type_helper_1 = require("./type.helper");
class UserActivityRequestHelper {
    static validateUserRelation(activityRequest) {
        return type_helper_1.TypeHelper.validateRelation(activityRequest, "user");
    }
    static validateActivitiesRelation(activityRequest) {
        return type_helper_1.TypeHelper.validateRelation(activityRequest, "userActivities");
    }
}
exports.UserActivityRequestHelper = UserActivityRequestHelper;
//# sourceMappingURL=user-activity-request.helper.js.map