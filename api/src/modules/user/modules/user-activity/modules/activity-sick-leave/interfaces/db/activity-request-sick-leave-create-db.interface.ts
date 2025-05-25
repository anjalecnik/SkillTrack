import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivityRequestSickLeaveDB } from "./activity-request-sick-leave-db.interface"

export interface IActivityRequestSickLeaveCreateDBRequest
	extends RequiredNotNull<Pick<IActivityRequestSickLeaveDB, "userId" | "reportedByUserId" | "activityType" | "status" | "dateStart" | "dateEnd">>,
		Partial<Pick<IActivityRequestSickLeaveDB, "description" | "hours">> {}
