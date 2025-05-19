import { DateTimeWithoutTimezone, MoreToReportActivityType } from "~/types";

export interface IOvertimeActivityReq {
  activityType: MoreToReportActivityType;
  dateStart: DateTimeWithoutTimezone;
  dateEnd: DateTimeWithoutTimezone;
  projectId: number;
  description?: string;
}
