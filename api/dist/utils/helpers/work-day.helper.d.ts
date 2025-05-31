import { HolidayEntity } from "../../libs/db/entities/holiday.entity";
import { IWorkDayMeta } from "../types/interfaces";
interface IWorkDaySearchFilter {
    holidays?: HolidayEntity[];
    workingDays?: number[];
}
export declare abstract class WorkDayHelper {
    static getWorkingDays(checkForDates: Date[], { holidays, workingDays }?: IWorkDaySearchFilter): IWorkDayMeta[];
    static getWorkingDay(checkForDate: Date, filter?: IWorkDaySearchFilter): IWorkDayMeta;
    static isWorkingDay(checkForDate: Date, filter?: IWorkDaySearchFilter): boolean;
}
export {};
