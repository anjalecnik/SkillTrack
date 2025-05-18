import {
  ActivityStatus,
  ActivityType,
  IActivitiesUser,
  IActivityByIdResponse,
  IUser,
  IWorkingHours,
} from "~/types";

interface ILink {
  href: string;
}

export interface IResourceLinks {
  self: ILink;
}

export interface DateTimeWithoutTimezone {
  date: string;
  time: string;
}

export interface IDaily {
  id: number;
  status: string;
  date: string;
  hours: number;
  workLocation: string;
  reportedByWorkspaceUserId: number;
  reviewedByWorkspaceUserId: number;
  projectId: number;
  projectName: string;
  _links: IResourceLinks;
}

export interface IActivityResponse {
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
  isPaidWithCompanyCard?: boolean;
  reportedByWorkspaceUserId: number;
  reviewedByWorkspaceUserId?: number;
  workingHours: IWorkingHours[];
  projectId?: number;
  projectName?: string;
  lunch: boolean;
  _links: IResourceLinks;
  _embedded: {
    workspaceUser: IActivitiesUser;
  };
  activityTypes: ActivityType[];
  unassignedId: number;
  activityType: ActivityType;
  activityRequestId: number;
}

export interface IWorkspaceUserActivity {
  id: number;
  activityType: ActivityType;
  status: ActivityStatus;
  date: string;
  project: IBasicProjectInfo;
}

export interface IBasicProjectInfo {
  id: number;
  name: string;
}

export interface IWorkspaceUsersResponse
  extends Pick<IUser, "id" | "name" | "surname" | "middleName"> {
  workspaceUserActivity: IWorkspaceUserActivity[];
}

export interface IActivitiesResponse {
  _links: IResourceLinks;
  activities: IActivityResponse[];
}

export interface IMetaData {
  total?: number;
  page?: number;
  from?: number;
  to?: number;
}

export interface IActivitiesOverviewResponse {
  _links: IResourceLinks;
  workspaceUsers: IWorkspaceUsersResponse[];
  meta: IMetaData;
}

export interface IUnassignedActivitiesResponse {
  _links: IResourceLinks;
  activities: IActivityByIdResponse[];
}
