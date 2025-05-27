import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
export interface ActivityPerformanceReviewResponse extends Partial<Pick<UserPerformanceReviewEntity, "id" | "answer1" | "answer2" | "answer3" | "answer4" | "createdAt">>, Pick<UserPerformanceReviewEntity, "quartal" | "year" | "userId"> {
    reportedBy?: Partial<Pick<UserEntity, "name" | "surname">> | null;
}
