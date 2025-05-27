import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityRequestExpenseDB } from "./activity-request-expense-db.interface";
export type IActivityRequestExpenseCreateDBRequest = RequiredNotNull<Pick<IActivityRequestExpenseDB, "userId" | "reportedByUserId" | "activityType" | "valueInEuro" | "isPaidWithCompanyCard" | "dateStart" | "status">> & Partial<Pick<IActivityRequestExpenseDB, "description" | "projectId" | "fileName" | "fileUrl">>;
