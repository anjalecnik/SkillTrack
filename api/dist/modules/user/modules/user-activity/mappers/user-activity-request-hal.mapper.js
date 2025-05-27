"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityRequestHalMapper = void 0;
const common_1 = require("@nestjs/common");
const activity_business_trip_hal_mapper_1 = require("../modules/activity-business-trip/mappers/activity-business-trip-hal.mapper");
const activity_daily_hal_mapper_1 = require("../modules/activity-daily/mappers/activity-daily-hal.mapper");
const activity_sick_leave_hal_mapper_1 = require("../modules/activity-sick-leave/mappers/activity-sick-leave-hal.mapper");
const activity_vacation_hal_mapper_1 = require("../modules/activity-vacation/mappers/activity-vacation-hal.mapper");
const activity_performance_review_hal_mapper_1 = require("../modules/activity-performance-review/mappers/activity-performance-review-hal.mapper");
const config_1 = require("../../../../../utils/config/config");
const constants_1 = require("../../../../../utils/constants");
const hal_helper_1 = require("../../../../../utils/helpers/hal.helper");
const pagination_helper_1 = require("../../../../../utils/helpers/pagination.helper");
const user_activity_enum_1 = require("../../../../../utils/types/enums/user-activity.enum");
class UserActivityRequestHalMapper {
    static composeUserRequestListPath(pathParams) {
        return `${config_1.Config.get("APP_API_PREFIX")}/${constants_1.ROUTE_USER}/${pathParams.userId}/${constants_1.ROUTE_ACTIVITY}/${constants_1.ROUTE_REQUEST}`;
    }
    static composeUserRequestOverviewPaginationPath(pathParams) {
        return `${config_1.Config.get("APP_API_PREFIX")}/${constants_1.ROUTE_USER}/${pathParams.userId}/${constants_1.ROUTE_ACTIVITY}/${constants_1.ROUTE_REQUEST}/overview`;
    }
    static mapUserActivityRequestListHal(activityRequests, filters, pathParams) {
        const url = this.composeUserRequestListPath(pathParams);
        return {
            _links: {
                self: hal_helper_1.HalHelper.halSelf(url, filters)
            },
            requests: [...activityRequests.map(activityRequest => this.mapActivityRequestHal(activityRequest))]
        };
    }
    static mapUserActivityRequestPaginationHal({ data: activityRequests, meta }, filters, pathParams) {
        const url = this.composeUserRequestOverviewPaginationPath(pathParams);
        hal_helper_1.HalHelper.halPaginationLinks(url, filters, meta);
        return {
            _links: hal_helper_1.HalHelper.halPaginationLinks(url, filters, meta),
            ...pagination_helper_1.PaginationHelper.mapPaginationMetaResponse(meta),
            _embedded: {
                requests: [...activityRequests.map(activityRequest => this.mapActivityRequestHal(activityRequest))]
            }
        };
    }
    static mapActivityRequestHal(activityRequest) {
        switch (activityRequest.activityType) {
            case user_activity_enum_1.UserActivityType.BusinessTrip:
                return activity_business_trip_hal_mapper_1.ActivityBusinessTripHalMapper.mapActivityRequestListItem(activityRequest);
            case user_activity_enum_1.UserActivityType.Daily:
                return activity_daily_hal_mapper_1.ActivityDailyHalMapper.mapActivityRequestListItem(activityRequest);
            case user_activity_enum_1.UserActivityType.SickLeave:
                return activity_sick_leave_hal_mapper_1.ActivitySickLeaveHalMapper.mapActivityRequestListItem(activityRequest);
            case user_activity_enum_1.UserActivityType.Vacation:
                return activity_vacation_hal_mapper_1.ActivityVacationHalMapper.mapActivityRequestListItem(activityRequest);
            case user_activity_enum_1.UserActivityType.PerformanceReview:
                return activity_performance_review_hal_mapper_1.ActivityPerformanceReviewHalMapper.mapActivityRequestListItem(activityRequest);
            default:
                throw new common_1.InternalServerErrorException("Activity type is missing");
        }
    }
}
exports.UserActivityRequestHalMapper = UserActivityRequestHalMapper;
//# sourceMappingURL=user-activity-request-hal.mapper.js.map