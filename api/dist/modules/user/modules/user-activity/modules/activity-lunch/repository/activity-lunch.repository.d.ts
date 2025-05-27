import { Repository } from "typeorm";
import { ILunchActivityCreateDBRequest, ILunchActivityCreateRequest } from "../interfaces";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export declare class ActivityLunchRepository {
    private readonly activityRepository;
    constructor(activityRepository: Repository<UserActivityEntity>);
    createLunchActivity(activity: ILunchActivityCreateDBRequest): Promise<UserActivityEntity>;
    getExistingLunch(findOptions: ILunchActivityCreateRequest): Promise<UserActivityEntity[]>;
    deleteLunchActivity(lunchActivity: UserActivityEntity[]): Promise<void>;
    deleteLunchActivityByRequestId(findOptions: ILunchActivityCreateRequest): Promise<void>;
}
