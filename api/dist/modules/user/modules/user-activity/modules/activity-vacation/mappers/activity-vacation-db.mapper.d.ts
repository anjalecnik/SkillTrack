import { IActivityRequestVacationCreateDBRequest, IActivityRequestVacationCreateRequest, IActivityVacationCreateDBRequest } from "../interfaces";
export declare abstract class ActivityVacationDBMapper {
    static createActivityVacation({ userId, reportedByUserId }: IActivityRequestVacationCreateRequest, date: Date, vacationAssignedId: number): IActivityVacationCreateDBRequest;
    static createActivityRequest(createActivityRequest: IActivityRequestVacationCreateRequest, activities: IActivityVacationCreateDBRequest[]): {
        activityRequest: IActivityRequestVacationCreateDBRequest;
        activities: IActivityVacationCreateDBRequest[];
    };
}
