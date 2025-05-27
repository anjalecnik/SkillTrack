import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export type IActivitySharedCalculateWorkHours = Pick<UserActivityEntity, "id" | "date" | "userId" | "activityType" | "hours">;
