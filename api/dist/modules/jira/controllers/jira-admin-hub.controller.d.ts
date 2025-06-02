import { JiraProjectsResponse } from "src/modules/jira/dtos/response/jira-projects.response";
import { JiraProjectUnassignedIssuesResponse } from "src/modules/jira/dtos/response/jira-project-unassigned-issues.response";
import { JiraStatisticsResponse } from "src/modules/jira/dtos/response/jira-statistics.response";
import { JiraService } from "../services/jira.service";
import { JiraOpenAISuggestionResponse } from "../dtos/response/jira-openai-suggestion.response";
export declare class JiraAdminHubController {
    private jiraService;
    constructor(jiraService: JiraService);
    getJiraProjects(): Promise<JiraProjectsResponse>;
    getJiraProjectUnassignedIssues(projectKey: string): Promise<JiraProjectUnassignedIssuesResponse>;
    getJiraProjectParticipants(projectKey: string): Promise<JiraStatisticsResponse[]>;
    getOpenAISuggestionForAsignee(projectKey: string, ticketId: string): Promise<JiraOpenAISuggestionResponse>;
    assignJiraTicket(ticketId: string, assigneId: string): Promise<void>;
}
