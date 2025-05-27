import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class ActivityRequestBusinessTripUpdateRequest {
    activityType: UserActivityType.BusinessTrip;
    dateStart?: Date;
    dateEnd?: Date;
    projectId?: number;
    description?: string;
    location?: string;
    distanceInKM?: number;
}
