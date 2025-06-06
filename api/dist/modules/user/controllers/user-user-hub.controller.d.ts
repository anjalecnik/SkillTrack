import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { UserService } from "../services/user.service";
import { UserListResponse } from "../dtos/response/user-list.response";
import { UserPaginationFilterRequest } from "../dtos/request/user-pagination-filter.request";
import { UserDetailsResponse } from "../dtos/response/user-details.response";
import { UserIsSupervisorResponse } from "../dtos/response/user-is-supervisor.response";
import { UserWorkOverviewListHalResponse } from "../dtos/response/user-work-overview-list.hal.response";
import { UserWorkOverviewListFilterRequest } from "../dtos/request/user-work-overview-list-filter.request";
import { UtilityService } from "src/modules/utility/services/utility.service";
export declare class UserUserHubController {
    private userService;
    private readonly utilityService;
    constructor(userService: UserService, utilityService: UtilityService);
    getUserList(authPassport: IAuthJwtPassportUserRequest, filter: UserPaginationFilterRequest): Promise<UserListResponse>;
    getWorkspaceUser(authPassport: IAuthJwtPassportUserRequest, userId: number): Promise<UserDetailsResponse>;
    getRequestorUserIsSupervisor(authPassport: IAuthJwtPassportUserRequest, userId: number): Promise<UserIsSupervisorResponse>;
    getWorkspaceWorkOverview(filter: UserWorkOverviewListFilterRequest): Promise<UserWorkOverviewListHalResponse>;
}
