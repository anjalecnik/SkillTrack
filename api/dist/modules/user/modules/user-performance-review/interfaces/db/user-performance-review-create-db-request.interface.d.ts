import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity";
export interface IUserPerformanceReviewCreateDBRequest extends Pick<UserPerformanceReviewEntity, "answer1" | "answer2" | "answer3" | "answer4" | "quartal" | "year"> {
}
