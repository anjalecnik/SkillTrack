import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { RequiredNotNull } from "src/utils/types/interfaces";
export interface IUserActivityDailyEnriched extends RequiredNotNull<Pick<UserActivityEntity, "id" | "status" | "date" | "createdAt" | "updatedAt" | "userId" | "reportedByUserId" | "user">>, Partial<Pick<UserActivityEntity, "hours" | "workLocation" | "activityRequestId" | "projectId" | "reportedByUser" | "reviewedByUserId" | "reviewedByUser" | "activityRequest" | "project">> {
    activityType: UserActivityType.Daily;
    workingHours: UserWorkingHoursEntity | undefined;
}
