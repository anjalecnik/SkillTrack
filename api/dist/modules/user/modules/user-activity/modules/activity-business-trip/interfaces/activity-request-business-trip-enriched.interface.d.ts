import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum";
import { IActivityRequestBusinessTripDB } from "./db";
export interface IActivityRequestBusinessTripEntityEnriched extends IActivityRequestBusinessTripDB {
    actions: UserActivityRequestActions[];
}
