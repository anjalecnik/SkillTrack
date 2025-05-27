import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityExpenseDB } from "./activity-expense-db.interface";
export type IActivityExpenseCreateDBRequest = RequiredNotNull<Pick<IActivityExpenseDB, "userId" | "reportedByUserId" | "activityType" | "status" | "date">>;
