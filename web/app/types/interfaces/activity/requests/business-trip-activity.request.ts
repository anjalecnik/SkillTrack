import { MoreToReportActivityType } from "~/types";

export interface IBusinessTripActivityReq {
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
  distanceInKM?: number;
  location: string;
  description?: string;
}
