import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivityRequestDailyDB } from "./activity-request-daily-db.interface"

export type IActivityRequestDailyCreateDBRequest = RequiredNotNull<Pick<IActivityRequestDailyDB, "userId" | "reportedByUserId" | "activityType" | "dateStart" | "status">>
