import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity"
import { RequiredNotNull } from "src/utils/types/interfaces"

export interface IUserPerformanceReviewDeleteDBRequest extends RequiredNotNull<Pick<UserPerformanceReviewEntity, "id">> {}
