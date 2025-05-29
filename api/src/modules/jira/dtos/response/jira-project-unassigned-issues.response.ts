import { ApiProperty } from "@nestjs/swagger"

export class JiraProjectUnassignedIssuesResponse {
	@ApiProperty({ example: "ST" })
	key: string

	@ApiProperty({ example: "Add endpoint for fetching users" })
	summary: string
}
