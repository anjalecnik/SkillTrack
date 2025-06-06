import { JiraStatisticsResponse } from "src/modules/jira/dtos/response/jira-statistics.response";
import { UserTicketHistory } from "../dtos/response/jira-user-ticket-history.response";
import { Ticket } from "../dtos/response/jira-ticket.response";
import { JiraOpenAISuggestionResponse } from "../dtos/response/jira-openai-suggestion.response";
import { JiraTicketsForUserResponse } from "../dtos/response/jira-tickets-for-user.response";
export declare class JiraService {
    private readonly jira;
    constructor();
    getJiraProjects(): Promise<any>;
    getJiraProjectUnassignedIssues(projectKey: string): Promise<any>;
    getJiraProjectParticipantsAvailability(projectKey: string): Promise<JiraStatisticsResponse[]>;
    assignTicketToUser(ticketId: string, accountId: string): Promise<void>;
    getUserTicketHistory(projectKey: string): Promise<UserTicketHistory[]>;
    getTicketDetails(ticketId: string): Promise<Ticket>;
    suggestBestAssigneeWithOpenAI(projectKey: string, ticketId: string): Promise<JiraOpenAISuggestionResponse>;
    getTaskProgress(): Promise<number>;
    getTicketsAssignedToUser(fullName: string): Promise<JiraTicketsForUserResponse[]>;
}
