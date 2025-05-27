import { ActivityListItemHalBaseResponse } from "../../../activity-shared/dtos/response/activity-list-item-hal-base.response";
export declare class ActivityExpenseListItemHalResponse extends ActivityListItemHalBaseResponse {
    date: string;
    description?: string;
    valueInEuro: number;
    isPaidWithCompanyCard: boolean;
    reviewedByUserId?: number;
    fileName?: string;
    fileUrl?: string;
    projectId?: number;
    projectName?: string;
}
