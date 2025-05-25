import { RequiredNotNull } from "src/utils/types/interfaces"
import { IActivityVacationDB } from "./activity-vacation-db.interface"

export type IActivityVacationCreateDBRequest = RequiredNotNull<Pick<IActivityVacationDB, "userId" | "reportedByUserId" | "activityType" | "status" | "date" | "vacationAssignedId">>
