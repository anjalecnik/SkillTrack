import { JiraStatisticsResponse } from "src/modules/jira/dtos/response/jira-statistics.response";
export declare class JiraService {
    private readonly jira;
    constructor();
    getJiraProjects(): Promise<any>;
    getJiraProjectUnassignedIssues(projectKey: string): Promise<any>;
    getJiraProjectParticipantsAvailability(projectKey: string): Promise<JiraStatisticsResponse[]>;
    assignTicketToUser(ticketId: string, accountId: string): Promise<void>;
}
