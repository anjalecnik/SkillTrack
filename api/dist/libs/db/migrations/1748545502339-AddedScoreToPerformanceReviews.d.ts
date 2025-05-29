import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddedScoreToPerformanceReviews1748545502339 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
