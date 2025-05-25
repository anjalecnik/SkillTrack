import { ApiProperty } from "@nestjs/swagger"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { ProjectOverviewListItemResponse } from "./project-overview-list-item.response"

export class ProjectOverviewListResponse {
	@ApiProperty({ type: PaginatedMetaResponse })
	meta!: PaginatedMetaResponse

	@ApiProperty({ type: ProjectOverviewListItemResponse, isArray: true })
	data!: ProjectOverviewListItemResponse[]
}
