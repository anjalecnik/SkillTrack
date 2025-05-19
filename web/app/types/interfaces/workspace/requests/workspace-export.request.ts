import { DateTimeWithoutTimezone } from "~/types";

export interface IWorkspaceExportReq {
  fromDateStart: DateTimeWithoutTimezone;
  toDateEnd: DateTimeWithoutTimezone;
}
