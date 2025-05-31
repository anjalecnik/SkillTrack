import { UserWorkOverviewListFilterRequest } from "../dtos/request/user-work-overview-list-filter.request";
import { UserWorkOverviewListHalResponse } from "../dtos/response/user-work-overview-list.hal.response";
import { IRawData } from "../interfaces/user-work-overview-raw-data.interface";
import { HolidayEntity } from "src/libs/db/entities/holiday.entity";
export declare abstract class UserWorkOverviewMapper {
    static mapWorkOverview(data: IRawData, filter: UserWorkOverviewListFilterRequest, workingDays: number, holidays: HolidayEntity[]): UserWorkOverviewListHalResponse;
    private static addUserToResponse;
    private static getTotalCounts;
    private static getTotalUserCounts;
    private static getUserPerProjectCounts;
    private static updateProjectDays;
    private static getActiveProjectIds;
    private static filterDailyActivitiesPerProject;
    private static filterDailyActivitiesPerUser;
    private static updateProjectUserCounts;
}
