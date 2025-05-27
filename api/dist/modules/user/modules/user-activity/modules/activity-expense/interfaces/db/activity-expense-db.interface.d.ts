import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { RequiredNotNull } from "src/utils/types/interfaces";
export interface IActivityExpenseDB extends RequiredNotNull<Pick<UserActivityEntity, "id" | "status" | "date" | "createdAt" | "updatedAt" | "userId" | "reportedByUserId" | "activityRequestId">>, Partial<Pick<UserActivityEntity, "reportedByUser" | "reviewedByUserId" | "reviewedByUser" | "activityRequest" | "user" | "projectId" | "project">> {
    activityType: UserActivityType.Expense;
}
