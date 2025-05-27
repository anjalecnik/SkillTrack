import { HolidayEntity } from "../../libs/db/entities/holiday.entity";
export declare class HolidayHelper {
    static isHoliday(holidays: HolidayEntity[], date: Date): boolean;
    static checkHoliday(holidays: HolidayEntity[], date: Date): {
        isHoliday: boolean;
        holidayName: string | null;
    };
    static isHolidayOnWorkday(holidays: HolidayEntity[], date: Date): boolean;
}
