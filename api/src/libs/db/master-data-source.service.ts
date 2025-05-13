import { Injectable } from "@nestjs/common"
import { DataSource, EntityManager } from "typeorm"

@Injectable()
export class MasterDataSource {
	private readonly _dataSource: DataSource

	constructor(dataSource: DataSource) {
		this._dataSource = dataSource
	}

	get dataSource(): DataSource {
		return this._dataSource
	}

	get manager(): EntityManager {
		return this._dataSource.manager
	}

	async queryOnMaster<T>(runOnMaster: (entityManager: EntityManager) => Promise<T>) {
		const queryRunner = this._dataSource.createQueryRunner("master")
		const entityManager = this._dataSource.createEntityManager(queryRunner)
		try {
			await queryRunner.connect()
			return await runOnMaster(entityManager)
		} finally {
			await queryRunner.release()
			await entityManager.release()
		}
	}
}
