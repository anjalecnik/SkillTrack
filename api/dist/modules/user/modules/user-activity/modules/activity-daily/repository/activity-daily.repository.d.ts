import { Repository } from "typeorm";
import { IActivityDailyWithWorkingHours, IActivityRequestDailyCreateDBRequest, IActivityRequestDailyDB, IActivityRequestDailyUpdateDBRequest } from "../interfaces";
import { IActivityLastDailyActivityRequestDBFilter } from "../interfaces/db/activity-last-daily-activity-request-filter-db.interface";
import { ActivityDailyValidationService } from "../services/activity-daily-validation.service";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity";
import { MasterDataSource } from "src/libs/db/master-data-source.service";
export declare class ActivityDailyRepository {
    private readonly activityRepository;
    private readonly requestRepository;
    private workingHoursRepository;
    private readonly masterDataSource;
    private readonly activityDailyValidationService;
    constructor(activityRepository: Repository<UserActivityEntity>, requestRepository: Repository<UserActivityRequestEntity>, workingHoursRepository: Repository<UserWorkingHoursEntity>, masterDataSource: MasterDataSource, activityDailyValidationService: ActivityDailyValidationService);
    getUserLastActivityDailyRequest({ userId, date, hasProject }: IActivityLastDailyActivityRequestDBFilter): Promise<IActivityRequestDailyDB | undefined>;
    getDailyActivitiesByActivityRequest(activityRequestId: number): Promise<UserActivityEntity[]>;
    createActivityRequest(createActivityRequest: IActivityRequestDailyCreateDBRequest, activitiesWithWorkingHours: IActivityDailyWithWorkingHours[]): Promise<UserActivityRequestEntity>;
    updateActivityRequest(updateActivityRequest: IActivityRequestDailyUpdateDBRequest, activitiesWithWorkingHours: IActivityDailyWithWorkingHours[]): Promise<UserActivityRequestEntity>;
    getDailyActivitiesOnDate(fromDateStart: Date, toDateEnd: Date, userId: number): Promise<UserActivityEntity[]>;
    getLunchActivitiesOnDate(fromDateStart: Date, toDateEnd: Date, userId: number): Promise<UserActivityEntity[]>;
    getDailyActivity(activityId: number): Promise<UserActivityEntity>;
    getActivityRequestById(activityRequestId: number): Promise<UserActivityRequestEntity>;
    getAllUserDailyActivities(userId: number, date: Date): Promise<UserActivityEntity[]>;
    getWorkingHoursOnDate(userId: number, startDate: Date, endDate: Date): Promise<UserWorkingHoursEntity[]>;
    assignNewWorkingHoursToActivity(activity: UserActivityEntity, workingHours: Omit<UserWorkingHoursEntity, "id">): Promise<UserActivityEntity>;
    assignExistingWorkingHoursToActivity(activity: UserActivityEntity, workingHour: UserWorkingHoursEntity): Promise<UserActivityEntity>;
    deleteWorkingHours(workingHoursIds: number[]): Promise<void>;
}
