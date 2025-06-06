import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ROUTE_ADMIN_HUB, API_TAG_JIRA, ROUTE_JIRA } from "src/utils/constants"
import { JiraProjectsResponse } from "src/modules/jira/dtos/response/jira-projects.response"
import { JiraProjectUnassignedIssuesResponse } from "src/modules/jira/dtos/response/jira-project-unassigned-issues.response"
import { JiraStatisticsResponse } from "src/modules/jira/dtos/response/jira-statistics.response"
import { JiraService } from "../services/jira.service"
import { JiraOpenAISuggestionResponse } from "../dtos/response/jira-openai-suggestion.response"
import { UserGuard } from "src/utils/guards/user.guard"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { JiraTicketsForUserResponse } from "../dtos/response/jira-tickets-for-user.response"

@Controller(`/${ROUTE_ADMIN_HUB}/${ROUTE_JIRA}`)
@ApiTags(`${API_TAG_JIRA}`)
@UseGuards(UserGuard(UserRole.Admin, UserRole.Owner))
export class JiraAdminHubController {
	constructor(private jiraService: JiraService) {}

	@Get("/projects")
	@UseGuards()
	@ApiOperation({
		summary: "Return Jira projects"
	})
	@ApiOkResponse({ description: "Jira projects", type: JiraProjectsResponse })
	async getJiraProjects(): Promise<JiraProjectsResponse> {
		return this.jiraService.getJiraProjects()
	}

	@Get("/:projectKey/unassigned-issues")
	@UseGuards()
	@ApiOperation({
		summary: "Return Jira unassigned issues for project from params"
	})
	@ApiOkResponse({ description: "Jira projects", type: JiraProjectUnassignedIssuesResponse })
	async getJiraProjectUnassignedIssues(@Param("projectKey") projectKey: string): Promise<JiraProjectUnassignedIssuesResponse> {
		return this.jiraService.getJiraProjectUnassignedIssues(projectKey)
	}

	@Get("/:projectKey")
	@UseGuards()
	@ApiOperation({
		summary: "Return Jira project participants and their availability"
	})
	@ApiOkResponse({ description: "Jira statistics", type: JiraStatisticsResponse })
	async getJiraProjectParticipants(@Param("projectKey") projectKey: string): Promise<JiraStatisticsResponse[]> {
		return this.jiraService.getJiraProjectParticipantsAvailability(projectKey)
	}

	@Get("/my-work/:userName")
	@UseGuards()
	@ApiOperation({
		summary: "Returns Jira work for employee"
	})
	@ApiOkResponse({ description: "Jira work", type: JiraTicketsForUserResponse })
	async getJiraAssignedWork(@Param("userName") userName: string): Promise<JiraTicketsForUserResponse[]> {
		return this.jiraService.getTicketsAssignedToUser(userName)
	}

	@Get("/openai/:projectKey/:ticketId")
	@UseGuards()
	@ApiOperation({
		summary: "Return OpenAI suggestion for assignee"
	})
	@ApiOkResponse({ description: "OpenAI suggestion", type: JiraOpenAISuggestionResponse })
	async getOpenAISuggestionForAsignee(@Param("projectKey") projectKey: string, @Param("ticketId") ticketId: string): Promise<JiraOpenAISuggestionResponse> {
		return this.jiraService.suggestBestAssigneeWithOpenAI(projectKey, ticketId)
	}

	@Post("/:ticketId/:assigneId")
	@UseGuards()
	@ApiOperation({
		summary: "Assign ticket to Jira user"
	})
	@ApiOkResponse({ description: "Jira statistics" })
	async assignJiraTicket(@Param("ticketId") ticketId: string, @Param("assigneId") assigneId: string): Promise<void> {
		return this.jiraService.assignTicketToUser(ticketId, assigneId)
	}
}
