import { IResourceLinks } from "../activity";

export interface ITotalSum {
  daysOnProjectSum: number;
  daysOffProjectSum: number;
  businessTripsSum: number;
  dailyActivitySum: number;
  onCallsSum: number;
  overtimeSum: number;
  unassignedAcitivitySum: number;
  publicHolidaySum: number;
  schoolObligationsSum: number;
  sickLeaveSum: number;
  specialLeaveSum: number;
  vacationSum: number;
  workDays: number;
  workspaceUsersCount: number;
}
export interface ITotalCount {
  daysOnProject: number;
  daysOffProject: number;
  tripToOfficeCount: number;
  businessTripsCount: number;
  dailyActivityCount: number;
  onCallsCount: number;
  overtimeCount: number;
  unassignedAcitivityCount: number;
  publicHolidayCount: number;
  schoolObligationsCount: number;
  sickLeaveCount: number;
  specialLeaveCount: number;
  vacationCount: number;
}

interface IUserEmbedded {
  workspaceUser: {
    workspaceUserId: number;
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
  workspaceUsers: {
    projects: {
      workspaceProject: IWorkspaceProject[];
    };
    totalUser: ITotalCount;
    _embedded: IUserEmbedded;
  }[];
  _links: IResourceLinks;
}
