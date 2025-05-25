import {
  ActivityStatus,
  ActivityType,
  DateTimeWithoutTimezone,
  IActivitiesUser,
  RequestAction,
} from "~/types";

export interface IWorkingHours {
  id?: number;
  type: string;
  projectName: string;
  fromDateStart: DateTimeWithoutTimezone;
  toDateEnd: DateTimeWithoutTimezone;
}

export interface IActivity {
  id: number;
  status: ActivityStatus;
  dateStart?: string | DateTimeWithoutTimezone;
  dateEnd?: string | DateTimeWithoutTimezone;
  description?: string;
  location?: string;
  distanceInKM?: number;
  date: string;
  hours?: number;
  workLocation?: string;
  valueInEuro?: number;
  type?: string;
  lunch?: boolean;
  isPaidWithCompanyCard?: boolean;
  reportedByWorkspaceUserId: number;
  reviewedByWorkspaceUserId?: number;
  projectId?: number;
  projectName?: string;
  activityType: ActivityType;
  firstOnCall?: boolean;
  isFirst?: boolean;
  lastOnCall?: boolean;
  isLast?: boolean;
  fileName?: string;
  fileUrl?: string;
  activityTypes: ActivityType[];
  workingHours: IWorkingHours;
  unassignedId: number;
  activityRequestId: number;
  locationFrom?: string;
  locationTo?: string;
  createdAt?: string;
  _embedded: {
    user: IActivitiesUser;
    actions?: RequestAction[];
  };
  isGhost?: boolean;
}
