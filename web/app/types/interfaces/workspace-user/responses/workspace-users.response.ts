import {
  IAddress,
  IProjectUserResponse,
  IUser,
  WorkspaceUserEmploymentType,
  WorkspaceUserGender,
  UserStatus,
} from "~/types";

interface IVacationStatistic {
  usedDays: number;
  availableDays: number;
  assignedDays: number;
}

interface IVacation {
  new: IVacationStatistic;
  old: IVacationStatistic;
  total: IVacationStatistic;
  upcoming: number;
}

interface SickLeave {
  countDays: number;
}

interface WorkspaceWorkPosition {
  id: number;
  name: string;
  level: string;
  workPromotion: number;
  description: string;
}

interface ActivityStatistic {
  activeRequestCount: number;
  vacation: IVacation;
  sickLeave: SickLeave;
}

export interface AssignedVacations {
  id: number;
  year: number;
  assignedDays: number;
  oldVacationExpiration?: string;
  initialUsedDays?: number;
  initialDate?: string;
  description?: string;
}

export interface Employments {
  id: number;
  type: WorkspaceUserEmploymentType;
  dateStart: string;
  dateEnd?: string;
  probationPeriodEndDate?: string;
}

interface Manager {
  id: number;
  email: string;
  name: string;
  surname: string;
  middleName: string;
}

export interface IWorkspaceUser {
  countryPhoneCode?: string;
  id: number;
  email: string;
  phone?: string;
  fullPhone?: string;
  manager: Manager;
  addresses?: IAddress[];
  vacationDays: string;
  birthDate: string;
  status: UserStatus;
  role: string;
  name: string;
  surname: string;
  projects?: IProjectUserResponse[];
  activityStatistic?: ActivityStatistic;
  assignedVacations: AssignedVacations[] | [];
  workspaceWorkPosition: WorkspaceWorkPosition;
  isSupervisor: boolean;
}

export interface IUserResponse {
  id: number;
  email: string;
  phone: string;
  manager: Manager;
  addresses: IAddress[];
  emergencyContact: IUser;
  birthDate: string;
  personalId: string;
  status: UserStatus;
  role: string;
  name: string;
  surname: string;
  projects?: IProjectUserResponse[];
  activityStatistic: ActivityStatistic;
  assignedVacations: AssignedVacations[];
  vacation: IVacation;
  workspaceWorkPosition: WorkspaceWorkPosition;
  averageScore?: number;
  isSupervisor: boolean;
}

export interface IWorkspaceUserIsSupervisorResponse {
  isSupervisor: boolean;
}
