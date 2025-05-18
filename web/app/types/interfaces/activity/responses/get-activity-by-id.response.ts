import {
  ActivityType,
  DateTimeWithoutTimezone,
  IDaily,
  IResourceLinks,
  WorkingHoursType,
} from "~/types";

interface ITimeRange {
  id: number;
  fromDateStart?: DateTimeWithoutTimezone;
  toDateEnd?: DateTimeWithoutTimezone;
  type: WorkingHoursType;
  projectId: number;
  projectName: string;
}

interface IEmbedded {
  activities?: IDaily[];
  workingHours: ITimeRange[];
}

export interface IActivityByIdResponse {
  id: number;
  activityType: ActivityType;
  status: string;
  date: string;
  hours: number;
  reportedByWorkspaceUserId: number;
  activityRequestId?: number;
  lunch?: boolean;
  workLocation: string;
  _links: IResourceLinks;
  _embedded: IEmbedded;
}

export interface IDailyTimeSpan {
  timeRange: {
    fromTimeStart: string;
    toTimeEnd: string;
  };
  projectId?: number;
}
