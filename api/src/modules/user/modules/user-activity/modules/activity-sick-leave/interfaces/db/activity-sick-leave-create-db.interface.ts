import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivitySickLeaveDB } from "./activity-sick-leave-db.interface"

export type IActivitySickLeaveCreateDBRequest = RequiredNotNull<Pick<IActivitySickLeaveDB, "userId" | "reportedByUserId" | "activityType" | "status" | "date">> &
	Partial<Pick<IActivitySickLeaveDB, "hours">>
