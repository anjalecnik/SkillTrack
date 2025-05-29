import { Injectable } from "@nestjs/common"
import JiraApi from "jira-client"
import { JiraStatisticsResponse } from "src/modules/jira/dtos/response/jira-statistics.response"

@Injectable()
export class JiraService {
	private readonly jira: JiraApi

	constructor() {
		this.jira = new JiraApi({
			protocol: "https",
			host: "anjaslecnik.atlassian.net",
			username: "anjas.lecnik@gmail.com",
			password: process.env.JIRA_API_TOKEN,
			apiVersion: "2",
			strictSSL: true
		})
	}

	async getJiraProjects() {
		const projects = await this.jira.listProjects()
		return projects.map((project: any) => ({
			key: project.key,
			name: project.name
		}))
	}

	async getJiraProjectUnassignedIssues(projectKey: string) {
		const jql = `project = "${projectKey}" AND assignee IS EMPTY`
		const issues = await this.jira.searchJira(jql, {
			fields: ["summary"],
			maxResults: 100
		})

		return issues.issues.map((issue: any) => ({
			key: issue.key,
			summary: issue.fields.summary
		}))
	}

	async getJiraProjectParticipantsAvailability(projectKey: string): Promise<JiraStatisticsResponse[]> {
		const jql = `project = "${projectKey}" AND assignee IS NOT EMPTY`
		const response = await this.jira.searchJira(jql, {
			fields: ["assignee", "status"],
			maxResults: 100
		})

		const userStats = new Map<string, JiraStatisticsResponse>()

		for (const issue of response.issues) {
			const assignee = issue.fields.assignee
			const status = issue.fields.status?.name

			if (!assignee || !status) continue

			const key = assignee.accountId
			if (!userStats.has(key)) {
				userStats.set(key, {
					user: assignee.displayName,
					accountId: assignee.accountId,
					todo: 0,
					inProgress: 0,
					done: 0,
					totalDoneHistory: 0,
					totalAssigned: 0
				})
			}

			const stats = userStats.get(key)!
			const normalized = status.trim().toLowerCase()

			if (normalized.includes("to do")) stats.todo++
			else if (normalized.includes("in progress")) stats.inProgress++
			else if (normalized.includes("done")) {
				stats.done++
				stats.totalDoneHistory++
			}

			stats.totalAssigned = stats.todo + stats.inProgress + stats.done
		}

		return Array.from(userStats.values()).sort((a, b) => a.totalAssigned - b.totalAssigned)
	}

	async assignTicketToUser(ticketId: string, accountId: string): Promise<void> {
		try {
			await this.jira.updateAssigneeWithId(ticketId, accountId)
		} catch (error) {
			console.error(`Failed to assign ticket ${ticketId} to ${accountId}`, error)
			throw new Error("Jira ticket assignment failed")
		}
	}
}
