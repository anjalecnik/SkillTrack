import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity";
import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityRequestPerformanceReviewDB } from "./activity-request-performance-review-db.interface";
export interface IActivityRequestPerformanceReviewUpdateDBRequest extends RequiredNotNull<Pick<IActivityRequestPerformanceReviewDB, "id" | "userId" | "reportedByUserId">>, RequiredNotNull<Pick<UserPerformanceReviewEntity, "answer1" | "answer2" | "answer3" | "answer4" | "quartal" | "year">> {
}
