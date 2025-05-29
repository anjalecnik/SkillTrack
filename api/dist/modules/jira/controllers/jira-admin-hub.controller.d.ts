import { JiraProjectsResponse } from "src/modules/jira/dtos/response/jira-projects.response";
import { JiraProjectUnassignedIssuesResponse } from "src/modules/jira/dtos/response/jira-project-unassigned-issues.response";
import { JiraStatisticsResponse } from "src/modules/jira/dtos/response/jira-statistics.response";
import { JiraService } from "../services/jira.service";
export declare class JiraAdminHubController {
    private jiraService;
    constructor(jiraService: JiraService);
    getJiraProjects(): Promise<JiraProjectsResponse>;
    getJiraProjectUnassignedIssues(projectKey: string): Promise<JiraProjectUnassignedIssuesResponse>;
    getJiraProjectParticipants(projectKey: string): Promise<JiraStatisticsResponse[]>;
    assignJiraTicket(ticketId: string, assigneId: string): Promise<void>;
}
