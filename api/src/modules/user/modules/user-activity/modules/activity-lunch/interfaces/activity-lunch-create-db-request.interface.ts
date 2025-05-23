import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { RequiredNotNull } from "src/utils/types/interfaces"

export type ILunchActivityCreateDBRequest = RequiredNotNull<Pick<UserActivityEntity, "userId" | "reportedByUserId" | "activityType" | "status" | "activityRequestId" | "date">>
