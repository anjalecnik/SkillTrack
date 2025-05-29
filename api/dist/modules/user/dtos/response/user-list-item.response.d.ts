import { TeamDetailsResponse } from "src/modules/team/dtos/team-details.response";
import { WorkPositionListItemResponse } from "src/modules/work-position/dtos/response/work-position-list-item.response";
import { UserRole } from "src/utils/types/enums/user-role.enum";
import { UserStatus } from "src/utils/types/enums/user-status.enum";
import { UserVacationStatisticResponse } from "./activity/user-vacation-statistic.response";
export declare class UserListItemResponse {
    id: number;
    email: string;
    status: UserStatus;
    role: UserRole;
    name: string;
    surname: string;
    averageScore?: number;
    vacation?: UserVacationStatisticResponse;
    team?: TeamDetailsResponse;
    workPosition?: WorkPositionListItemResponse;
}
