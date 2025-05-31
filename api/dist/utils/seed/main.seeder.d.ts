import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
export declare class MainSeeder implements Seeder {
    run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>;
}
