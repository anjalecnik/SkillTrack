import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { IPaginatedResponse } from "src/utils/types/interfaces";
import { UserListItemResponse } from "../dtos/response/user-list-item.response";
import { IUserPaginationItemResponse } from "../interfaces/user-pagination-item-response.interface";
import { IUserDetailsResponse } from "../interfaces/details-response.interface";
import { UserDetailsResponse } from "../dtos/response/user-details.response";
import { UserEntity } from "src/libs/db/entities/user.entity";
import { UserBaseResponse } from "../dtos/response/user-base.response";
import { UserInvitationListResponse } from "../dtos/response/user-invitation-list.response";
export declare abstract class UserMapper {
    static mapUserPaginationList(users: IUserPaginationItemResponse[], meta: PaginatedMetaResponse): IPaginatedResponse<UserListItemResponse>;
    static mapUserListItem(userDetails: IUserPaginationItemResponse): UserListItemResponse;
    static mapUserDetails({ userEntity, ...statistic }: IUserDetailsResponse): UserDetailsResponse;
    static mapUserBase(userEntity: UserEntity): UserBaseResponse;
    static mapUserInvitations(userEntities: UserEntity[]): UserInvitationListResponse;
    private static mapUserManagerShort;
    private static mapWorkspaceUserActivityStatisticsDetails;
    private static mapUserActivityStatisticsVacationDetails;
    private static mapUserProjectsShort;
}
