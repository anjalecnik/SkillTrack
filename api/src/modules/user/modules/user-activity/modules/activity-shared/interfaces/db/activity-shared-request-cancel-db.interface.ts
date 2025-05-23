import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { RequiredNotNull } from "src/utils/types/interfaces"

export type IActivitySharedRequestCancelDBRequest = RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "status" | "reportedByUserId">>
