"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinedBusinessTripAndExpense1748450587445 = void 0;
class JoinedBusinessTripAndExpense1748450587445 {
    name = 'JoinedBusinessTripAndExpense1748450587445';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_activity_request" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" DROP COLUMN "fileName"`);
        await queryRunner.query(`ALTER TABLE "user_activity" DROP COLUMN "expenseId"`);
        await queryRunner.query(`ALTER TABLE "user_activity" DROP COLUMN "schoolScheduleId"`);
        await queryRunner.query(`ALTER TABLE "user_activity" DROP COLUMN "overtimeId"`);
        await queryRunner.query(`ALTER TABLE "user_activity" DROP COLUMN "onCallId"`);
        await queryRunner.query(`ALTER TABLE "user_activity" DROP COLUMN "specialLeaveId"`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" ADD "accommodationCost" numeric(10,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "user_activity_request"."accommodationCost" IS 'Accommodation cost in Euro'`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" ADD "foodCost" numeric(10,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "user_activity_request"."foodCost" IS 'Food cost in Euro'`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" ADD "otherCost" numeric(10,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "user_activity_request"."otherCost" IS 'Other costs in Euro'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_activity_request"."hours" IS 'Hours worked. Used for Daily, BusinessTrip'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "user_activity_request"."hours" IS 'Hours worked. Used for Daily, Overtime, BusinessTrip, OnCall'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_activity_request"."otherCost" IS 'Other costs in Euro'`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" DROP COLUMN "otherCost"`);
        await queryRunner.query(`COMMENT ON COLUMN "user_activity_request"."foodCost" IS 'Food cost in Euro'`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" DROP COLUMN "foodCost"`);
        await queryRunner.query(`COMMENT ON COLUMN "user_activity_request"."accommodationCost" IS 'Accommodation cost in Euro'`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" DROP COLUMN "accommodationCost"`);
        await queryRunner.query(`ALTER TABLE "user_activity" ADD "specialLeaveId" integer`);
        await queryRunner.query(`ALTER TABLE "user_activity" ADD "onCallId" integer`);
        await queryRunner.query(`ALTER TABLE "user_activity" ADD "overtimeId" integer`);
        await queryRunner.query(`ALTER TABLE "user_activity" ADD "schoolScheduleId" integer`);
        await queryRunner.query(`ALTER TABLE "user_activity" ADD "expenseId" integer`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" ADD "fileName" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "user_activity_request" ADD "fileUrl" character varying(2048)`);
    }
}
exports.JoinedBusinessTripAndExpense1748450587445 = JoinedBusinessTripAndExpense1748450587445;
//# sourceMappingURL=1748450587445-JoinedBusinessTripAndExpense.js.map