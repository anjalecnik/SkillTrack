import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { UserRepository } from "../repository/user.repository"
import { IUserGetRequest, IUserInvitationRequest, IUserPaginationFilterRequest, IUserPatchRequest } from "../interfaces"
import { IUserDetailsResponse } from "../interfaces/details-response.interface"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { IUserPaginationItemResponse } from "../interfaces/user-pagination-item-response.interface"
import { IUserSubordinatesPaginationFilterRequest } from "../interfaces/user-subordinates-pagination-filter-request.interface"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { UserAddressService } from "../modules/user-address/services/user-address.service"
import { UserAssignedVacationService } from "../modules/user-assigned-vacation/services/user-assigned-vacation.service"
import { IUserWorkOverviewListFilter } from "../interfaces/user-work-overview-list-filter.interface"
import { IRawData, UserWithProject } from "../interfaces/user-work-overview-raw-data.interface"
import { DateHelper } from "src/utils/helpers/date.helper"
import _ from "lodash"

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userAddressService: UserAddressService,
		private readonly userAssignedVacationService: UserAssignedVacationService,
		private readonly utilityService: UtilityService
	) {}

	async getUser(userReadRequest: IUserGetRequest): Promise<IUserDetailsResponse> {
		const userEntity = await this.utilityService.getUserById(userReadRequest.id)

		const subordinateWorkspaceUserIds = await this.utilityService.getSubordinateIdsRecursively(userReadRequest.id, new Set())

		return {
			userEntity,
			vacation: undefined,
			sickLeave: { countDays: 0 },
			activityRequestCount: 0,
			isSupervisor: subordinateWorkspaceUserIds.length > 0
		}
	}

	async getOverview(filter: IUserWorkOverviewListFilter) {
		const data: IRawData = await this.getOverviewRawData(filter)
		return data
	}

	async getUserList(filters: IUserPaginationFilterRequest): Promise<IPaginatedResponse<IUserPaginationItemResponse>> {
		if (filters.fullName && filters.fullName.split(" ").filter(name => name.length > 0).length > 3)
			throw new BadRequestException("Name can't contain more than 3 words", `Name can't contain more than 3 words. Requested name: ${filters.fullName}`)

		const pagination = await this.userRepository.getUserList(filters)
		const data = filters.metadata ? await this.enrichUserData(pagination.data) : pagination.data
		return { meta: pagination.meta, data: data }
	}

	async getSubordinatesList(filters: IUserSubordinatesPaginationFilterRequest): Promise<IPaginatedResponse<IUserPaginationItemResponse>> {
		if (filters.fullName && filters.fullName.split(" ").filter(name => name.length > 0).length > 3)
			throw new BadRequestException("Name can't contain more than 3 words", `Name can't contain more than 3 words. Requested name: ${filters.fullName}`)

		const userSubordinates = await this.utilityService.getSubordinateIdsRecursively(filters.id, new Set())

		const pagination = await this.userRepository.getUserList({
			...filters,
			ids: [...(filters.ids ?? []), ...userSubordinates]
		})
		const data = filters.metadata ? await this.enrichUserData(pagination.data) : pagination.data
		return { meta: pagination.meta, data: data }
	}

	async getWorkingDays(data: IRawData, filter: IUserWorkOverviewListFilter): Promise<number> {
		const { dateStart, dateEnd } = this.getDateRange(filter, data)

		let holidaysWithoutWeekends = (await this.utilityService.getHolidaysInDateRange(dateStart, dateEnd)).filter(holiday => !DateHelper.isWeekend(holiday.date))
		holidaysWithoutWeekends = _.uniqBy(holidaysWithoutWeekends, holiday => DateHelper.formatIso8601DayString(holiday.date))

		const weekendsCount = this.countWeekendsInDateRange(dateStart, dateEnd)
		const totalDays = DateHelper.getDateDifferenceInDays(dateStart, dateEnd)

		const workingDaysCount = totalDays - weekendsCount - holidaysWithoutWeekends.length
		return workingDaysCount
	}

	private async enrichUserData(data: UserEntity[]): Promise<IUserPaginationItemResponse[]> {
		return await Promise.all(
			data.map((user): IUserPaginationItemResponse => {
				return {
					...user,
					vacation: undefined
				}
			})
		)
	}

	async invite(userInvitationRequest: IUserInvitationRequest): Promise<UserEntity[]> {
		const userEntities = await this.userRepository.invite(userInvitationRequest)

		return userEntities
	}

	async updateUser(userPatch: IUserPatchRequest): Promise<IUserDetailsResponse> {
		await this.validateUserAddresses(userPatch)
		await this.validateUserAssignedVacation(userPatch)
		await this.validateCircularManagerRelationship(userPatch)

		if (userPatch.projects && userPatch.projects?.length > 0) {
			this.validateUserProjects(userPatch)
			userPatch = this.generateAssignedPercentage(userPatch)
		}

		const userEntity = await this.userRepository.updateUser(userPatch)
		return this.getUser(userEntity)
	}

	async setUserActive(userId: number) {
		await this.userRepository.setUserActive(userId)
	}

	async validateGetUser(userReadRequest: IUserGetRequest): Promise<boolean> {
		const invokerUserId = userReadRequest?.authPassport?.user.id ?? 0
		const isSupervisor = await this.utilityService.isUserSupervisorToEmployee(invokerUserId, userReadRequest.id)

		if (userReadRequest.authPassport?.user.role === UserRole.User && invokerUserId !== userReadRequest.id && !isSupervisor) {
			throw new ForbiddenException(
				"You do not have permission to view this user.",
				`User with ID: '${invokerUserId}' and role ${userReadRequest.authPassport.user.role} attempted to access user with ID: '${userReadRequest.id}'`
			)
		}

		return isSupervisor
	}

	private async validateUserAddresses({ id, addresses }: IUserPatchRequest): Promise<void> {
		if (!addresses) {
			return
		}

		await this.userAddressService.validateAddressRequest(id, addresses)
	}

	async validateUserAssignedVacation({ id, assignedVacations }: IUserPatchRequest): Promise<void> {
		if (!assignedVacations) {
			return
		}

		await this.userAssignedVacationService.validateAssignedVacationRequest(id, assignedVacations)
	}

	private validateUserProjects(userPatch: IUserPatchRequest) {
		if (!userPatch.projects || userPatch.projects.length === 0) return

		const projectIds = userPatch.projects.map(project => project.id)
		const duplicates = projectIds.filter((id, index) => projectIds.indexOf(id) !== index)
		if (duplicates.length !== 0)
			throw new BadRequestException(
				"Some project are assigned multiple times",
				`Workspace user with ID: '${userPatch.id}' assigned theese projects multiple times: ${duplicates.join(", ")}`
			)
	}

	private async validateCircularManagerRelationship(userPatch: IUserPatchRequest): Promise<void> {
		if (!userPatch.managerId || userPatch.managerId === userPatch.id) return

		const userSubordinates = await this.utilityService.getSubordinateIdsRecursively(userPatch.id, new Set())
		if (userSubordinates.includes(userPatch.managerId)) {
			throw new BadRequestException("Circular manager relationship detected")
		}
	}

	private generateAssignedPercentage(userPatch: IUserPatchRequest): IUserPatchRequest {
		const { projects } = userPatch

		if (!projects || projects.length <= 0) {
			return { ...userPatch, projects: [] }
		}
		const projectCount = projects.length

		const basePercentage = Math.floor(100 / projectCount)
		const remainingPercentage = 100 - basePercentage * projectCount

		const updatedProjects = projects.map((project, index) => ({
			...project,
			assignedPercentage: basePercentage + (index < remainingPercentage ? 1 : 0)
		}))

		return { ...userPatch, projects: updatedProjects }
	}

	private async getOverviewRawData(filter: IUserWorkOverviewListFilter): Promise<IRawData> {
		if (!filter.projectIds && !filter.userIds) {
			throw new BadRequestException(
				"Missing filters!",
				`Request to get overview raw data is missing both 'projectIds' and 'userIds' filters. Filter details: ${JSON.stringify(filter)}.`
			)
		}

		let usersWithProjects: UserWithProject[] = []
		if (filter.projectIds && !filter.userIds) {
			usersWithProjects = await this.getProjectParticipants(filter.projectIds)
		} else if (filter.userIds) {
			usersWithProjects = await this.getUserProjects(filter.userIds, filter.projectIds)
		}

		filter = this.augmentFilter(filter, usersWithProjects)

		const activitiesWithoutProject = await this.userRepository.getActivitiesWithoutProject(filter)
		const activitiesWithProject = await this.userRepository.getActivitiesWithProject(filter)

		return { usersWithProjects, activitiesWithoutProject, activitiesWithProject }
	}

	private async getProjectParticipants(projectIds: number[]): Promise<UserWithProject[]> {
		const projectActivities = await this.userRepository.getActiveProjectParticipants(projectIds)

		const projectParticipantIds = _.uniqBy(
			projectActivities.map(activity => activity.user.id),
			id => id
		)
		if (!projectParticipantIds || projectParticipantIds.length === 0) throw new NotFoundException("No users found with this project.")

		const projectParticipants = await this.userRepository.getUsersWithProjects(projectParticipantIds, projectIds)

		const usersWithNoActivities = await this.getUsersWithNoActivities(projectParticipantIds, projectIds, true)
		if (usersWithNoActivities.length > 0) {
			return [
				...usersWithNoActivities,
				...projectParticipants.map(user => ({
					user: user,
					projects: _.uniqBy(
						user.userActivity!.map(activity => activity.project!),
						"id"
					)
				}))
			]
		}

		return projectParticipants.map(user => ({
			user: user,
			projects: _.uniqBy(
				user.userActivity!.map(activity => activity.project!),
				"id"
			)
		}))
	}

	private async getUsersWithNoActivities(projectParticipantIds: number[], projectIds?: number[], onlyProjects?: boolean): Promise<UserWithProject[]> {
		let usersWithNoActivities: UserEntity[] = []
		if (onlyProjects) {
			const assignedUsers = await this.userRepository.getAssiggnedProjectParticipants(projectIds!)
			usersWithNoActivities = assignedUsers.filter(user => !projectParticipantIds.includes(user.id))
		} else {
			usersWithNoActivities = await Promise.all(projectParticipantIds.map(id => this.utilityService.getUserWithProjectsById(id)))
		}

		const usersWithProjects: UserWithProject[] = []
		for (const user of usersWithNoActivities) {
			const relevantProjectIds = user.projects?.map(project => project.projectId)?.filter(projectId => !projectIds || projectIds.includes(projectId))

			if (!relevantProjectIds || relevantProjectIds.length <= 0) {
				usersWithProjects.push({
					user,
					projects: []
				})
				continue
			}
			const projects = await Promise.all(relevantProjectIds.map(id => this.utilityService.getProjectById(id)))
			usersWithProjects.push({
				user,
				projects: projects
			})
		}

		return usersWithProjects
	}

	private async getUserProjects(userIds: number[], projectIds: number[] | undefined): Promise<UserWithProject[]> {
		const usersWithProjects = await this.userRepository.getUsersWithProjects(userIds, projectIds)

		const gotUserIds = usersWithProjects.map(user => user.id)
		const missingUserIds = userIds.filter(user => !gotUserIds.includes(user))

		const usersWithNoActivities = await this.getUsersWithNoActivities(missingUserIds, projectIds, false)
		if (usersWithNoActivities.length > 0) {
			return [
				...usersWithNoActivities,
				...usersWithProjects.map(user => ({
					user: user,
					projects: _.uniqBy(
						user.userActivity!.filter(activity => activity.project !== null).map(activity => activity.project!),
						"id"
					)
				}))
			]
		}

		return usersWithProjects.map(user => ({
			user: user,
			projects: _.uniqBy(
				user.userActivity!.filter(activity => activity.project !== null).map(activity => activity.project!),
				"id"
			)
		}))
	}

	private augmentFilter(filter: IUserWorkOverviewListFilter, allUsersWithProjects: UserWithProject[]): IUserWorkOverviewListFilter {
		const existingProjectIds = filter.projectIds?.slice() ?? []
		const existingUserIds = filter.userIds?.slice() ?? []

		allUsersWithProjects.forEach(userWithProjects => {
			existingProjectIds.push(...(userWithProjects.projects?.map(project => project.id) ?? []))
			existingUserIds.push(userWithProjects.user.id)
		})

		const newFilter = {
			...filter,
			projectIds: _.uniq(existingProjectIds),
			userIds: _.uniq(existingUserIds)
		}

		return newFilter
	}

	private getDateRange(filter: IUserWorkOverviewListFilter, data: IRawData): { dateStart: Date; dateEnd: Date } {
		if (filter.fromDateStart && filter.toDateEnd) {
			return this.validateDateRange(filter.fromDateStart, filter.toDateEnd)
		}

		if (filter.fromDateStart) {
			return { dateStart: filter.fromDateStart, dateEnd: new Date() }
		}

		const { minDate, maxDate } = this.getMinMaxDates(data)
		if (!minDate || !maxDate) {
			return { dateStart: new Date(), dateEnd: new Date() }
		}

		return this.validateDateRange(minDate, maxDate)
	}

	private validateDateRange(dateStart: Date, dateEnd: Date): { dateStart: Date; dateEnd: Date } {
		const totalDaysCount = DateHelper.getDateDifferenceInDays(dateStart, dateEnd)
		const maxDaysCount = (1 + 10) * 365

		if (totalDaysCount > maxDaysCount) {
			const adjustedEndDate = DateHelper.add(dateStart, 1, "years")
			const adjustedStartDate = DateHelper.subtract(dateStart, 10, "years")

			return { dateStart: adjustedStartDate, dateEnd: adjustedEndDate }
		}

		return { dateStart, dateEnd }
	}

	private getMinMaxDates(data: IRawData): { minDate: Date | null; maxDate: Date | null } {
		const allActivities = [...data.activitiesWithoutProject, ...data.activitiesWithProject]

		const minActivity = _.minBy(allActivities, activity => activity.date)
		const maxActivity = _.maxBy(allActivities, activity => activity.date)

		const minDate = minActivity ? new Date(minActivity.date) : null
		const maxDate = maxActivity ? new Date(maxActivity.date) : null

		return {
			minDate,
			maxDate
		}
	}

	private countWeekendsInDateRange(dateStart: Date, dateEnd: Date): number {
		let weekends = 0
		const dayDifference = DateHelper.getDateDifferenceInDays(dateStart, dateEnd)
		const fullWeeks = Math.floor(dayDifference / 7)
		const extraDays = dayDifference % 7

		weekends += fullWeeks * 2

		let currentDate = DateHelper.add(dateStart, fullWeeks * 7, "day")

		for (let i = 0; i < extraDays; i++) {
			if (DateHelper.isWeekend(currentDate)) {
				weekends++
			}
			currentDate = DateHelper.add(currentDate, 1, "day")
		}

		return weekends
	}
}
