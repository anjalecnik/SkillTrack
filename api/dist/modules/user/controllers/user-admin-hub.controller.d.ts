import { UserService } from "../services/user.service";
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { UserDetailsResponse } from "../dtos/response/user-details.response";
import { UserListResponse } from "../dtos/response/user-list.response";
import { UserPaginationFilterRequest } from "../dtos/request/user-pagination-filter.request";
import { UserInvitationListResponse } from "../dtos/response/user-invitation-list.response";
import { UserInvitationListRequest } from "../dtos/request/user-invitation-list.request";
import { UserPatchRequest } from "../dtos/request/patch/user-patch.request";
export declare class UserAdminHubController {
    private userService;
    constructor(userService: UserService);
    getUser(authPassport: IAuthJwtPassportUserRequest, userId: number): Promise<UserDetailsResponse>;
    geteUserList(filter: UserPaginationFilterRequest): Promise<UserListResponse>;
    invite(authPassport: IAuthJwtPassportUserRequest, userInvitations: UserInvitationListRequest): Promise<UserInvitationListResponse>;
    updateUser(authPassport: IAuthJwtPassportUserRequest, userId: number, userPatchRequest: UserPatchRequest): Promise<UserDetailsResponse>;
}
