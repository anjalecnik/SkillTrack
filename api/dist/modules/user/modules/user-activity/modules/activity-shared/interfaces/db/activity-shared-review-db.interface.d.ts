import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { RequiredNotNull } from "src/utils/types/interfaces";
export type IActivitySharedReviewDBRequest = RequiredNotNull<Pick<UserActivityEntity, "id" | "status" | "reviewedByUserId">>;
