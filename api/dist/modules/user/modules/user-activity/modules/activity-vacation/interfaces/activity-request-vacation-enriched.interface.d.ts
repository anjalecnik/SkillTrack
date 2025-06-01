import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum";
import { IActivityRequestVacationDB } from "./db";
export interface IActivityRequestVacationEntityEnriched extends IActivityRequestVacationDB {
    actions: UserActivityRequestActions[];
}
