import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, ValidateNested } from "class-validator"
import { UserInvitationListItemRequest } from "./user-invitation-list-item.request"

export class UserInvitationListRequest {
	@ApiProperty({ type: UserInvitationListItemRequest, isArray: true })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UserInvitationListItemRequest)
	invitations!: UserInvitationListItemRequest[]
}
