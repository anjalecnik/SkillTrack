import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { RequiredNotNull } from "src/utils/types/interfaces";
export interface IActivityRequestVacationDB extends RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "userId" | "reportedByUserId" | "dateStart" | "dateEnd" | "createdAt" | "updatedAt" | "status">>, Partial<Pick<UserActivityRequestEntity, "description" | "userActivities" | "reviewedByUserId">> {
    activityType: UserActivityType.Vacation;
}
