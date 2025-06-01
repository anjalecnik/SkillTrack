import { UserActivityWorkLocation } from "src/utils/types/enums/user-activity-work-location.enum";
export declare class UserWorkingHoursCreateRequest {
    projectId: number | null;
    workLocation: UserActivityWorkLocation;
    dateTime: Date;
}
