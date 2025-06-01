import { Repository } from "typeorm";
import { IActivityRequestVacationCreateDBRequest, IActivityVacationCreateDBRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
import { MailService } from "src/modules/mail/services/mail.service";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
export declare class ActivityVacationRepository {
    private readonly userVacationAssignedRepository;
    private readonly masterDataSource;
    private readonly mailerService;
    private readonly activitySharedService;
    constructor(userVacationAssignedRepository: Repository<UserVacationAssignedEntity>, masterDataSource: MasterDataSource, mailerService: MailService, activitySharedService: ActivitySharedService);
    createActivityRequest(createVacation: IActivityRequestVacationCreateDBRequest, createVacationActivities: IActivityVacationCreateDBRequest[]): Promise<UserActivityRequestEntity>;
    getUserAssignedVacation(userId: number, year: number): Promise<UserVacationAssignedEntity | undefined>;
}
