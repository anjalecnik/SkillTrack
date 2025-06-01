import { HolidayEntity } from "src/libs/db/entities/holiday.entity";
import { ProjectEntity } from "src/libs/db/entities/project.entity";
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
import { IUserCommon } from "src/utils/types/interfaces";
import { Repository } from "typeorm";
export declare class UtilityRepository {
    private readonly userRepository;
    private readonly projectRepository;
    private readonly holidayRepository;
    private readonly addressRepository;
    constructor(userRepository: Repository<UserEntity>, projectRepository: Repository<ProjectEntity>, holidayRepository: Repository<HolidayEntity>, addressRepository: Repository<UserAddressEntity>);
    getUser(id: number): Promise<UserEntity | undefined>;
    getUserWithProjects(id: number): Promise<UserEntity | undefined>;
    getProject(id: number): Promise<ProjectEntity | undefined>;
    getHolidaysOnDates(countryCode: string, dates: Date[]): Promise<HolidayEntity[]>;
    getHolidaysInDateRange(dateStart: Date, dateEnd: Date): Promise<HolidayEntity[]>;
    getSubordinates(filter: IUserCommon): Promise<UserEntity[]>;
}
