import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityRequestDailyDB } from "./activity-request-daily-db.interface";
export type IActivityRequestDailyUpdateDBRequest = RequiredNotNull<Pick<IActivityRequestDailyDB, "id" | "reportedByUserId">>;
