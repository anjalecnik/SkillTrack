"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWorkingHoursMapper = void 0;
const common_1 = require("@nestjs/common");
const user_activity_enum_1 = require("../../../../../utils/types/enums/user-activity.enum");
const date_mapper_1 = require("../../../../../utils/mappers/date.mapper");
const user_working_hours_enum_1 = require("../../../../../utils/types/enums/user-working-hours.enum");
class UserWorkingHoursMapper {
    static mapUserWorkingHoursListItem(activity) {
        return {
            id: activity.workingHoursId,
            type: activity.workingHours.type,
            fromDateStart: date_mapper_1.DateMapper.mapSeparateDateTime(activity.workingHours.fromDateStart),
            toDateEnd: activity.workingHours.toDateEnd ? date_mapper_1.DateMapper.mapSeparateDateTime(activity.workingHours.toDateEnd) : undefined,
            projectName: activity.project?.name ?? null,
            projectId: activity.projectId ?? null
        };
    }
    static mapUserWorkingHoursList(activities) {
        if (activities.some(activity => !activity.workingHours))
            return undefined;
        return activities.map(activity => this.mapUserWorkingHoursListItem(activity));
    }
    static mapAndCombineActivities(existingDailyActivities, createRequest) {
        const activities = existingDailyActivities.map(activity => ({
            userId: activity.userId,
            reportedByUserId: activity.reportedByUserId,
            activityType: user_activity_enum_1.UserActivityType.Daily,
            status: activity.status,
            projectId: activity.projectId ?? null,
            date: activity.date,
            workLocation: activity.workLocation ?? null,
            hours: activity.hours ?? 8
        }));
        const firstActivity = existingDailyActivities[0];
        activities.push({
            userId: firstActivity.userId,
            reportedByUserId: firstActivity.reportedByUserId,
            activityType: user_activity_enum_1.UserActivityType.Daily,
            status: firstActivity.status,
            projectId: createRequest.projectId ?? null,
            date: firstActivity.date,
            workLocation: createRequest.workLocation ?? null,
            hours: 8
        });
        return activities;
    }
    static mapWorkingHoursActivityCreateRequest(createRequest) {
        return {
            type: user_working_hours_enum_1.UserWorkingHoursType.Work,
            fromDateStart: createRequest.dateTime,
            toDateEnd: null,
            projectId: createRequest.projectId
        };
    }
    static mapActivitiesToWorkingHours(activities, workingHours) {
        return activities.map(activity => {
            const index = workingHours.findIndex(wh => wh.projectId === activity.projectId);
            if (index === -1) {
                throw new common_1.NotFoundException(`No matching working hours for project ID: ${activity.projectId}`);
            }
            const [matchingHours] = workingHours.splice(index, 1);
            return {
                activity: activity,
                workingHour: {
                    type: matchingHours.type,
                    fromDateStart: matchingHours.fromDateStart,
                    toDateEnd: matchingHours.toDateEnd,
                    userId: activity.userId
                }
            };
        });
    }
    static mapWorkingHoursUpdateWorkEnd(createRequest, existingWorkingHours) {
        return {
            id: existingWorkingHours.id,
            type: user_working_hours_enum_1.UserWorkingHoursType.Work,
            fromDateStart: existingWorkingHours.fromDateStart,
            toDateEnd: createRequest.dateTime,
            userId: existingWorkingHours.userId
        };
    }
}
exports.UserWorkingHoursMapper = UserWorkingHoursMapper;
//# sourceMappingURL=user-working-hours.mapper.js.map