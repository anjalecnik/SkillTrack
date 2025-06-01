import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum";
import { IActivityRequestSickLeaveDB } from "./db";
export interface IActivityRequestSickLeaveEntityEnriched extends IActivityRequestSickLeaveDB {
    actions: UserActivityRequestActions[];
}
