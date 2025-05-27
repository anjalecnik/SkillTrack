import { IActivityBusinessTripCreateDBRequest, IActivityRequestBusinessTripCreateDBRequest, IActivityRequestBusinessTripUpdateDBRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
export declare class ActivityBusinessTripRepository {
    private readonly masterDataSource;
    constructor(masterDataSource: MasterDataSource);
    createActivityRequest(createBusinessTrip: IActivityRequestBusinessTripCreateDBRequest, createBusinessTripActivities: IActivityBusinessTripCreateDBRequest[]): Promise<UserActivityRequestEntity>;
    updateActivityRequest({ id, ...updateBusinessTrip }: IActivityRequestBusinessTripUpdateDBRequest, deleteBusinessTripActivities: UserActivityEntity[], createBusinessTripActivities: IActivityBusinessTripCreateDBRequest[]): Promise<UserActivityRequestEntity>;
}
