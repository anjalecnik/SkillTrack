import { HalHelper } from "src/utils/helpers/hal.helper"
import { UserWorkOverviewListFilterRequest } from "../dtos/request/user-work-overview-list-filter.request"
import { UserWorkOverviewListHalResponse } from "../dtos/response/user-work-overview-list.hal.response"
import { IRawData, UserWithProject } from "../interfaces/user-work-overview-raw-data.interface"
import { ITotalStatistics, IUserStatistics } from "../interfaces/work-overview-list-hal-response.interface"
import { ProjectUserCounts } from "../interfaces/user-work-overview-project-user-counts.interface"
import { DateHelper } from "src/utils/helpers/date.helper"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

export abstract class UserWorkOverviewMapper {
	static mapWorkOverview(data: IRawData, filter: UserWorkOverviewListFilterRequest, workingDays: number): UserWorkOverviewListHalResponse {
		const users: IUserStatistics[] = []
		const allTotalUserCounts: ProjectUserCounts[] = []
		for (const user of data.usersWithProjects) {
			const perProjectCounts = this.getUserPerProjectCounts(data, user)

			const totalUserCounts = this.getTotalUserCounts(data, user)
			allTotalUserCounts.push(totalUserCounts)

			users.push(this.addUserToResponse(user, perProjectCounts, totalUserCounts))
		}

		const href = `api/workspace-hub/workspaces/user-work-overviews`
		return {
			_links: { self: HalHelper.halSelf(href, filter) },
			users: users,
			total: this.getTotalCounts(allTotalUserCounts, workingDays)
		}
	}

	private static addUserToResponse(userWithProject: UserWithProject, perProjectCounts: ProjectUserCounts[], totalUserCounts: ProjectUserCounts): IUserStatistics {
		const user: IUserStatistics = {
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
		}

		return user
	}

	private static getTotalCounts(allUserCounts: ProjectUserCounts[], workingDays: number): ITotalStatistics {
		const totals: ITotalStatistics = {
			usersCount: allUserCounts.length,
			workDays: 0,
			daysOnProjectSum: 0,
			daysOffProjectSum: 0,
			dailyActivitySum: 0,
			businessTripSum: 0,
			publicHolidaysSum: 0,
			sickLeaveSum: 0,
			vacationSum: 0
		}

		allUserCounts.forEach(userCounts => {
			totals.daysOnProjectSum += userCounts.daysOnProject
			totals.daysOffProjectSum += userCounts.daysOffProject
			totals.dailyActivitySum += userCounts.dailyActivityCount
			totals.businessTripSum += userCounts.businessTripsCount
			totals.publicHolidaysSum += userCounts.publicHolidayCount
			totals.vacationSum += userCounts.vacationCount
			totals.sickLeaveSum += userCounts.sickLeaveCount
		})
		totals.workDays = workingDays

		return totals
	}

	private static getTotalUserCounts(rawData: IRawData, userWithProject: UserWithProject): ProjectUserCounts {
		const userCounts: ProjectUserCounts = {
			projectId: 0,
			name: userWithProject.user.name,
			daysOnProject: 0,
			daysOffProject: 0,
			businessTripsCount: 0,
			dailyActivityCount: 0,
			publicHolidayCount: 0,
			sickLeaveCount: 0,
			vacationCount: 0
		}

		//Count activitiesWithProject
		rawData.activitiesWithProject.forEach(activity => {
			if (activity.userId === userWithProject.user.id) {
				this.updateProjectUserCounts(userCounts, activity.activityType)
			}
		})

		//Count activitiesWithoutProject
		rawData.activitiesWithoutProject.forEach(activity => {
			if (activity.userId === userWithProject.user.id) {
				this.updateProjectUserCounts(userCounts, activity.activityType)
			}
		})

		//Count Daily activities
		const uniqeDailyActivities = this.filterDailyActivitiesPerUser(rawData)
		uniqeDailyActivities.forEach(activity => {
			if (activity.userId === userWithProject.user.id) {
				userCounts.dailyActivityCount++
			}
		})

		const userCountsWithUpdatedProjectDays = this.updateProjectDays(userCounts)

		return userCountsWithUpdatedProjectDays
	}

	private static getUserPerProjectCounts(rawData: IRawData, userWithProject: UserWithProject): ProjectUserCounts[] {
		const userProjects = userWithProject.projects
		const projectCountsMap: Map<number, ProjectUserCounts> = new Map(
			userProjects.map(project => [
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
			])
		)

		// Count activitiesWithProject
		rawData.activitiesWithProject.forEach(activity => {
			if (activity.userId === userWithProject.user.id) {
				const projectData = projectCountsMap.get(activity.projectId!)
				this.updateProjectUserCounts(projectData!, activity.activityType)
			}
		})

		// Count activitiesWithoutProject
		rawData.activitiesWithoutProject.forEach(activity => {
			if (activity.userId === userWithProject.user.id) {
				const activeProjectIds = this.getActiveProjectIds(activity.date, userProjects)
				activeProjectIds.forEach(projectId => {
					const projectData = projectCountsMap.get(projectId)
					this.updateProjectUserCounts(projectData!, activity.activityType)
				})
			}
		})

		//Count Daily activities
		const uniqeDailyActivities = this.filterDailyActivitiesPerProject(rawData)
		uniqeDailyActivities.forEach(activity => {
			if (activity.userId === userWithProject.user.id) {
				const projectData = projectCountsMap.get(activity.projectId!)
				projectData!.dailyActivityCount++
			}
		})

		const updatedProjectCounts = Array.from(projectCountsMap.entries()).map(([_, projectData]) => {
			return this.updateProjectDays(projectData)
		})

		return updatedProjectCounts
	}

	private static updateProjectDays(projectData: ProjectUserCounts): ProjectUserCounts {
		projectData.daysOnProject = projectData.dailyActivityCount

		projectData.daysOffProject = projectData.sickLeaveCount + projectData.vacationCount
		return projectData
	}

	private static getActiveProjectIds(activityDate: Date, projects: ProjectEntity[]): number[] {
		return projects.filter(project => DateHelper.isDateRangeOverlapping(project.dateStart, project.dateEnd, activityDate, activityDate)).map(project => project.id)
	}

	private static filterDailyActivitiesPerProject(data: IRawData): UserActivityEntity[] {
		const dailyActivities = data.activitiesWithProject.filter(activity => activity.activityType === UserActivityType.Daily)
		const seen = new Set<string>()
		return dailyActivities.filter(activity => {
			const key = `${activity.projectId}-${DateHelper.formatIso8601DayString(activity.date)}`
			if (seen.has(key)) return false
			seen.add(key)
			return true
		})
	}

	private static filterDailyActivitiesPerUser(data: IRawData): UserActivityEntity[] {
		const seen = new Set<string>()
		return data.activitiesWithProject.filter(activity => {
			if (activity.activityType !== UserActivityType.Daily) return false

			const key = `${activity.userId}-${DateHelper.formatIso8601DayString(activity.date)}`
			if (seen.has(key)) return false
			seen.add(key)
			return true
		})
	}

	private static updateProjectUserCounts(projectData: ProjectUserCounts, activityType: UserActivityType) {
		switch (activityType) {
			case UserActivityType.BusinessTrip:
				projectData.businessTripsCount++
				break
			case UserActivityType.PublicHoliday:
				projectData.publicHolidayCount++
				break
			case UserActivityType.SickLeave:
				projectData.sickLeaveCount++
				break
			case UserActivityType.Vacation:
				projectData.vacationCount++
				break
		}
	}
}
