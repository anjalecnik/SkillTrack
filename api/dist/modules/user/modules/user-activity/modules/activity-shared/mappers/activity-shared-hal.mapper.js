"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitySharedHalMapper = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../../../../utils/constants");
const config_1 = require("../../../../../../../utils/config/config");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const hal_helper_1 = require("../../../../../../../utils/helpers/hal.helper");
const user_activity_request_helper_1 = require("../../../../../../../utils/helpers/user-activity-request.helper");
const user_hal_mapper_1 = require("../../../../../mappers/user-hal.mapper");
class ActivitySharedHalMapper {
    static mapActivityHalLinks(activity) {
        const href = `${config_1.Config.get("APP_API_PREFIX")}/${constants_1.ROUTE_USER}/${activity.userId}/${constants_1.ROUTE_ACTIVITY}/${activity.id}`;
        return {
            _links: {
                self: hal_helper_1.HalHelper.halSelf(href)
            }
        };
    }
    static mapActivityRequestHalLinks(activityRequest) {
        const href = `${config_1.Config.get("APP_API_PREFIX")}/${constants_1.ROUTE_USER}/${activityRequest.userId}/${constants_1.ROUTE_ACTIVITY}/${constants_1.ROUTE_REQUEST}/${activityRequest.id}`;
        return {
            _links: {
                self: hal_helper_1.HalHelper.halSelf(href)
            }
        };
    }
    static mapActivityListItemBase({ activityRequestId, ...activityRequestListItemBase }) {
        if (!activityRequestId) {
            throw new common_1.InternalServerErrorException(`Activity '${activityRequestListItemBase.id}' property activityRequestId should not be undefined or null`);
        }
        return {
            ...ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequestListItemBase),
            activityRequestId
        };
    }
    static mapActivityRequestListItemBase({ id, activityType, status, reportedByUserId }) {
        return {
            id,
            activityType,
            status,
            reportedByUserId
        };
    }
    static mapActivityRequestEmbeddedActivityBase({ id, date, status }) {
        return {
            id,
            date: date_helper_1.DateHelper.formatIso8601DayString(date),
            status
        };
    }
    static mapActivityRequestEmbeddedBase(activityRequest) {
        return {
            user: ActivitySharedHalMapper.mapActivityRequestEmbeddedUser(activityRequest),
            actions: ActivitySharedHalMapper.mapActivityRequestEmbeddedActions(activityRequest)
        };
    }
    static mapActivityRequestEmbeddedUser(activityRequest) {
        const activityRequestWithUser = user_activity_request_helper_1.UserActivityRequestHelper.validateUserRelation(activityRequest);
        return user_hal_mapper_1.UserHalMapper.mapHalUserShort(activityRequestWithUser.user);
    }
    static mapActivityRequestEmbeddedActions({ actions }) {
        return actions ?? [];
    }
}
exports.ActivitySharedHalMapper = ActivitySharedHalMapper;
//# sourceMappingURL=activity-shared-hal.mapper.js.map