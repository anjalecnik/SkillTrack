import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
import { Repository, DeepPartial } from "typeorm";
export declare class UserAssignedVacationRepository {
    private readonly userVacationAssignedRepository;
    private readonly userRepository;
    constructor(userVacationAssignedRepository: Repository<UserVacationAssignedEntity>, userRepository: Repository<UserEntity>);
    getUserAssignedVacationAll(userId: number): Promise<UserVacationAssignedEntity[]>;
    createAssignedVacationForYear(userId: number, year: number): Promise<UserVacationAssignedEntity>;
    updateAssignedVacation(id: number, updateData: DeepPartial<UserVacationAssignedEntity>): Promise<UserVacationAssignedEntity>;
    getUsersActive(): Promise<UserEntity[]>;
}
