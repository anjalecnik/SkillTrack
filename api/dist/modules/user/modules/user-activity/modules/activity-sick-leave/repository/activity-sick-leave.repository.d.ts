import { IActivityRequestSickLeaveCreateDBRequest, IActivitySickLeaveCreateDBRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
export declare class ActivitySickLeaveRepository {
    private readonly masterDataSource;
    constructor(masterDataSource: MasterDataSource);
    createActivityRequest(createSickLeave: IActivityRequestSickLeaveCreateDBRequest, createSickLeaveActivities: IActivitySickLeaveCreateDBRequest[]): Promise<UserActivityRequestEntity>;
}
