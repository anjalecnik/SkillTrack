import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { RequiredNotNull } from "src/utils/types/interfaces"

export type IActivitySharedRequestReviewRequest = RequiredNotNull<Pick<UserActivityEntity, "id" | "userId" | "status" | "reviewedByUserId">>
