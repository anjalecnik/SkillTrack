import { MoreToReportActivityType } from "~/types";

export interface IOnCallActivityReq {
  activityType: MoreToReportActivityType;
  dateStart: {
    date: string;
    time: string;
  };
  dateEnd: {
    date: string;
    time: string;
  };
  projectId: number;
  description?: string;
}
