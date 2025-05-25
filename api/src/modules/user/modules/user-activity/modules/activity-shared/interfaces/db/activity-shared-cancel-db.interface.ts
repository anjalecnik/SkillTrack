import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { RequiredNotNull } from "src/utils/types/interfaces"

export type IActivitySharedCancelDBRequest = RequiredNotNull<Pick<UserActivityEntity, "id" | "status" | "reportedByUserId">>
