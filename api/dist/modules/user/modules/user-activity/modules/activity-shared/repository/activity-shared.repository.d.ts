import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { IActivitySharedCancelDBRequest, IActivitySharedFilterDB, IActivitySharedGetDatesActivity, IActivitySharedRequestCancelDBRequest, IActivitySharedRequestReviewDBRequest, IActivitySharedReviewDBRequest } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { HolidayEntity } from "src/libs/db/entities/holiday.entity";
import { ProjectEntity } from "src/libs/db/entities/project.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class ActivitySharedRepository {
    private readonly activityRepository;
    private readonly activityRequestRepository;
    private readonly userRepository;
    private readonly projectRepository;
    private readonly holidayRepository;
    constructor(activityRepository: Repository<UserActivityEntity>, activityRequestRepository: Repository<UserActivityRequestEntity>, userRepository: Repository<UserEntity>, projectRepository: Repository<ProjectEntity>, holidayRepository: Repository<HolidayEntity>);
    getUserById(id: number): Promise<UserEntity>;
    getUserByIdOrThrow(id: number): Promise<UserEntity>;
    getProjectOrThrow(id: number): Promise<ProjectEntity>;
    getActivitiesOnDay(dayDate: Date, filters: IActivitySharedFilterDB): Promise<UserActivityEntity[]>;
    getActivityRequestById(ids: number[]): Promise<import("../../../../../../../utils/types/interfaces").WithRequired<UserActivityRequestEntity, "userActivities">[]>;
    getActivitiesOnDayInRange(filters: IActivitySharedFilterDB & {
        dates: Date[];
    }): Promise<UserActivityEntity[]>;
    getActivitiesRequestsOnDayInRange(filters: IActivitySharedFilterDB & {
        dates: Date[];
    }): Promise<UserActivityRequestEntity[]>;
    getEarliestActivityByUserId(userId: number): Promise<UserActivityEntity | undefined>;
    findActivityRequest(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity | null>;
    findActivityRequestWithActivitiesOrFail(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity>;
    findActivityRequestWithActivities(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity | null>;
    findActivityRequestOrFail<T extends UserActivityRequestEntity>(options: FindOneOptions<UserActivityRequestEntity>): Promise<T>;
    cancelActivityRequest(cancelActivityRequest: IActivitySharedRequestCancelDBRequest, cancelActivity: IActivitySharedCancelDBRequest[]): Promise<UserActivityRequestEntity>;
    reviewActivityRequest(reviewActivityRequest: IActivitySharedRequestReviewDBRequest, reviewActivity: IActivitySharedReviewDBRequest[]): Promise<UserActivityRequestEntity>;
    getHolidays(dateRange: IActivitySharedGetDatesActivity): Promise<HolidayEntity[]>;
}
