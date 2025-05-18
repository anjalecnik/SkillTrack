import { MoreToReportActivityType } from "~/types";

export interface ITripToOfficeActivityReq {
  activityType: MoreToReportActivityType;
  dateStart: IDateTime;
  dateEnd: IDateTime;
  projectId: number;
  distanceInKM?: number;
  locationFrom: string;
  locationTo: string;
  description?: string;
}

export interface IDateTime {
  date: string;
  time: string;
}
