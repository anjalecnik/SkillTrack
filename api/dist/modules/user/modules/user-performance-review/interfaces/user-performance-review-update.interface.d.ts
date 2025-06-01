import { RequiredNotNull } from "src/utils/types/interfaces";
import { IUserPerformanceReviewUpdateDBRequest } from "./db/user-performance-review-update-db.request.interface";
export interface IUserPerformanceReviewUpdateRequest extends RequiredNotNull<Pick<IUserPerformanceReviewUpdateDBRequest, "id" | "answer1" | "answer2" | "answer3" | "answer4" | "year" | "quartal">> {
}
