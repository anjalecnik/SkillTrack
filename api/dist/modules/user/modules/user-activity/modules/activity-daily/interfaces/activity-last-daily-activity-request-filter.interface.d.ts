import { IActivityLastDailyActivityRequestDBFilter } from "./db/activity-last-daily-activity-request-filter-db.interface";
export type IActivityLastDailyActivityRequestFilter = Pick<IActivityLastDailyActivityRequestDBFilter, "userId"> & Partial<Pick<IActivityLastDailyActivityRequestDBFilter, "date" | "hasProject">>;
