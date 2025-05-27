import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { TimeRange } from "src/utils/types/dtos";
import { RequiredNotNull } from "src/utils/types/interfaces";
export interface IUserWorkingHoursDailyCreateRequest extends RequiredNotNull<Pick<UserActivityEntity, "projectId">> {
    timeRange: TimeRange;
}
