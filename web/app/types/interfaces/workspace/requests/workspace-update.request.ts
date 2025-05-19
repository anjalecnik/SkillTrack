import { IAddress } from "~/types";

export interface IWorkspacePatchReq {
  name?: string;
  email?: string;
  countryPhoneCode?: string;
  phone?: string | null;
  addresses?: IAddress[];
  taxId?: string;
  whitelistDomains?: string[];
  invitationText?: string;
  notificationTime?: string;
  notificationFrequency?: string;
  notificationChannel?: string;
  ownerId?: number;
  adminIds?: number[];
  dailyReportTime?: string;
  oldVacationExpiration?: string;
  activityLockDate?: string;
  additionalReceiptsAfterConfirmation?: string[];
}
