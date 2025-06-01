import { UserSickLeaveStatisticResponse } from "./user-sick-leave-statistic.response";
import { UserVacationStatisticResponse } from "./user-vacation-statistic.response";
export declare class UserActivityStatisticResponse {
    activeRequestCount: number;
    vacation?: UserVacationStatisticResponse;
    sickLeave: UserSickLeaveStatisticResponse;
}
