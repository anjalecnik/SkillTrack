import { IUserDetailsVacationResponse } from "src/modules/user/interfaces";
import { IVacationCalculation } from "../types/interfaces";
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity";
export declare abstract class VacationHelper {
    static calculateUsedVacation(oldYearVacation: IVacationCalculation | null, currentYearVacation: IVacationCalculation | null): IUserDetailsVacationResponse;
    private static getAllVacations;
    private static getVacation;
    private static getUsedDays;
    private static getAvailableDays;
    private static getUpcomingDays;
    static getOldVacationExpirationDate(vacation: UserVacationAssignedEntity | undefined): Date;
}
