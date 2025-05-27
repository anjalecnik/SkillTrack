import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum";
import { IActivityDailyCreateDBRequest } from "../../user-activity/modules/activity-daily/interfaces";
export interface IActivityDailyCreateDBRequestNullable extends Omit<IActivityDailyCreateDBRequest, "projectId" | "workLocation"> {
    projectId: number | null;
    workLocation: UserActivityWorkLocation | null;
}
