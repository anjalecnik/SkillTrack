import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { PaginationHelper } from "src/utils/helpers/pagination.helper"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { Brackets, EntityManager, FindOptionsRelations, In, LessThan, MoreThan, Repository } from "typeorm"
import {
	IProjectGetDBRequest,
	IProjectOverviewPaginationFilterDBRequest,
	IProjectCreateDBRequest,
	IProjectDetailsDBResponse,
	IProjectPatchDBRequest,
	IProjectDeleteDBRequest
} from "../interfaces"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ProjectUserRole } from "src/utils/types/enums/project-user-role.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { ProjectStatus } from "src/utils/types/enums/project-status.enum"

const LOAD_RELATIONS: FindOptionsRelations<ProjectEntity> | undefined = undefined

@Injectable()
export class ProjectRepository {
	constructor(
		@InjectRepository(ProjectEntity)
		private projectRepository: Repository<ProjectEntity>,
		@InjectRepository(ProjectUserEntity)
		private projectUserRepository: Repository<ProjectUserEntity>,
		@InjectRepository(UserActivityEntity)
		private userActivityRepository: Repository<UserActivityEntity>,
		private readonly masterDataSource: MasterDataSource
	) {}

	async getProjectOrThrow(ProjectGetDBRequest: IProjectGetDBRequest): Promise<ProjectEntity> {
		const projectEntity = await this.projectRepository.findOne({ where: { ...ProjectGetDBRequest }, relations: LOAD_RELATIONS })

		if (!projectEntity) {
			throw new NotFoundException("Project not found", `Project '${ProjectGetDBRequest.id}' does not exist`)
		}

		return projectEntity
	}

