import { ApiProperty } from "@nestjs/swagger"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { WorkPositionListItemResponse } from "./work-position-list-item.response"

export class WorkPositionPaginationListResponse {
	@ApiProperty({
		description: "Paginate metadata",
		example: {
			total: 5,
			page: 1,
			from: 0,
			to: 5
		}
	})
	meta!: PaginatedMetaResponse

	@ApiProperty({
		isArray: true,
		example: [
			{
				id: 1,
				name: "Manager",
				level: "L8",
				description: "Manager description"
			}
		]
	})
	data!: WorkPositionListItemResponse[]
}
