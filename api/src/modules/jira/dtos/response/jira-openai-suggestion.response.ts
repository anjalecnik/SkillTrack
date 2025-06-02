import { ApiProperty } from "@nestjs/swagger"

export class JiraOpenAISuggestionResponse {
	@ApiProperty({ example: "Liam Bennet" })
	name: string

	@ApiProperty({ example: "User Liam Bennett would be best ..." })
	reason: string
}
