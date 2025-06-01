import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityDailyDB } from "./activity-daily-db.interface";
export type IActivityDailyCreateDBRequest = RequiredNotNull<Pick<IActivityDailyDB, "userId" | "reportedByUserId" | "activityType" | "status" | "projectId" | "date" | "workLocation" | "hours">>;
