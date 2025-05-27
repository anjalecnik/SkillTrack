import { IActivityRequestExpenseCreateDBRequest, IActivityRequestExpenseCreateRequest } from "../interfaces";
import { IActivityExpenseCreateDBRequest } from "../interfaces/db/activity-expense-create-db.interface";
export declare abstract class ActivityExpenseDBMapper {
    static createActivityRequest(createActivityRequest: IActivityRequestExpenseCreateRequest): {
        activityRequest: IActivityRequestExpenseCreateDBRequest;
        activities: IActivityExpenseCreateDBRequest[];
    };
}
