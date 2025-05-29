import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedScoreToPerformanceReviews1748545502339 implements MigrationInterface {
    name = 'AddedScoreToPerformanceReviews1748545502339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_performance_review" ADD "score" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_performance_review" DROP COLUMN "score"`);
    }

}
