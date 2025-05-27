"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityExpenseHalMapper = void 0;
const activity_shared_hal_mapper_1 = require("../../activity-shared/mappers/activity-shared-hal.mapper");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
class ActivityExpenseHalMapper {
    static mapActivityListItem(data) {
        const activity = data;
        const activityRequest = activity.activityRequest;
        return {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityListItemBase(activity),
            date: date_helper_1.DateHelper.formatIso8601DayString(activity.date),
            reviewedByUserId: activity.reviewedByUserId ?? undefined,
            fileName: activityRequest.fileName ?? undefined,
            fileUrl: activityRequest.fileUrl ?? undefined,
            isPaidWithCompanyCard: activityRequest.isPaidWithCompanyCard,
            valueInEuro: activityRequest.valueInEuro,
            description: activityRequest.description ?? undefined,
            projectId: activity.projectId ?? undefined,
            projectName: activity.project?.name,
            createdAt: date_helper_1.DateHelper.formatIso8601DayString(activity.createdAt),
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityHalLinks(activity)
        };
    }
    static mapActivityRequestListItem(activityRequest) {
        const activities = activityRequest.userActivities;
        return {
            ...activity_shared_hal_mapper_1.ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequest),
            date: date_helper_1.DateHelper.formatIso8601DayString(activityRequest.dateStart),
            fileName: activityRequest.fileName ?? undefined,
            fileUrl: activityRequest.fileUrl ?? undefined,
            isPaidWithCompanyCard: activityRequest.isPaidWithCompanyCard,
            valueInEuro: activityRequest.valueInEuro,
            projectId: activityRequest.projectId ?? undefined,
            projectName: activityRequest.project?.name,
            description: activityRequest.description ?? undefined,
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
exports.ActivityExpenseHalMapper = ActivityExpenseHalMapper;
//# sourceMappingURL=activity-expense-hal.mapper.js.map