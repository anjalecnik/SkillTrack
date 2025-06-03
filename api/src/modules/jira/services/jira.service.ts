import { Injectable } from "@nestjs/common"
import JiraApi from "jira-client"
import OpenAI from "openai"
import { JiraStatisticsResponse } from "src/modules/jira/dtos/response/jira-statistics.response"
import { UserTicketHistory } from "../dtos/response/jira-user-ticket-history.response"
import { Ticket } from "../dtos/response/jira-ticket.response"
import { JiraOpenAISuggestionResponse } from "../dtos/response/jira-openai-suggestion.response"

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

	async getUserTicketHistory(projectKey: string): Promise<UserTicketHistory[]> {
		const jql = `project = "${projectKey}" AND statusCategory = Done AND assignee IS NOT EMPTY ORDER BY updated DESC`
		const response = await this.jira.searchJira(jql, {
			fields: ["summary", "description", "assignee"],
			maxResults: 100
		})

		const userMap = new Map<string, UserTicketHistory>()

		for (const issue of response.issues) {
			const assignee = issue.fields.assignee
			if (!assignee) continue

			const key = assignee.accountId

			const description =
				issue.fields.description?.content?.map((c: any) => c.content?.map((p: any) => p.text).join("")).join("\n") ||
				issue.fields.description ||
				issue.fields.summary ||
				"No description"

			if (!userMap.has(key)) {
				userMap.set(key, {
					name: assignee.displayName,
					accountId: assignee.accountId,
					pastDescriptions: []
				})
			}

			const user = userMap.get(key)!
			if (user.pastDescriptions.length < 5) {
				user.pastDescriptions.push(description)
			}
		}

		return Array.from(userMap.values())
	}

	async getTicketDetails(ticketId: string): Promise<Ticket> {
		const issue = await this.jira.findIssue(ticketId, "summary,description")

		const description =
			issue.fields.description?.content?.map((c: any) => c.content?.map((p: any) => p.text).join("")).join("\n") ||
			issue.fields.description ||
			issue.fields.summary ||
			"No description"

		return {
			summary: issue.fields.summary,
			description
		}
	}

	async suggestBestAssigneeWithOpenAI(projectKey: string, ticketId: string): Promise<JiraOpenAISuggestionResponse> {
		const newTicket = await this.getTicketDetails(ticketId)
		const users = await this.getUserTicketHistory(projectKey)

		const prompt = `
		We have a new Jira ticket:
		Summary: ${newTicket.summary}
		Description: ${newTicket.description}
		
		Below are users and the descriptions of their past completed tickets:
		
		${users.map(user => `- ${user.name}:\n${user.pastDescriptions.slice(0, 3).join("\n")}`).join("\n\n")}
		
		Based on past experience, who is the most suitable person to assign this new ticket to? Reply only with their name and a short reason.
		
		Please reply in the following format:
		Name: [Full name]
		Reason: [Brief explanation]
		`

		const completion = await new OpenAI({ apiKey: process.env.OPENAI_API_KEY }).chat.completions.create({
			model: "gpt-4",
			messages: [
				{ role: "system", content: "You are an expert in work delegation and team optimization." },
				{ role: "user", content: prompt }
			],
			temperature: 0.4
		})

		const content = completion.choices[0].message?.content?.trim() || ""

		const nameMatch = content.match(/Name:\s*(.+)/i)
		const reasonMatch = content.match(/Reason:\s*(.+)/i)

		const name = nameMatch?.[1]?.trim() || ""
		const reason = reasonMatch?.[1]?.trim() || ""

		return { name, reason }
	}

	async getTaskProgress(): Promise<number> {
		const projects = await this.getJiraProjects()

		let totalUnassigned = 0
		let totalCompleted = 0

		for (const project of projects) {
			const unassignedIssues = await this.getJiraProjectUnassignedIssues(project.key)
			totalUnassigned += unassignedIssues.length

			const jql = `project = "${project.key}" AND statusCategory = Done`
			const doneIssues = await this.jira.searchJira(jql, {
				fields: [],
				maxResults: 1000
			})

			totalCompleted += doneIssues.issues.length
		}

		const total = totalUnassigned + totalCompleted

		if (total === 0) return 0

		const percentage = (totalCompleted / total) * 100
		return parseFloat(percentage.toFixed(1))
	}
}
