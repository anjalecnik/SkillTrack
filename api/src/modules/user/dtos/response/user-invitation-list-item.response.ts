import { ApiProperty } from "@nestjs/swagger"

export class UserInvitationListItemResponse {
	@ApiProperty({ example: 12 })
	userId!: number
}
