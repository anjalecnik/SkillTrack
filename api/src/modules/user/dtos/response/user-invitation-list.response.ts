import { ApiProperty } from "@nestjs/swagger"
import { UserInvitationListItemResponse } from "./user-invitation-list-item.response"

export class UserInvitationListResponse {
	@ApiProperty({ type: UserInvitationListItemResponse, isArray: true })
	invitations!: UserInvitationListItemResponse[]
}
