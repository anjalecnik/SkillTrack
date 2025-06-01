"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedScoreToPerformanceReviews1748545502339 = void 0;
class AddedScoreToPerformanceReviews1748545502339 {
    name = 'AddedScoreToPerformanceReviews1748545502339';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_performance_review" ADD "score" numeric NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_performance_review" DROP COLUMN "score"`);
    }
}
exports.AddedScoreToPerformanceReviews1748545502339 = AddedScoreToPerformanceReviews1748545502339;
//# sourceMappingURL=1748545502339-AddedScoreToPerformanceReviews.js.map