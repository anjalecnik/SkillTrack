import { ApiProperty } from "@nestjs/swagger"

export class JiraProjectsResponse {
	@ApiProperty({ example: "ST" })
	key: string

	@ApiProperty({ example: "SkillTrack" })
	name: string
}
