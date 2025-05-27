import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export type IActivitySharedReporterValidation = Pick<UserActivityEntity, "userId" | "reportedByUserId">;
