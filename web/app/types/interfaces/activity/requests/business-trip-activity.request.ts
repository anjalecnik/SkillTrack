import { DateTimeWithoutTimezone, MoreToReportActivityType } from "~/types";

export interface IBusinessTripActivityReq {
  activityType: MoreToReportActivityType;
  dateStart: string | DateTimeWithoutTimezone;
  dateEnd: string | DateTimeWithoutTimezone;
  projectId: number;
  distanceInKM?: number;
  accommodationCost?: number;
  foodCost?: number;
  otherCost?: number;
  location: string;
  description?: string;
}
