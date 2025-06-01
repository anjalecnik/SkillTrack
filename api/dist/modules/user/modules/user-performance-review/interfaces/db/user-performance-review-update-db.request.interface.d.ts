import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity";
import { RequiredNotNull } from "src/utils/types/interfaces";
export interface IUserPerformanceReviewUpdateDBRequest extends RequiredNotNull<Pick<UserPerformanceReviewEntity, "id" | "answer1" | "answer2" | "answer3" | "answer4" | "quartal" | "year">> {
}
