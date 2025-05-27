import { UserEntity } from "src/libs/db/entities/user.entity";
import { UserInvitationListItemRequest } from "../../dtos/request/user-invitation-list-item.request";
export interface IUserInvitationDBRequest extends Pick<UserEntity, "invitedByUserId"> {
    invitations: UserInvitationListItemRequest[];
}
