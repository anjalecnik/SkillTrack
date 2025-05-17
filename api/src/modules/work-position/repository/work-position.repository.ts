import { Injectable, UnprocessableEntityException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity"
import { FindOptionsRelations, ILike, In, Repository } from "typeorm"
import { IWorkPositionCreateDBRequest, IWorkPositionPaginationFilterDBRequest, IWorkPositionPatchDBRequest } from "../interfaces"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { PaginationHelper } from "src/utils/helpers/pagination.helper"

export const LOAD_RELATIONS: FindOptionsRelations<WorkPositionEntity> = { parentWorkPosition: true }

@Injectable()
export class WorkPositionRepository {
	constructor(
		@InjectRepository(WorkPositionEntity)
		private workPositionRepository: Repository<WorkPositionEntity>
	) {}

	async getWorkPositions(filters: IWorkPositionPaginationFilterDBRequest): Promise<IPaginatedResponse<WorkPositionEntity>> {
		const alias = "workPosition"
		const { orderName, orderSortingDir } = this.setOrder(filters, alias)
		const { skip, take } = PaginationHelper.calculateSkipAndTake(filters)

		const queryBuilder = this.workPositionRepository
			.createQueryBuilder(alias)
			.leftJoinAndSelect(`${alias}.parentWorkPosition`, "parentWorkPosition")
			.orderBy(orderName, orderSortingDir)
			.skip(skip)
			.take(take)
		if (filters.ids) queryBuilder.andWhere({ id: In(filters.ids) })
		if (filters.name) queryBuilder.andWhere({ name: ILike(`%${filters.name}%`) })
		if (filters.levels) queryBuilder.andWhere({ level: In(filters.levels) })

		const [data, count] = await queryBuilder.getManyAndCount()

		return {
			data,
			meta: PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count, skip)
		}
	}

	async getWorkPosition(id: number): Promise<WorkPositionEntity | null> {
		return this.workPositionRepository.findOne({ where: { id }, relations: LOAD_RELATIONS })
	}

	async createWorkPosition(workPositionCreateDBRequest: IWorkPositionCreateDBRequest): Promise<WorkPositionEntity> {
		const { id } = await this.workPositionRepository.save({
			...workPositionCreateDBRequest,
			updatedByUserId: workPositionCreateDBRequest.createdByUserId
		})
		return this.workPositionRepository.findOneOrFail({ where: { id }, relations: LOAD_RELATIONS })
	}

	async patchWorkPosition(workPositionPatchDBRequest: IWorkPositionPatchDBRequest): Promise<WorkPositionEntity> {
		const updateResponse = await this.workPositionRepository.update(workPositionPatchDBRequest.id, {
			name: workPositionPatchDBRequest.name,
			level: workPositionPatchDBRequest.level,
			description: workPositionPatchDBRequest.description,
			workPositionPromotionId: workPositionPatchDBRequest.workPositionPromotionId,
			updatedByUserId: workPositionPatchDBRequest.updatedByUserId
		})
		if (updateResponse.affected !== 1) throw new UnprocessableEntityException("Failed to update Work Position")
		return this.workPositionRepository.findOneOrFail({ where: { id: workPositionPatchDBRequest.id }, relations: LOAD_RELATIONS })
	}

	async deleteWorkPosition(id: number): Promise<void> {
		await this.workPositionRepository.delete({ id })
	}

	async getWorkPositionPromotions(workPositionId: number): Promise<WorkPositionEntity[]> {
		return this.workPositionRepository.find({ where: { workPositionPromotionId: workPositionId } })
	}

	async isWorkPositionAssignedToUser(id: number): Promise<boolean> {
		const workPositionEntity = await this.workPositionRepository.findOneOrFail({ where: { id }, relations: { user: true } })

		return workPositionEntity.user!.length === 0 ? false : true
	}

	private setOrder(filters: IWorkPositionPaginationFilterDBRequest, alias: string): { orderName: string; orderSortingDir: "ASC" | "DESC" } {
		const orderSortingDir: "ASC" | "DESC" = filters.sortingDir === "asc" ? "ASC" : "DESC"
		switch (filters.sort) {
			case "name":
				return {
					orderName: `${alias}.name`,
					orderSortingDir
				}
			case "level":
				return {
					orderName: `${alias}.level`,
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
