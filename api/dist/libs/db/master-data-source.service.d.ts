import { DataSource, EntityManager } from "typeorm";
export declare class MasterDataSource {
    private readonly _dataSource;
    constructor(dataSource: DataSource);
    get dataSource(): DataSource;
    get manager(): EntityManager;
    queryOnMaster<T>(runOnMaster: (entityManager: EntityManager) => Promise<T>): Promise<T>;
}
