import { IActivityRequestSickLeaveCreateDBRequest, IActivityRequestSickLeaveCreateRequest, IActivitySickLeaveCreateDBRequest } from "../interfaces";
export declare abstract class ActivitySickLeaveDBMapper {
    static createActivityRequest(createActivityRequest: IActivityRequestSickLeaveCreateRequest, dates: Date[], totalWorkspaceAssignedHoursPerDay: number, totalHours?: number): {
        activityRequest: IActivityRequestSickLeaveCreateDBRequest;
        activities: IActivitySickLeaveCreateDBRequest[];
    };
}
