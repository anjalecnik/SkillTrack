import { ApiProperty } from "@nestjs/swagger"
import { Ticket } from "./jira-ticket.response"

export class JiraTicketsForUserResponse {
	@ApiProperty({ example: "SkillTrack" })
	project: string

	@ApiProperty()
	tickets: Ticket[]
}
