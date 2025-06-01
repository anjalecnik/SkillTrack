"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityVacationHalMapper = void 0;
const activity_shared_hal_mapper_1 = require("../../activity-shared/mappers/activity-shared-hal.mapper");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
class ActivityVacationHalMapper {
    static mapActivityListItem(data) {
        const activity = data;
        const activityRequest = activity.activityRequest;
        return {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityListItemBase(activity),
            date: date_helper_1.DateHelper.formatIso8601DayString(activity.date),
            dateStart: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.dateStart),
            dateEnd: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.dateEnd),
            description: activityRequest.description ?? undefined,
            reviewedByUserId: activity.reviewedByUserId ?? undefined,
            createdAt: date_helper_1.DateHelper.formatIso8601DayString(activity.createdAt),
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityHalLinks(activity)
        };
    }
    static mapActivityRequestListItem(activityRequest) {
        const activities = activityRequest.userActivities;
        return {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
            dateStart: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.dateStart),
            dateEnd: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.dateEnd),
            reviewedByUserId: activityRequest.reviewedByUserId ?? undefined,
            description: activityRequest.description ?? undefined,
            createdAt: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.createdAt),
            _embedded: {
                activities: activities.map(activity => ({
                    ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestEmbeddedActivityBase(activity),
                    ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityHalLinks(activity)
                })),
                ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestEmbeddedBase(activityRequest)
            },
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestHalLinks(activityRequest)
        };
    }
}
exports.ActivityVacationHalMapper = ActivityVacationHalMapper;
//# sourceMappingURL=activity-vacation-hal.mapper.js.map