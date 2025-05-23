import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"

export type IActivitySharedReportTimeWindowValidation = Pick<UserActivityEntity, "date">
