"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityBusinessTripHalMapper = void 0;
const activity_shared_hal_mapper_1 = require("../../activity-shared/mappers/activity-shared-hal.mapper");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const date_mapper_1 = require("../../../../../../../utils/mappers/date.mapper");
class ActivityBusinessTripHalMapper {
    static mapActivityListItem(data) {
        const activity = data;
        const activityRequest = activity.activityRequest;
        return {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityListItemBase(activity),
            date: date_helper_1.DateHelper.formatIso8601DayString(activity.date),
            dateStart: date_mapper_1.DateMapper.mapSeparateDateTime(activityRequest.dateStart),
            dateEnd: date_mapper_1.DateMapper.mapSeparateDateTime(activityRequest.dateEnd),
            distanceInKM: activityRequest.distanceInKM ?? undefined,
            accommodationCost: activityRequest.accommodationCost ?? undefined,
            foodCost: activityRequest.foodCost ?? undefined,
            otherCost: activityRequest.otherCost ?? undefined,
            location: activityRequest.location,
            description: activityRequest.description ?? undefined,
            projectId: activity.projectId ?? undefined,
            projectName: activity.project?.name,
            reviewedByUserId: activity.reviewedByUserId ?? undefined,
            createdAt: date_helper_1.DateHelper.formatIso8601DayString(activity.createdAt),
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityHalLinks(activity)
        };
    }
    static mapActivityRequestListItem(activityRequest) {
        const activities = activityRequest.userActivities;
        return {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
            dateStart: date_mapper_1.DateMapper.mapSeparateDateTime(activityRequest.dateStart),
            dateEnd: date_mapper_1.DateMapper.mapSeparateDateTime(activityRequest.dateEnd),
            distanceInKM: activityRequest.distanceInKM ?? undefined,
            accommodationCost: activityRequest.accommodationCost ?? undefined,
            foodCost: activityRequest.foodCost ?? undefined,
            otherCost: activityRequest.otherCost ?? undefined,
            location: activityRequest.location,
            description: activityRequest.description ?? undefined,
            projectId: activityRequest.projectId ?? undefined,
            projectName: activityRequest.project ? activityRequest.project.name : undefined,
            reviewedByUserId: activityRequest.reviewedByUserId ?? undefined,
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
exports.ActivityBusinessTripHalMapper = ActivityBusinessTripHalMapper;
//# sourceMappingURL=activity-business-trip-hal.mapper.js.map