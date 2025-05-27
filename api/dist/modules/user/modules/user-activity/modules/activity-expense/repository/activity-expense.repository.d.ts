import { IActivityRequestExpenseCreateDBRequest } from "../interfaces";
import { IActivityExpenseCreateDBRequest } from "../interfaces/db/activity-expense-create-db.interface";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
export declare class ActivityExpenseRepository {
    private readonly masterDataSource;
    constructor(masterDataSource: MasterDataSource);
    createActivityRequest(createActivityRequest: IActivityRequestExpenseCreateDBRequest, createActivities: IActivityExpenseCreateDBRequest[]): Promise<UserActivityRequestEntity>;
}
