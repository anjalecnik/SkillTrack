import { DateTimeWithoutTimezone, PlanAbsenceActivityType } from "~/types";

export interface IPlanAbsenceCreateReq {
  dateStart: string | DateTimeWithoutTimezone;
  dateEnd: string | DateTimeWithoutTimezone;
  activityType: PlanAbsenceActivityType;
  hours?: number;
  description?: string;
}
