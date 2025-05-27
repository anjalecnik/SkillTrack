import { ActivityLunchRepository } from "../repository/activity-lunch.repository";
import { ILunchActivityCreateRequest } from "../interfaces";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export declare class ActivityLunchService {
    private readonly activityLunchRepository;
    constructor(activityLunchRepository: ActivityLunchRepository);
    createLunchActivity(createRequest: ILunchActivityCreateRequest): Promise<UserActivityEntity>;
    updateLunchActivity(newLunchState: boolean, createRequest: ILunchActivityCreateRequest): Promise<void>;
    deleteLunchActivity(deleteRequest: ILunchActivityCreateRequest): Promise<void>;
    getLunchOnDay(createRequest: ILunchActivityCreateRequest): Promise<UserActivityEntity[]>;
}
