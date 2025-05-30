import { UtilityRepository } from "../repository/utility.repository";
import { UserEntity } from "src/libs/db/entities/user.entity";
import { ProjectEntity } from "src/libs/db/entities/project.entity";
import { HolidayEntity } from "src/libs/db/entities/holiday.entity";
import { IWorkDayMeta } from "src/utils/types/interfaces";
export declare const SLOVENIAN_HOLIDAYS: {
    name: string;
    date: Date;
}[];
export declare class UtilityService {
    private readonly utilityRepository;
    constructor(utilityRepository: UtilityRepository);
    getUserById(userId: number): Promise<UserEntity>;
    getUserWithProjectsById(userId: number): Promise<UserEntity>;
    getProjectById(projectId: number): Promise<ProjectEntity>;
    getHolidaysOnDateRangeByCountryCode(countryCode: string, dates: Date[]): Promise<HolidayEntity[]>;
    getHolidaysInDateRange(dateStart: Date, dateEnd: Date): Promise<HolidayEntity[]>;
    getWorkDaysArray(): Promise<number[]>;
    getWorkingDays(dates: Date[]): Promise<IWorkDayMeta[]>;
    isUserSelfSuperior(userId: number): Promise<boolean>;
    getSubordinateIdsRecursively(userId: number, visitedIds?: Set<number>, maxLevel?: number, currentLevel?: number): Promise<number[]>;
    isUserSupervisorToEmployee(supervisorId: number, employeeId: number): Promise<boolean>;
}
