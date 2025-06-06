import { Repository } from "typeorm";
import { IUserActivityRequestListFilterDBRequest, IUserActivityRequestPaginationFilterDBRequest } from "../interfaces";
import { IUserActivityListFilterDBRequest } from "../interfaces/db/user-activity-list-filter-db.interface";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
import { IPaginatedResponse, IUserCommon } from "src/utils/types/interfaces";
import { OverviewMonthlyProductivityResponse } from "src/modules/overview/dtos/response/overview-monthly-productivity.response";
export declare class UserActivityRepository {
    private readonly userActivityRepository;
    private readonly userActivityRequestRepository;
    private readonly userRepository;
    constructor(userActivityRepository: Repository<UserActivityEntity>, userActivityRequestRepository: Repository<UserActivityRequestEntity>, userRepository: Repository<UserEntity>);
    getPendingActivityRequests(checkDate: Date): Promise<UserActivityRequestEntity[]>;
    getDistinctPendingUnassignedActivities(checkDate: Date): Promise<UserActivityEntity[]>;
    getUserActivityByIdOrThrow({ userId }: IUserCommon, id: number): Promise<UserActivityEntity>;
    getUserLastActivityDailyRequest({ userId }: IUserCommon, date: Date): Promise<UserActivityRequestEntity | undefined>;
    getUserActivityList(filters: IUserActivityListFilterDBRequest): Promise<UserActivityEntity[]>;
    private getActivityOrder;
    getUserActivityRequestByIdOrThrow({ userId }: IUserCommon, id: number): Promise<UserActivityRequestEntity>;
    getUserActivityRequestList(filters: IUserActivityRequestListFilterDBRequest): Promise<UserActivityRequestEntity[]>;
    getUserActivityRequestListPagination(filters: IUserActivityRequestPaginationFilterDBRequest): Promise<IPaginatedResponse<UserActivityRequestEntity>>;
    getMonthlyUserProductivity(): Promise<OverviewMonthlyProductivityResponse>;
    private getActivityRequestOrder;
    getAllUsers(): Promise<UserEntity[]>;
    private getActivityRequestPaginationOrder;
}
