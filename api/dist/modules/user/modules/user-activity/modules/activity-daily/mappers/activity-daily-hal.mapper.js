"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityDailyHalMapper = void 0;
const activity_shared_hal_mapper_1 = require("../../activity-shared/mappers/activity-shared-hal.mapper");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const user_working_hours_mapper_1 = require("../../../../user-working-hours/mappers/user-working-hours.mapper");
class ActivityDailyHalMapper {
    static mapActivityListItem(data) {
        const activity = data;
        const response = {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityListItemBase(activity),
            date: date_helper_1.DateHelper.formatIso8601DayString(activity.date),
            hours: activity.hours,
            reviewedByUserId: activity.reviewedByUserId ?? undefined,
            workLocation: activity.workLocation,
            createdAt: date_helper_1.DateHelper.formatIso8601DayString(activity.createdAt),
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityHalLinks(activity)
        };
        if (activity.workingHours) {
            response.workingHours = user_working_hours_mapper_1.UserWorkingHoursMapper.mapUserWorkingHoursListItem(activity);
        }
        return response;
    }
    static mapActivityRequestListItem(activityRequest) {
        const activities = activityRequest.activities;
        return {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
            date: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.dateStart),
            lunch: activityRequest.lunch,
            createdAt: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.createdAt),
            _embedded: {
                activities: activities.map(activity => ({
                    ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestEmbeddedActivityBase(activity),
                    hours: activity.hours,
                    workLocation: activity.workLocation,
                    ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityHalLinks(activity),
                    workingHour: user_working_hours_mapper_1.UserWorkingHoursMapper.mapUserWorkingHoursListItem(activity)
                })),
                ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestEmbeddedBase(activityRequest)
            },
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestHalLinks(activityRequest)
        };
    }
    static mapPrefillActivityRequestListItem(activityRequest) {
        const activities = activityRequest.activities;
        return {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
            date: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.dateStart),
            createdAt: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.createdAt),
            lunch: activityRequest.lunch,
            workLocation: activities.at(-1)?.workLocation,
            _embedded: {
                workingHours: user_working_hours_mapper_1.UserWorkingHoursMapper.mapUserWorkingHoursList(activities) ?? [],
                ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestEmbeddedBase(activityRequest)
            },
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestHalLinks(activityRequest)
        };
    }
    static mapLastDailyActivityRequestHal(lastDaily) {
        if (!lastDaily)
            return undefined;
        return this.mapActivityRequestListItem(lastDaily);
    }
}
exports.ActivityDailyHalMapper = ActivityDailyHalMapper;
//# sourceMappingURL=activity-daily-hal.mapper.js.map