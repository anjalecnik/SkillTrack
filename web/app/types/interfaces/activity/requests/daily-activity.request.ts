import { ActivityType, ActivityWorkLocation } from "~/types";

interface IDailyActivityReqWorkingHoursTimeRange {
  fromTimeStart?: string;
  toTimeEnd?: string;
}

interface IDailyActivityReqWorkingHours {
  timeRange: IDailyActivityReqWorkingHoursTimeRange;
  projectId?: number;
}

export interface IDailyActivityReq {
  activityType: ActivityType.Daily;
  date?: string;
  lunch?: boolean;
  workLocation?: ActivityWorkLocation;
  workingHours?: IDailyActivityReqWorkingHours[];
}
