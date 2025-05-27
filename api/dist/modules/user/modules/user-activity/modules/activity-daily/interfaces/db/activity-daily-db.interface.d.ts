import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { RequiredNotNull } from "src/utils/types/interfaces";
export interface IActivityDailyDB extends RequiredNotNull<Pick<UserActivityEntity, "id" | "status" | "date" | "createdAt" | "updatedAt" | "hours" | "workLocation" | "userId" | "reportedByUserId" | "activityRequestId" | "projectId">>, Partial<Pick<UserActivityEntity, "reportedByUser" | "reviewedByUserId" | "reviewedByUser" | "activityRequest" | "user" | "project" | "workingHoursId">> {
    activityType: UserActivityType.Daily;
    workingHours: UserWorkingHoursEntity;
}
