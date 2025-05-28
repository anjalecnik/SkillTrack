import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityRequestBusinessTripDB } from "./activity-request-business-trip-db.interface";
export interface IActivityRequestBusinessTripUpdateDBRequest extends RequiredNotNull<Pick<IActivityRequestBusinessTripDB, "id" | "userId" | "reportedByUserId" | "activityType">>, Partial<Pick<IActivityRequestBusinessTripDB, "dateStart" | "dateEnd" | "projectId" | "description" | "location" | "distanceInKM" | "accommodationCost" | "foodCost" | "otherCost">> {
}
