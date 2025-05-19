import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TeamEntity } from "src/libs/db/entities/team.entity"
import { DataSource, DeepPartial, FindOptionsRelations, Repository } from "typeorm"
import { GetTeamsQuery } from "../dtos/request/request-team.dto"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { PaginationHelper } from "src/utils/helpers/pagination.helper"

const LOAD_RELATIONS: FindOptionsRelations<TeamEntity> | undefined = undefined

@Injectable()
export class TeamRepository {
	constructor(
		@InjectRepository(TeamEntity)
		private teamRepository: Repository<TeamEntity>,
		private dataSource: DataSource
	) {}

	async save(teamEntity: DeepPartial<TeamEntity>): Promise<TeamEntity> {
		return this.dataSource.transaction(async manager => {
			const { id } = await manager.getRepository(TeamEntity).save(teamEntity)

			return manager.getRepository(TeamEntity).findOneOrFail({ where: { id } })
		})
	}

	async update(teamId: number, teamEntity: DeepPartial<TeamEntity>): Promise<TeamEntity> {
		await this.teamRepository.findOneOrFail({ where: { id: teamId } })

		return this.dataSource.transaction(async manager => {
			await manager.getRepository(TeamEntity).save({
				...teamEntity,
				id: teamId
			})
			return manager.getRepository(TeamEntity).findOneOrFail({ where: { id: teamId }, relations: LOAD_RELATIONS })
		})
	}

	async getTeams(filters: GetTeamsQuery): Promise<IPaginatedResponse<TeamEntity>> {
		const skip = (filters.page - 1) * filters.limit
		const query = this.teamRepository.createQueryBuilder("team")

		if (filters.name) {
			query.andWhere("team.name LIKE :name", { name: `%${filters.name}%` })
		}

		if (filters.sort === "createDate") {
			query.orderBy("team.createDate", this.getSortDir(filters.sortingDir))
		} else if (filters.sort) {
			query.orderBy(`team.${filters.sort}`, this.getSortDir(filters.sortingDir))
		}

		const [Teams, count] = await query.skip(skip).take(filters.limit).getManyAndCount()

		return {
			data: Teams,
			meta: PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count)
		}
	}

	async findOneOrFail(userId: number): Promise<TeamEntity> {
		try {
			return await this.teamRepository.findOneOrFail({ where: { id: userId }, relations: LOAD_RELATIONS })
		} catch (e) {
			throw new NotFoundException("User not found", `User '${userId} does not exists, ${e}`)
		}
	}

	private getSortDir(sortingDir: string): "DESC" | "ASC" {
		return ["desc", "DESC"].includes(sortingDir) ? "DESC" : "ASC"
	}
}
