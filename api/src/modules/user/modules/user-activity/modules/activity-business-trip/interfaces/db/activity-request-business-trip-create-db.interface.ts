import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivityRequestBusinessTripDB } from "./activity-request-business-trip-db.interface"

export type IActivityRequestBusinessTripCreateDBRequest = RequiredNotNull<
	Pick<IActivityRequestBusinessTripDB, "userId" | "reportedByUserId" | "activityType" | "status" | "dateStart" | "dateEnd" | "location">
> &
	Partial<Pick<IActivityRequestBusinessTripDB, "projectId" | "description" | "distanceInKM" | "accommodationCost" | "foodCost" | "otherCost">>
