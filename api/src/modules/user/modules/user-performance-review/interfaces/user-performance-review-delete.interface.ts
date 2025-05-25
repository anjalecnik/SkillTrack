import { RequiredNotNull } from "src/utils/types/interfaces"
import { IUserPerformanceReviewDeleteDBRequest } from "./db/user-performance-review-delete-db-request.interface"

export interface IUserPerformanceReviewDeleteRequest extends RequiredNotNull<Pick<IUserPerformanceReviewDeleteDBRequest, "id">> {}
