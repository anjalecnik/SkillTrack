import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum";
import { IActivityRequestExpenseDB } from "./db";
export interface IActivityRequestExpenseEntityEnriched extends IActivityRequestExpenseDB {
    actions: UserActivityRequestActions[];
}
