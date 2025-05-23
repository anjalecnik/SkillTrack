import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivityBusinessTripDB } from "./activity-business-trip-db.interface"

export type IActivityBusinessTripCreateDBRequest = RequiredNotNull<Pick<IActivityBusinessTripDB, "userId" | "reportedByUserId" | "activityType" | "status" | "date" | "hours">> &
	Partial<Pick<IActivityBusinessTripDB, "projectId">>
