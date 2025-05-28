import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityRequestBusinessTripDB } from "./db";
export interface IActivityRequestBusinessTripCreateRequest extends RequiredNotNull<Pick<IActivityRequestBusinessTripDB, "userId" | "reportedByUserId" | "activityType" | "dateStart" | "dateEnd" | "location">>, Partial<Pick<IActivityRequestBusinessTripDB, "projectId" | "description" | "distanceInKM" | "accommodationCost" | "foodCost" | "otherCost">> {
}
