import { MoreToReportActivityType } from "~/types";

export interface IBusinessTripActivityReq {
  activityType: MoreToReportActivityType;
  dateStart: string | DateTimeWithoutTimezone;
  dateEnd: string | DateTimeWithoutTimezone;
  projectId: number;
  distanceInKM?: number;
  location: string;
  description?: string;
}
