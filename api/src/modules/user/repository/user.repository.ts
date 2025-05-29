import { UserEntity } from "src/libs/db/entities/user.entity"
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, EntityManager, FindOptionsRelations, In, Repository } from "typeorm"
import { MasterDataSource } from "../../../libs/db/master-data-source.service"
import { IUserInvitationDBRequest, IUserInvitationListItem, IUserPaginationFilterDBRequest, IUserPatchDBRequest } from "../interfaces"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { PaginationHelper } from "src/utils/helpers/pagination.helper"
import { UserStatus } from "src/utils/types/enums/user-status.enum"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity"
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"

const LOAD_RELATIONS: FindOptionsRelations<UserEntity> = {
	team: true,
	workPosition: { parentWorkPosition: true },
	manager: true,
	notifications: true,
	projects: { project: true },
	addresses: true
}

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		@InjectRepository(ProjectUserEntity)
		private projectUserRepository: Repository<ProjectUserEntity>,
		private readonly masterDataSource: MasterDataSource
	) {}

	async getAllWorkspaceUsers(): Promise<UserEntity[]> {
		return await this.userRepository.find()
	}

	async getUserList(filters: IUserPaginationFilterDBRequest): Promise<IPaginatedResponse<UserEntity>> {
		const alias = "user"
		const orderCriteria = this.setOrder(filters, alias)
		const { skip, take } = PaginationHelper.calculateSkipAndTake(filters)

		const queryBuilder = this.userRepository
			.createQueryBuilder(alias)
			.leftJoinAndSelect(`${alias}.workPosition`, "workPosition")
			.leftJoinAndSelect(`${alias}.projects`, "projects")
			.leftJoinAndSelect(`${alias}.team`, "team")
			.leftJoinAndSelect(`${alias}.performanceReviews`, "performanceReviews")
			.skip(skip)
			.take(take)

		orderCriteria.forEach(({ orderName, orderSortingDir }) => {
			queryBuilder.addOrderBy(orderName, orderSortingDir)
		})

		if (filters.ids) queryBuilder.andWhere({ id: In(filters.ids) })
		if (filters.statuses) queryBuilder.andWhere({ status: In(filters.statuses) })
		if (filters.fullName) {
			queryBuilder.andWhere(`(${alias}.name || ' ' || ${alias}.surname) ILIKE :query`, { query: `%${filters.fullName.trim()}%` })
		}

		const [data, count] = await queryBuilder.getManyAndCount()

		return {
			data,
			meta: PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count, skip)
		}
	}

	async invite(userInvitationRequest: IUserInvitationDBRequest): Promise<UserEntity[]> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const userRepository = entityManager.getRepository(UserEntity)

			return Promise.all(
				userInvitationRequest.invitations.map(async invitation => {
					const invitationObject: IUserInvitationListItem = {
						status: UserStatus.Invited,
						name: invitation.name,
						surname: invitation.surname,
						email: invitation.email,
						invitedByUserId: userInvitationRequest.invitedByUserId
					}

					const userEntity = await userRepository.findOne({ where: { email: invitation.email } })
					if (!userEntity) {
						return userRepository.save({ ...invitationObject, status: UserStatus.Invited })
					}

					throw new BadRequestException(`User email already taken`, `User email already exists: $${invitation.email}`)
				})
			)
		})
	}

	async joinByInvitation(userId: number): Promise<UserEntity> {
		return this.masterDataSource.queryOnMaster(async (entityManager: EntityManager) => {
			const userRepository = entityManager.getRepository(UserEntity)
			await userRepository.update(userId, { status: UserStatus.Active })
			return userRepository.findOneOrFail({ where: { id: userId }, relations: LOAD_RELATIONS })
		})
	}

	async getUserByUserId(userId: number): Promise<UserEntity | null> {
		return this.userRepository.findOne({ where: { id: userId } })
	}

	async updateUser(userPatchRequest: IUserPatchDBRequest) {
		const addresses = this.setUserAddresses(userPatchRequest)
		const assignedVacations = this.setUserAssignedVacations(userPatchRequest)
		const { userProjectsToUpdate, userProjectsToAdd, userProjectsToStay } = await this.setUserProjects(userPatchRequest)

		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const userRepository = entityManager.getRepository(UserEntity)
			const projectUserRepository = entityManager.getRepository(ProjectUserEntity)

			// Soft-delete projects with old assignerPercentage and/or Role
			for (const projectToUpdate of userProjectsToUpdate) {
				await projectUserRepository.softDelete({ projectId: projectToUpdate.projectId, userId: projectToUpdate.userId })
			}

			const userEntity = await userRepository.preload({
				...userPatchRequest,
				addresses: addresses,
				assignedVacations: assignedVacations,
				projects: userPatchRequest.projects ? [...userProjectsToAdd, ...userProjectsToStay] : undefined
			})
			if (!userEntity) throw new InternalServerErrorException("Something went wrong!")
			await userRepository.save(userEntity)
			return userRepository.findOneOrFail({ where: { id: userPatchRequest.id }, relations: LOAD_RELATIONS })
		})
	}

	async setUserActive(userId: number): Promise<UserEntity> {
		return this.masterDataSource.queryOnMaster(async (entityManager: EntityManager) => {
			const userRepository = entityManager.getRepository(UserEntity)

			const user = await userRepository.findOne({ where: { id: userId } })
			if (!user) {
				throw new BadRequestException(`User with ID ${userId} not found`)
			}

			user.status = UserStatus.Active
			await userRepository.save(user)

			return userRepository.findOneOrFail({ where: { id: userId }, relations: LOAD_RELATIONS })
		})
	}

	private setUserAddresses(userPatchRequest: IUserPatchDBRequest): DeepPartial<UserAddressEntity>[] | undefined {
		if (!userPatchRequest.addresses) return undefined

		return userPatchRequest.addresses.reduce((accumulator: DeepPartial<UserAddressEntity>[], address: DeepPartial<UserAddressEntity>) => {
			accumulator.push(
				address.id
					? address
					: {
							...address,
							userId: userPatchRequest.id,
							createdByUserId: userPatchRequest.updatedByUserId!,
							updatedByUserId: userPatchRequest.updatedByUserId!
						}
			)
			return accumulator
		}, [])
	}

	private setUserAssignedVacations(userPatchRequest: IUserPatchDBRequest): DeepPartial<UserVacationAssignedEntity>[] | undefined {
		if (!userPatchRequest.assignedVacations) {
			return undefined
		}

		return userPatchRequest.assignedVacations.reduce((accumulator: DeepPartial<UserVacationAssignedEntity>[], assignedVacation: DeepPartial<UserVacationAssignedEntity>) => {
			accumulator.push(
				assignedVacation.id
					? assignedVacation
					: {
							...assignedVacation,
							userId: userPatchRequest.id,
							createdByUserId: userPatchRequest.updatedByUserId!,
							updatedByUserId: userPatchRequest.updatedByUserId!
						}
			)
			return accumulator
		}, [])
	}

	private async setUserProjects(userPatchRequest: IUserPatchDBRequest) {
		if (!userPatchRequest.projects) {
			return {
				userProjectsToUpdate: [],
				userProjectsToAdd: [],
				userProjectsToStay: []
			}
		}

		const userCurrentProjects = await this.projectUserRepository.find({ where: { userId: userPatchRequest.id } })

		const projectsToUpdate = userCurrentProjects.filter(currentProject => {
			const requestedProject = userPatchRequest.projects!.find(project => project.id === currentProject.projectId)
			if (!requestedProject) return false
			if (requestedProject.assignedPercentage !== currentProject.assignedPercentage || requestedProject.role !== currentProject.role) return true
			return false
		})
		const projectIdsToAdd = userPatchRequest.projects.map(project => project.id).filter(id => !userCurrentProjects.map(project => project.projectId).includes(id))

		const userProjectsToUpdate = this.setUserProjectsToUpdate(userPatchRequest, projectsToUpdate)
		const userProjectsToAdd = this.setUserProjectsToAdd(userPatchRequest, projectIdsToAdd)
		const userProjectsToStay = this.setUserProjectsToStay(userPatchRequest, userCurrentProjects, projectsToUpdate, userProjectsToAdd)

		return {
			userProjectsToUpdate,
			userProjectsToAdd,
			userProjectsToStay
		}
	}

	private setOrder(filters: IUserPaginationFilterDBRequest, alias: string): { orderName: string; orderSortingDir: "ASC" | "DESC" }[] {
		const orderSortingDir: "ASC" | "DESC" = filters.sortingDir === "asc" ? "ASC" : "DESC"

		switch (filters.sort) {
			case "name":
				return [
					{ orderName: `${alias}.name`, orderSortingDir },
					{ orderName: `${alias}.surname`, orderSortingDir }
				]
			case "status":
				return [{ orderName: `${alias}.status`, orderSortingDir }]
			default:
				return [{ orderName: `${alias}.id`, orderSortingDir }]
		}
	}

	private setUserProjectsToUpdate(userPatchRequest: IUserPatchDBRequest, projectsToUpdate: ProjectUserEntity[]): DeepPartial<ProjectUserEntity>[] {
		return projectsToUpdate.map(projectToUpdate => {
			const requestedProject = userPatchRequest.projects!.find(project => project.id === projectToUpdate.projectId)
			if (!requestedProject) throw new InternalServerErrorException("Failed to update project")
			return this.projectUserRepository.create({
				role: requestedProject.role,
				assignedPercentage: requestedProject.assignedPercentage,
				projectId: projectToUpdate.projectId,
				userId: projectToUpdate.userId
			})
		})
	}

	private setUserProjectsToAdd(userPatchRequest: IUserPatchDBRequest, projectIdsToAdd: number[]): DeepPartial<ProjectUserEntity>[] {
		return projectIdsToAdd.map(projectId => {
			const requestedProject = userPatchRequest.projects!.find(project => project.id === projectId)
			if (!requestedProject) throw new InternalServerErrorException("Failed to add project")
			return this.projectUserRepository.create({
				role: requestedProject.role,
				assignedPercentage: requestedProject.assignedPercentage,
				projectId: projectId,
				userId: userPatchRequest.id
			})
		})
	}

	private setUserProjectsToStay(
		userPatchRequest: IUserPatchDBRequest,
		userCurrentProjects: ProjectUserEntity[],
		userProjectsToUpdate: DeepPartial<ProjectUserEntity>[],
		userProjectsToAdd: DeepPartial<ProjectUserEntity>[]
	): DeepPartial<ProjectUserEntity>[] {
		return userCurrentProjects.filter(currentProject => {
			const userProjectToUpdate = userProjectsToUpdate.find(
				projectToUpdate => projectToUpdate.projectId === currentProject.projectId && projectToUpdate.userId === currentProject.userId
			)
			const userProjectToAdd = userProjectsToAdd.find(projectToAdd => projectToAdd.projectId === currentProject.projectId && projectToAdd.userId === currentProject.userId)
			const shouldWorkspaceUserProjectBeRemoved = !userPatchRequest.projects!.map(project => project.id).includes(currentProject.projectId)

			if (!userProjectToUpdate && !userProjectToAdd && !shouldWorkspaceUserProjectBeRemoved) return true
			return false
		})
	}
}
