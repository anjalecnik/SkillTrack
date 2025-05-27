import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityRequestExpenseDB } from "./db";
export interface IActivityRequestExpenseCreateRequest extends RequiredNotNull<Pick<IActivityRequestExpenseDB, "userId" | "reportedByUserId" | "activityType" | "valueInEuro" | "isPaidWithCompanyCard" | "dateStart">>, Partial<Pick<IActivityRequestExpenseDB, "description" | "projectId" | "fileName" | "fileUrl">> {
}
