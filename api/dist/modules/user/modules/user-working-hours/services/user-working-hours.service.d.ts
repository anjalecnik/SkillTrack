import { UserWorkingHoursResponse } from "../dtos/response/user-working-hours.response";
import { IUserWorkingHoursDailyCreateRequest } from "../interfaces";
export declare class UserWorkingHoursService {
    constructor();
    addWorkingHours(workingHours: IUserWorkingHoursDailyCreateRequest[], date: Date): UserWorkingHoursResponse[];
    private getDateTimes;
    private validateOverlappingTimeRanges;
}
