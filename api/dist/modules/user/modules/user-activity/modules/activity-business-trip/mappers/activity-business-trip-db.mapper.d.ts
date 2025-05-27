import { IActivityBusinessTripCreateDBRequest, IActivityRequestBusinessTripCreateDBRequest, IActivityRequestBusinessTripCreateRequest, IActivityRequestBusinessTripUpdateDBRequest } from "../interfaces";
export declare abstract class ActivityBusinessTripDBMapper {
    static createActivityRequest(createActivityRequest: IActivityRequestBusinessTripCreateRequest, dates: Date[], assignedUserWorkHours: number): {
        activityRequest: IActivityRequestBusinessTripCreateDBRequest;
        activities: IActivityBusinessTripCreateDBRequest[];
    };
    static updateActivityRequest(updateActivityRequest: IActivityRequestBusinessTripUpdateDBRequest, dates: Date[], assignedUserWorkHours: number): {
        activities: IActivityBusinessTripCreateDBRequest[];
    };
    private static mapActivitiesPerDay;
}
