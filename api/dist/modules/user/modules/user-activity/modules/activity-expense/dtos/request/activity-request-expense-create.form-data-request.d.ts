import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class ActivityRequestExpenseCreateFormDataRequest {
    activityType: UserActivityType.Expense;
    projectId?: number;
    date: Date;
    valueInEuro: number;
    isPaidWithCompanyCard: boolean;
    description?: string;
}
