"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityDailyDBMapper = void 0;
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
class ActivityDailyDBMapper {
    static createActivityRequest(createActivityRequest) {
        const activityRequest = {
            userId: createActivityRequest.userId,
            reportedByUserId: createActivityRequest.reportedByUserId,
            activityType: user_activity_enum_1.UserActivityType.Daily,
            dateStart: createActivityRequest.dateStart,
            status: user_activity_status_enum_1.UserActivityStatus.Approved
        };
        const activities = createActivityRequest.workingHours.map(dailyActivity => ({
            userId: createActivityRequest.userId,
            status: user_activity_status_enum_1.UserActivityStatus.Approved,
            activityType: user_activity_enum_1.UserActivityType.Daily,
            hours: 8,
            projectId: dailyActivity.projectId,
            workLocation: createActivityRequest.workLocation,
            date: createActivityRequest.dateStart,
            reportedByUserId: createActivityRequest.reportedByUserId
        }));
        return { activityRequest, activities };
    }
    static mapUpdateActivityRequest(updateActivityRequest, existingActivityRequest, workingHours) {
        const workingHoursCopy = [...workingHours];
        const dailyActiivities = existingActivityRequest.userActivities.filter(activity => activity.activityType === user_activity_enum_1.UserActivityType.Daily);
        const existingActivitiesWithWorkingHours = this.mapActivitiesToWorkingHours(dailyActiivities, workingHoursCopy);
        if (workingHoursCopy.length <= 0 && existingActivitiesWithWorkingHours.length >= 1) {
            existingActivitiesWithWorkingHours.at(-1).activity.workLocation = updateActivityRequest.workLocation;
            return existingActivitiesWithWorkingHours;
        }
        const newActivitiesWithWorkingHours = this.createNewActivitiesFromRemainingHours(updateActivityRequest, workingHoursCopy);
        return [...existingActivitiesWithWorkingHours, ...newActivitiesWithWorkingHours];
    }
    static mapActivitiesToWorkingHours(activities, workingHours) {
        const mappedActivities = activities.map(activity => {
            const index = workingHours.findIndex(wh => wh.projectId === activity.projectId);
            if (index === -1) {
                return null;
            }
            const [matchingHours] = workingHours.splice(index, 1);
            const activityCreateRequest = {
                activityType: user_activity_enum_1.UserActivityType.Daily,
                status: user_activity_status_enum_1.UserActivityStatus.Approved,
                date: activity.date,
                hours: 8,
                workLocation: activity.workLocation,
                userId: activity.userId,
                reportedByUserId: activity.reportedByUserId,
                projectId: activity.projectId
            };
            return {
                activity: activityCreateRequest,
                workingHour: {
                    type: matchingHours.type,
                    fromDateStart: matchingHours.fromDateStart,
                    toDateEnd: matchingHours.toDateEnd,
                    userId: activity.userId
                }
            };
        });
        return mappedActivities.filter(el => el != null);
    }
    static createNewActivitiesFromRemainingHours(updateRequest, remainingWorkingHours) {
        return remainingWorkingHours.map(workingHour => {
            const newActivity = {
                activityType: user_activity_enum_1.UserActivityType.Daily,
                status: user_activity_status_enum_1.UserActivityStatus.Approved,
                date: updateRequest.date,
                hours: 8,
                workLocation: updateRequest.workLocation,
                userId: updateRequest.userId,
                reportedByUserId: updateRequest.reportedByUserId,
                projectId: workingHour.projectId
            };
            return {
                activity: newActivity,
                workingHour: {
                    type: workingHour.type,
                    fromDateStart: workingHour.fromDateStart,
                    toDateEnd: workingHour.toDateEnd,
                    userId: updateRequest.userId
                }
            };
        });
    }
}
exports.ActivityDailyDBMapper = ActivityDailyDBMapper;
//# sourceMappingURL=activity-daily-db-mapper.js.map