import { IResourceLinks } from "../activity";

export interface ITotalSum {
  daysOnProjectSum: number;
  daysOffProjectSum: number;
  businessTripsSum: number;
  dailyActivitySum: number;
  publicHolidaySum: number;
  sickLeaveSum: number;
  vacationSum: number;
  workDays: number;
  workspaceUsersCount: number;
}
export interface ITotalCount {
  daysOnProject: number;
  daysOffProject: number;
  businessTripsCount: number;
  dailyActivityCount: number;
  publicHolidayCount: number;
  sickLeaveCount: number;
  vacationCount: number;
}

interface IUserEmbedded {
  user: {
    userId: number;
    firstName: string;
    lastName: string;
  };
}

interface IProjectEmbedded {
  projectId: number;
  name: string;
}

export interface IWorkspaceProject extends ITotalCount {
  _embedded?: IProjectEmbedded;
}

export interface IReport {
  total: ITotalSum;
  users: {
    projects: {
      project: IWorkspaceProject[];
    };
    totalUser: ITotalCount;
    _embedded: IUserEmbedded;
  }[];
  _links: IResourceLinks;
}
