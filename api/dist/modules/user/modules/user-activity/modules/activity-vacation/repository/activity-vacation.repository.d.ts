import { Repository } from "typeorm";
import { IActivityRequestVacationCreateDBRequest, IActivityVacationCreateDBRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
export declare class ActivityVacationRepository {
    private readonly userVacationAssignedRepository;
    private readonly masterDataSource;
    constructor(userVacationAssignedRepository: Repository<UserVacationAssignedEntity>, masterDataSource: MasterDataSource);
    createActivityRequest(createVacation: IActivityRequestVacationCreateDBRequest, createVacationActivities: IActivityVacationCreateDBRequest[]): Promise<UserActivityRequestEntity>;
    getUserAssignedVacation(userId: number, year: number): Promise<UserVacationAssignedEntity | undefined>;
}
