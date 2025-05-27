import { RequiredNotNull } from "src/utils/types/interfaces";
import { IActivityRequestVacationDB } from "./activity-request-vacation-db.interface";
export interface IActivityRequestVacationCreateDBRequest extends RequiredNotNull<Pick<IActivityRequestVacationDB, "userId" | "reportedByUserId" | "activityType" | "status" | "dateStart" | "dateEnd">>, Partial<Pick<IActivityRequestVacationDB, "description">> {
}
