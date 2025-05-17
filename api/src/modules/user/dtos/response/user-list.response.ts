import { ApiProperty } from "@nestjs/swagger"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { UserListItemResponse } from "./user-list-item.response"

export class UserListResponse {
	@ApiProperty({ type: PaginatedMetaResponse })
	meta!: PaginatedMetaResponse

	@ApiProperty({ type: UserListItemResponse, isArray: true })
	data!: UserListItemResponse[]
}
