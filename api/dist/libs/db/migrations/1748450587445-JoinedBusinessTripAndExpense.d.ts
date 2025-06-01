import { MigrationInterface, QueryRunner } from "typeorm";
export declare class JoinedBusinessTripAndExpense1748450587445 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
