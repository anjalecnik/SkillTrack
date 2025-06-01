import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { UserService } from "../services/user.service";
import { UserListResponse } from "../dtos/response/user-list.response";
import { UserPaginationFilterRequest } from "../dtos/request/user-pagination-filter.request";
import { UserDetailsResponse } from "../dtos/response/user-details.response";
import { UserIsSupervisorResponse } from "../dtos/response/user-is-supervisor.response";
export declare class UserUserHubController {
    private userService;
    constructor(userService: UserService);
    getUserList(authPassport: IAuthJwtPassportUserRequest, filter: UserPaginationFilterRequest): Promise<UserListResponse>;
    getWorkspaceUser(authPassport: IAuthJwtPassportUserRequest, userId: number): Promise<UserDetailsResponse>;
    getRequestorUserIsSupervisor(authPassport: IAuthJwtPassportUserRequest, userId: number): Promise<UserIsSupervisorResponse>;
}
