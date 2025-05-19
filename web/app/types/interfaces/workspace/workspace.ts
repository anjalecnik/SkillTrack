import { Dayjs } from "dayjs";
import {
  ActivityTypeLowerCase,
  IUser,
  IAddress,
  ReportingModuleType,
} from "~/types";

export type IWorkspaceModuleActivity = {
  [t in ActivityTypeLowerCase]: {
    maximumDaysInPast: number;
    maximumDateInPast?: Dayjs;
    maximumDaysInFuture: number;
  };
};
interface IWorkspaceModule {
  settings: {
    activity: IWorkspaceModuleActivity;
  };
  moduleType: ReportingModuleType;
}
export interface IWorkspace {
  id: number;
  name: string;
  email: string;
  countryPhoneCode?: string;
  phone?: string;
  fullPhone?: string;
  taxId: string;
  invitationText: string;
  notificationTime: string;
  notificationFrequency: string;
  notificationChannel: string;
  workHours: number;
  addresses: IAddress[];
  whitelistDomains: string[];
  projectsCount: number;
  workspaceUsersCount: number;
  owner: IUser;
  admins: IUser[];
  menuItems: string[];
  dailyReportTime?: string;
  oldVacationExpiration?: string;
  timezone: string;
  activityLockDate?: string;
  modules: IWorkspaceModule[];
  additionalReceiptsAfterConfirmation: string[];
}
