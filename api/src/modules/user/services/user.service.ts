import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common"
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
import { IUserJoinRequest } from "../interfaces/user-join.interface"

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userAddressService: UserAddressService,
		private readonly userAssignedVacationService: UserAssignedVacationService,
		// private readonly userStatisticService: UserStatisticService,
		// private readonly accessTokenEmitter: AccessTokenEmitterService,
		// private readonly notificationService: NotificationService,
		private readonly utilityService: UtilityService
	) {}

	async getUser(userReadRequest: IUserGetRequest): Promise<IUserDetailsResponse> {
		const userEntity = await this.utilityService.getUserById(userReadRequest.id)

		const subordinateWorkspaceUserIds = await this.utilityService.getSubordinateIdsRecursively(userReadRequest.id, new Set())

		// const [vacationData, sickLeaveCount, activityRequestCount] = await Promise.all([
		// 	this.userStatisticService.getVacationDataStatistics(workspaceUserEntity),
		// 	this.userStatisticService.getSickLeaveUsedStatistics(workspaceUserReadRequest.id, dateRange),
		// 	this.userStatisticService.getActivityRequestsStatistics(workspaceUserReadRequest.id)
		// ])

		return {
			userEntity,
			vacation: undefined,
			sickLeave: { countDays: 0 },
			activityRequestCount: 0,
			isSupervisor: subordinateWorkspaceUserIds.length > 0
		}
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

	private async enrichUserData(data: UserEntity[]): Promise<IUserPaginationItemResponse[]> {
		return await Promise.all(
			data.map((user): IUserPaginationItemResponse => {
				//const vacationData = await this.userStatisticService.getVacationDataStatistics(workspaceUser)
				return {
					...user,
					vacation: undefined
				}
			})
		)
	}

	async invite(userInvitationRequest: IUserInvitationRequest): Promise<UserEntity[]> {
		const userEntities = await this.userRepository.invite(userInvitationRequest)

		// await Promise.all(
		// 	userEntities.map(async userEntity => {
		// 		//	await this.notificationService.sendWorkspaceUserInvitation(workspaceUserEntity.id, NotificationType.Invitation)
		// 	})
		// )

		return userEntities
	}

	async join(userJoinRequest: IUserJoinRequest): Promise<IUserDetailsResponse> {
		const userJoined = await this.userRepository.joinWorkspaceByWhitelist(userJoinRequest)

		//await this.accessTokenEmitter.invalidateAccessToken({ userId: userJoined.userId })
		return this.getUser(userJoined)
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
		// if (userPatch.status) {
		// 	await this.accessTokenEmitter.invalidateAccessToken({ id: userEntity.id })
		// }
		return this.getUser(userEntity)
	}

	async validateGetUser(userReadRequest: IUserGetRequest): Promise<boolean> {
		const invokerUserId = userReadRequest?.authPassport?.user.id ?? 0
		const isSupervisor = await this.utilityService.isUserSupervisorToEmployee(invokerUserId, userReadRequest.id)

		if (userReadRequest.authPassport?.user.role === UserRole.User && invokerUserId !== userReadRequest.id && !isSupervisor) {
			throw new ForbiddenException(
				"You do not have permission to view this workspace user.",
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
}
