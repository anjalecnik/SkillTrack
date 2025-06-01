import { IActivityBusinessTripCreateDBRequest, IActivityRequestBusinessTripCreateDBRequest, IActivityRequestBusinessTripUpdateDBRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
import { MailService } from "src/modules/mail/services/mail.service";
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service";
export declare class ActivityBusinessTripRepository {
    private readonly masterDataSource;
    private readonly mailerService;
    private readonly activitySharedService;
    constructor(masterDataSource: MasterDataSource, mailerService: MailService, activitySharedService: ActivitySharedService);
    createActivityRequest(createBusinessTrip: IActivityRequestBusinessTripCreateDBRequest, createBusinessTripActivities: IActivityBusinessTripCreateDBRequest[]): Promise<UserActivityRequestEntity>;
    updateActivityRequest({ id, ...updateBusinessTrip }: IActivityRequestBusinessTripUpdateDBRequest, deleteBusinessTripActivities: UserActivityEntity[], createBusinessTripActivities: IActivityBusinessTripCreateDBRequest[]): Promise<UserActivityRequestEntity>;
}
