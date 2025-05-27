import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity";
export declare class HolidayEntity implements ICreatedAtEntity, IUpdatedAtEntity {
    id: number;
    name: string;
    date: Date;
    countryCode: string;
    state?: string | null;
    region?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
