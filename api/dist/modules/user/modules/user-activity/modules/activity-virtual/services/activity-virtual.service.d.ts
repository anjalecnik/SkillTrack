import { HolidayEntity } from "src/libs/db/entities/holiday.entity";
import { IUserVirtualActivity } from "../interfaces";
export declare class ActivityVirtualService {
    constructor();
    createVirtualActivity(date: Date, holidays: HolidayEntity[]): IUserVirtualActivity | null;
}
