"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityHalMapper = void 0;
const common_1 = require("@nestjs/common");
const activity_business_trip_hal_mapper_1 = require("../modules/activity-business-trip/mappers/activity-business-trip-hal.mapper");
const activity_daily_hal_mapper_1 = require("../modules/activity-daily/mappers/activity-daily-hal.mapper");
const activity_sick_leave_hal_mapper_1 = require("../modules/activity-sick-leave/mappers/activity-sick-leave-hal.mapper");
const activity_vacation_hal_mapper_1 = require("../modules/activity-vacation/mappers/activity-vacation-hal.mapper");
const activity_virtual_hal_mapper_1 = require("../modules/activity-virtual/mappers/activity-virtual-hal.mapper");
const activity_performance_review_hal_mapper_1 = require("../modules/activity-performance-review/mappers/activity-performance-review-hal.mapper");
const activity_lunch_hal_mapper_1 = require("../modules/activity-lunch/mappers/activity-lunch-hal.mapper");
const config_1 = require("../../../../../utils/config/config");
const constants_1 = require("../../../../../utils/constants");
const hal_helper_1 = require("../../../../../utils/helpers/hal.helper");
const user_virtual_activity_enum_1 = require("../../../../../utils/types/enums/user-virtual-activity.enum");
const user_activity_enum_1 = require("../../../../../utils/types/enums/user-activity.enum");
class UserActivityHalMapper {
    static mapUserActivityListHal(data, filters, pathParams) {
        const url = this.composeUserActivityListPath(pathParams);
        return {
            _links: {
                self: hal_helper_1.HalHelper.halSelf(url, filters)
            },
            activities: [...data.map(activity => this.mapActivityHal(activity))]
        };
    }
    static mapActivityHal(activity) {
        if (activity.activityType in user_virtual_activity_enum_1.UserVirtualActivityType) {
            return activity_virtual_hal_mapper_1.ActivityVirtualHalMapper.mapActivityListItem(activity);
        }
        if (activity.activityType === user_activity_enum_1.UserActivityType.BusinessTrip)
            return activity_business_trip_hal_mapper_1.ActivityBusinessTripHalMapper.mapActivityListItem(activity);
        if (activity.activityType === user_activity_enum_1.UserActivityType.Daily)
            return activity_daily_hal_mapper_1.ActivityDailyHalMapper.mapActivityListItem(activity);
        if (activity.activityType === user_activity_enum_1.UserActivityType.SickLeave)
            return activity_sick_leave_hal_mapper_1.ActivitySickLeaveHalMapper.mapActivityListItem(activity);
        if (activity.activityType === user_activity_enum_1.UserActivityType.Vacation)
            return activity_vacation_hal_mapper_1.ActivityVacationHalMapper.mapActivityListItem(activity);
        if (activity.activityType === user_activity_enum_1.UserActivityType.PerformanceReview)
            return activity_performance_review_hal_mapper_1.ActivityPerformanceReviewHalMapper.mapActivityListItem(activity);
        if (activity.activityType === user_activity_enum_1.UserActivityType.Lunch)
            return activity_lunch_hal_mapper_1.ActivityLunchHalMapper.mapActivityListItem(activity);
        throw new common_1.InternalServerErrorException("ActivityType is missing");
    }
    static composeUserActivityListPath(pathParams) {
        return `${config_1.Config.get("APP_API_PREFIX")}/${constants_1.ROUTE_USER}/${pathParams.userId}/${constants_1.ROUTE_ACTIVITY}`;
    }
}
exports.UserActivityHalMapper = UserActivityHalMapper;
//# sourceMappingURL=user-activity-hal.mapper.js.map