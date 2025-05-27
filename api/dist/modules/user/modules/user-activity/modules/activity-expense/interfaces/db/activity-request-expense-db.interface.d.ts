import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { RequiredNotNull } from "src/utils/types/interfaces";
export interface IActivityRequestExpenseDB extends RequiredNotNull<Pick<UserActivityRequestEntity, "id" | "userId" | "reportedByUserId" | "dateStart" | "valueInEuro" | "isPaidWithCompanyCard" | "status" | "createdAt" | "updatedAt">>, Partial<Pick<UserActivityRequestEntity, "description" | "projectId" | "fileName" | "fileUrl" | "userActivities" | "reviewedByUserId" | "project">> {
    activityType: UserActivityType.Expense;
}
