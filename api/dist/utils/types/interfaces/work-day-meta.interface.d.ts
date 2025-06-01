import { HolidayEntity } from "../../../libs/db/entities/holiday.entity";
export interface IWorkDayMeta {
    date: Date;
    isHoliday: boolean;
    isWorkFreeDay: boolean;
    isWorkingDay: boolean;
    holidays: HolidayEntity[];
}
