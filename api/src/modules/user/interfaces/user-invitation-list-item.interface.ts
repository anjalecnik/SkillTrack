import { UserEntity } from "src/libs/db/entities/user.entity"

export type IUserInvitationListItem = Pick<UserEntity, "invitedByUserId" | "name" | "surname" | "status" | "email">
