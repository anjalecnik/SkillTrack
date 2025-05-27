import { FindOptionsWhere } from "typeorm";
import { IActivitySharedCalculateWorkHours, IActivitySharedCancelDBRequest, IActivitySharedFilter, IActivitySharedGetDatesActivity, IActivitySharedRequestCancelDBRequest, IActivitySharedRequestReviewDBRequest, IActivitySharedReviewDBRequest } from "../interfaces";
import { ActivitySharedRepository } from "../repository/activity-shared.repository";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { UtilityService } from "src/modules/utility/services/utility.service";
import { HolidayEntity } from "src/libs/db/entities/holiday.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { ProjectEntity } from "src/libs/db/entities/project.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class ActivitySharedService {
    private readonly activitySharedRepository;
    private readonly utilityService;
    constructor(activitySharedRepository: ActivitySharedRepository, utilityService: UtilityService);
    getDatesFromRange(getDateRangeMeta: IActivitySharedGetDatesActivity): Promise<Date[]>;
    getHolidays(dateRange: IActivitySharedGetDatesActivity): Promise<HolidayEntity[]>;
    getActivitiesOnDay(dayDate: Date, filters: IActivitySharedFilter): Promise<UserActivityEntity[]>;
    getUserExpectedWorkHours(): Promise<number>;
    getProjectById(projectId: number): Promise<ProjectEntity>;
    calculateActivityHours(activities: IActivitySharedCalculateWorkHours[], excludeActivity?: Pick<UserActivityEntity, "id">[]): Promise<number>;
    getActivityRequest(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity | null>;
    getActivityRequestWithActivitiesOrFail(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity>;
    getActivityRequestWithActivities(whereOptions: FindOptionsWhere<UserActivityRequestEntity>): Promise<UserActivityRequestEntity | null>;
    findActivityRequestOrFail<T extends UserActivityRequestEntity>({ id, userId }: {
        id: number;
        userId: number;
    }): Promise<T>;
    cancelActivityRequest(cancelActivityRequest: IActivitySharedRequestCancelDBRequest, cancelActivity: IActivitySharedCancelDBRequest[]): Promise<UserActivityRequestEntity>;
    reviewActivityRequest(reviewActivityRequest: IActivitySharedRequestReviewDBRequest, reviewActivity: IActivitySharedReviewDBRequest[]): Promise<UserActivityRequestEntity>;
    getActivitiesForActivityDates({ userId }: Pick<UserActivityRequestEntity, "userId">, activityDates: Pick<UserActivityEntity, "date">[], excludeActivityRequestIds?: number[], statuses?: UserActivityStatus[]): Promise<UserActivityEntity[]>;
    getActivityRequestsForDates({ userId }: Pick<UserActivityRequestEntity, "userId">, dates: Date[], statuses?: UserActivityStatus[], activityTypes?: UserActivityType[]): Promise<UserActivityRequestEntity[]>;
    getUserById(userId: number): Promise<UserEntity>;
    getUserEarliestActivity(userId: number): Promise<UserActivityEntity | undefined>;
    private getActivityIdsFromActivityRequests;
    checkPendingActivityOnCancel(activityRequest: Pick<UserActivityRequestEntity, "status">): boolean;
}
