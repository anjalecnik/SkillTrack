import { RequiredNotNull } from "src/utils/types/interfaces"
import { IUserPerformanceReviewCreateDBRequest } from "./db/user-performance-review-create-db-request.interface"

export interface IUserPerformanceReviewCreateRequest
	extends RequiredNotNull<Pick<IUserPerformanceReviewCreateDBRequest, "answer1" | "answer2" | "answer3" | "answer4" | "year" | "quartal">> {}
