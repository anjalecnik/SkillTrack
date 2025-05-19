import { MoreToReportActivityType } from "~/types";

export interface IExpensesActivityReq {
  activityType: MoreToReportActivityType;
  date: string;
  projectId: number;
  valueInEuro: number;
  description?: string;
  isPaidWithCompanyCard: boolean;
  file?: File | undefined;
}
