import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { RequiredNotNull } from "src/utils/types/interfaces";
export interface IActivityRequestBusinessTripDB extends RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "userId" | "reportedByUserId" | "status" | "dateStart" | "dateEnd" | "location" | "createdAt" | "updatedAt">>, Partial<Pick<UserActivityRequestEntity, "projectId" | "project" | "description" | "distanceInKM" | "userActivities" | "reviewedByUserId">> {
    activityType: UserActivityType.BusinessTrip;
}
