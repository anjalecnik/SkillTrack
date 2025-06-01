"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWorkOverviewMapper = void 0;
const hal_helper_1 = require("../../../utils/helpers/hal.helper");
const date_helper_1 = require("../../../utils/helpers/date.helper");
const user_activity_enum_1 = require("../../../utils/types/enums/user-activity.enum");
class UserWorkOverviewMapper {
    static mapWorkOverview(data, filter, workingDays, holidays) {
        const users = [];
        const allTotalUserCounts = [];
        for (const user of data.usersWithProjects) {
            const perProjectCounts = this.getUserPerProjectCounts(data, user);
            const totalUserCounts = this.getTotalUserCounts(data, user, holidays);
            allTotalUserCounts.push(totalUserCounts);
            users.push(this.addUserToResponse(user, perProjectCounts, totalUserCounts));
        }
        const href = `api/workspace-hub/workspaces/user-work-overviews`;
        return {
            _links: { self: hal_helper_1.HalHelper.halSelf(href, filter) },
            users: users,
            total: this.getTotalCounts(allTotalUserCounts, workingDays)
        };
    }
    static addUserToResponse(userWithProject, perProjectCounts, totalUserCounts) {
        const user = {
            _embedded: {
                user: {
                    userId: userWithProject.user.id,
                    firstName: userWithProject.user.name,
                    lastName: userWithProject.user.surname
                }
            },
            projects: {
                project: perProjectCounts.map(project => ({
                    _embedded: {
                        projectId: project.projectId,
                        name: project.name
                    },
                    daysOnProject: project.daysOnProject,
                    daysOffProject: project.daysOffProject,
                    businessTripsCount: project.businessTripsCount,
                    dailyActivityCount: project.dailyActivityCount,
                    publicHolidayCount: project.publicHolidayCount,
                    sickLeaveCount: project.sickLeaveCount,
                    vacationCount: project.vacationCount
                }))
            },
            totalUser: {
                daysOnProject: totalUserCounts.daysOnProject,
                daysOffProject: totalUserCounts.daysOffProject,
                businessTripsCount: totalUserCounts.businessTripsCount,
                dailyActivityCount: totalUserCounts.dailyActivityCount,
                publicHolidayCount: totalUserCounts.publicHolidayCount,
                sickLeaveCount: totalUserCounts.sickLeaveCount,
                vacationCount: totalUserCounts.vacationCount
            }
        };
        return user;
    }
    static getTotalCounts(allUserCounts, workingDays) {
        const totals = {
            usersCount: allUserCounts.length,
            workDays: 0,
            daysOnProjectSum: 0,
            daysOffProjectSum: 0,
            dailyActivitySum: 0,
            businessTripSum: 0,
            publicHolidaysSum: 0,
            sickLeaveSum: 0,
            vacationSum: 0
        };
        allUserCounts.forEach(userCounts => {
            totals.daysOnProjectSum += userCounts.daysOnProject;
            totals.daysOffProjectSum += userCounts.daysOffProject;
            totals.dailyActivitySum += userCounts.dailyActivityCount;
            totals.businessTripSum += userCounts.businessTripsCount;
            totals.publicHolidaysSum += userCounts.publicHolidayCount;
            totals.vacationSum += userCounts.vacationCount;
            totals.sickLeaveSum += userCounts.sickLeaveCount;
        });
        totals.workDays = workingDays;
        return totals;
    }
    static getTotalUserCounts(rawData, userWithProject, holidays) {
        const userCounts = {
            projectId: 0,
            name: userWithProject.user.name,
            daysOnProject: 0,
            daysOffProject: 0,
            businessTripsCount: 0,
            dailyActivityCount: 0,
            publicHolidayCount: holidays.length,
            sickLeaveCount: 0,
            vacationCount: 0
        };
        rawData.activitiesWithProject.forEach(activity => {
            if (activity.userId === userWithProject.user.id) {
                this.updateProjectUserCounts(userCounts, activity.activityType);
            }
        });
        rawData.activitiesWithoutProject.forEach(activity => {
            if (activity.userId === userWithProject.user.id) {
                this.updateProjectUserCounts(userCounts, activity.activityType);
            }
        });
        const uniqeDailyActivities = this.filterDailyActivitiesPerUser(rawData);
        uniqeDailyActivities.forEach(activity => {
            if (activity.userId === userWithProject.user.id) {
                userCounts.dailyActivityCount++;
            }
        });
        const userCountsWithUpdatedProjectDays = this.updateProjectDays(userCounts);
        return userCountsWithUpdatedProjectDays;
    }
    static getUserPerProjectCounts(rawData, userWithProject) {
        const userProjects = userWithProject.projects;
        const projectCountsMap = new Map(userProjects.map(project => [
            project.id,
            {
                projectId: project.id,
                name: project.name,
                daysOnProject: 0,
                daysOffProject: 0,
                businessTripsCount: 0,
                dailyActivityCount: 0,
                publicHolidayCount: 0,
                sickLeaveCount: 0,
                vacationCount: 0
            }
        ]));
        rawData.activitiesWithProject.forEach(activity => {
            if (activity.userId === userWithProject.user.id) {
                const projectData = projectCountsMap.get(activity.projectId);
                this.updateProjectUserCounts(projectData, activity.activityType);
            }
        });
        rawData.activitiesWithoutProject.forEach(activity => {
            if (activity.userId === userWithProject.user.id) {
                const activeProjectIds = this.getActiveProjectIds(activity.date, userProjects);
                activeProjectIds.forEach(projectId => {
                    const projectData = projectCountsMap.get(projectId);
                    this.updateProjectUserCounts(projectData, activity.activityType);
                });
            }
        });
        const uniqeDailyActivities = this.filterDailyActivitiesPerProject(rawData);
        uniqeDailyActivities.forEach(activity => {
            if (activity.userId === userWithProject.user.id) {
                const projectData = projectCountsMap.get(activity.projectId);
                projectData.dailyActivityCount++;
            }
        });
        const updatedProjectCounts = Array.from(projectCountsMap.entries()).map(([_, projectData]) => {
            return this.updateProjectDays(projectData);
        });
        return updatedProjectCounts;
    }
    static updateProjectDays(projectData) {
        projectData.daysOnProject = projectData.dailyActivityCount;
        projectData.daysOffProject = projectData.sickLeaveCount + projectData.vacationCount;
        return projectData;
    }
    static getActiveProjectIds(activityDate, projects) {
        return projects.filter(project => date_helper_1.DateHelper.isDateRangeOverlapping(project.dateStart, project.dateEnd, activityDate, activityDate)).map(project => project.id);
    }
    static filterDailyActivitiesPerProject(data) {
        const dailyActivities = data.activitiesWithProject.filter(activity => activity.activityType === user_activity_enum_1.UserActivityType.Daily);
        const seen = new Set();
        return dailyActivities.filter(activity => {
            const key = `${activity.projectId}-${date_helper_1.DateHelper.formatIso8601DayString(activity.date)}`;
            if (seen.has(key))
                return false;
            seen.add(key);
            return true;
        });
    }
    static filterDailyActivitiesPerUser(data) {
        const seen = new Set();
        return data.activitiesWithProject.filter(activity => {
            if (activity.activityType !== user_activity_enum_1.UserActivityType.Daily)
                return false;
            const key = `${activity.userId}-${date_helper_1.DateHelper.formatIso8601DayString(activity.date)}`;
            if (seen.has(key))
                return false;
            seen.add(key);
            return true;
        });
    }
    static updateProjectUserCounts(projectData, activityType) {
        switch (activityType) {
            case user_activity_enum_1.UserActivityType.BusinessTrip:
                projectData.businessTripsCount++;
                break;
            case user_activity_enum_1.UserActivityType.SickLeave:
                projectData.sickLeaveCount++;
                break;
            case user_activity_enum_1.UserActivityType.Vacation:
                projectData.vacationCount++;
                break;
        }
    }
}
exports.UserWorkOverviewMapper = UserWorkOverviewMapper;
//# sourceMappingURL=user-work-overview.mapper.js.map