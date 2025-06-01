import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity";
import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum";
export interface IUserWorkingHoursDateTimeCreateDBRequest extends Required<Pick<UserWorkingHoursEntity, "userId">> {
    dateTime: Date;
    projectId: number | null;
    workLocation: UserActivityWorkLocation;
}
