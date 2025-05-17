import { ApiProperty } from "@nestjs/swagger"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { TeamDto } from "../team.dto"

export class TeamListDto {
	@ApiProperty()
	meta!: PaginatedMetaResponse

	@ApiProperty({ isArray: true, type: TeamDto })
	data!: TeamDto[]
}
