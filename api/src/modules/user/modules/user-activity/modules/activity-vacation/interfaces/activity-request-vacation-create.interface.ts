import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { RequiredNotNull } from "src/utils/types/interfaces"

export interface IActivityRequestVacationCreateRequest
	extends RequiredNotNull<Pick<UserActivityRequestEntity, "userId" | "reportedByUserId" | "activityType" | "dateStart" | "dateEnd">>,
		Partial<Pick<UserActivityRequestEntity, "description">> {}
