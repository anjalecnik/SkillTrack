import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { RequiredNotNull } from "src/utils/types/interfaces"

export interface IActivitySharedRequestCancelRequest extends RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "userId" | "reportedByUserId">> {}
