import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { IUserActivityRequestCreate } from "../../../interfaces/user-activity-request-create.interface"
import { RequiredNotNull } from "src/utils/types/interfaces"

export type IActivitySharedRequestCreateFactory = IUserActivityRequestCreate &
	RequiredNotNull<Pick<UserActivityRequestEntity, "userId" | "reportedByUserId" | "dateStart" | "dateEnd">>