	async getProjectList(filters: IProjectOverviewPaginationFilterDBRequest): Promise<IPaginatedResponse<ProjectEntity>> {
		const alias = "project"
		const { orderName, orderSortingDir } = this.setOrder(filters, alias)
		const { skip, take } = PaginationHelper.calculateSkipAndTake(filters)

		const queryBuilder = this.projectRepository
			.createQueryBuilder(alias)
			.leftJoin("project_jt_user", "projectUser", '"projectUser"."projectId" = project.id')
			.orderBy(orderName, orderSortingDir)
			.skip(skip)
			.take(take)
		if (filters.ids) queryBuilder.andWhere({ id: In(filters.ids) })
		if (filters.name)
			queryBuilder.andWhere(`${alias}.name ILIKE :name`, {
				name: `%${filters.name}%`
			})

		if (filters.statuses) queryBuilder.andWhere(this.getStatusesQuery(alias, filters.statuses))
		if (filters.userIds) queryBuilder.andWhere('"projectUser"."userId" IN (:...userIds)', { userIds: filters.userIds })

		const [data, count] = await queryBuilder.getManyAndCount()

		return {
			data,
			meta: PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count, skip)
		}
	}

	async createProject(projectCreateDBRequest: IProjectCreateDBRequest, dateStart: Date): Promise<IProjectDetailsDBResponse> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const projectRepository = entityManager.getRepository(ProjectEntity)
			const projectEntity = await projectRepository.save({
				...projectCreateDBRequest,
				dateStart,
				createdByUserId: projectCreateDBRequest.createdByUserId,
				updatedByUserId: projectCreateDBRequest.createdByUserId
			})
			const { projectParticipantEntities, userActivityEntities } = await this.getProjectDetails(entityManager, projectEntity)

			return {
				projectEntity: await projectRepository.findOneOrFail({ where: { id: projectEntity.id }, relations: LOAD_RELATIONS }),
				projectParticipantEntities,
				userActivityEntities
			}
		})
	}

	async updateProject(projectPatchDBRequest: IProjectPatchDBRequest): Promise<IProjectDetailsDBResponse> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const projectRepository = entityManager.getRepository(ProjectEntity)
			await projectRepository.update(projectPatchDBRequest.id, {
				name: projectPatchDBRequest.name,
				type: projectPatchDBRequest.type,
				dateStart: projectPatchDBRequest.dateStart,
				dateEnd: projectPatchDBRequest.dateEnd,
				updatedByUserId: projectPatchDBRequest.updatedByUserId
			})
			const projectEntity = await projectRepository.findOneOrFail({ where: { id: projectPatchDBRequest.id }, relations: LOAD_RELATIONS })
			const { projectParticipantEntities, userActivityEntities } = await this.getProjectDetails(entityManager, projectEntity)

			return {
				projectEntity,
				projectParticipantEntities,
				userActivityEntities
			}
		})
	}

	async softDeleteProjects(projectDeleteDBRequest: IProjectDeleteDBRequest): Promise<void> {
		await this.projectRepository.update(
			{ id: In(projectDeleteDBRequest.ids) },
			{
				deletedByUserId: projectDeleteDBRequest.deletedByUserId,
				deletedAt: new Date()
			}
		)
	}

	async getProjectLeads(projectId: number): Promise<UserEntity[]> {
		const projectUserEntities = await this.projectUserRepository.find({
			where: { projectId, role: ProjectUserRole.Lead },
			relations: { user: { projects: true } }
		})
		return projectUserEntities.map(projectUserEntity => projectUserEntity.user!)
	}

	async getProjectParticipants(projectId: number): Promise<UserEntity[]> {
		const projectUserEntities = await this.projectUserRepository.find({
			where: { projectId },
			relations: { user: { projects: true } }
		})
		return projectUserEntities.map(projectWorkspaceUserEntity => projectWorkspaceUserEntity.user!)
	}

	async calculateProjectTotalHours(projectId: number): Promise<number> {
		const result = await this.userActivityRepository
			.createQueryBuilder("userActivity")
			.select("SUM(userActivity.hours)", "total_hours")
			.andWhere("userActivity.projectId = :projectId", { projectId })
			.andWhere("userActivity.activityType = :activityType", { activityType: UserActivityType.Daily })
			.andWhere("userActivity.hours IS NOT NULL")
			.getRawOne()

		return result["total_hours"] ? parseInt(result["total_hours"]) : 0
	}

	private async getProjectDetails(entityManager: EntityManager, projectEntity: ProjectEntity) {
		const projectUserRepository = entityManager.getRepository(ProjectUserEntity)
		const userActivityRepository = entityManager.getRepository(UserActivityEntity)

		const projectUserEntities = await projectUserRepository.find({
			where: { projectId: projectEntity.id },
			relations: { user: { projects: true } }
		})
		const userActivityEntities = await userActivityRepository.find({
			where: { projectId: projectEntity.id, activityType: UserActivityType.Daily }
		})

		return {
			projectParticipantEntities: projectUserEntities.map(projectUserEntity => projectUserEntity.user!),
			userActivityEntities
		}
	}

	private getStatusesQuery(alias: string, statuses: ProjectStatus[]): Brackets {
		const now = new Date()

		return new Brackets(qb => {
			if (statuses.includes(ProjectStatus.Active)) {
				qb.orWhere(`:now BETWEEN ${alias}.dateStart AND COALESCE(${alias}.dateEnd, :now)`, { now })
			}
			if (statuses.includes(ProjectStatus.Inactive)) {
				qb.orWhere({ dateEnd: LessThan(now) })
			}
			if (statuses.includes(ProjectStatus.Future)) {
				qb.orWhere({ dateStart: MoreThan(now) })
			}
		})
	}

	private setOrder(filters: IProjectOverviewPaginationFilterDBRequest, alias: string): { orderName: string; orderSortingDir: "ASC" | "DESC" } {
		const orderSortingDir: "ASC" | "DESC" = filters.sortingDir === "asc" ? "ASC" : "DESC"
		switch (filters.sort) {
			case "name":
				return {
					orderName: `${alias}.name`,
					orderSortingDir
				}
			case "dateEnd":
				return {
					orderName: `${alias}.dateEnd`,
					orderSortingDir
				}
			case "dateStart":
				return {
					orderName: `${alias}.dateStart`,
					orderSortingDir
				}
			default:
				return {
					orderName: `${alias}.id`,
					orderSortingDir
				}
		}
	}
}
