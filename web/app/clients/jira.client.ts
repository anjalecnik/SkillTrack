import { JiraProjects, JiraStats, JiraUnassignedIssues } from "~/types/jira";
import { privateClient } from "~/util/api";

export class JiraClient {
  static async getProjects(): Promise<JiraProjects[]> {
    const { data } = await privateClient.get<JiraProjects[]>(`/jira/projects`);
    return data;
  }

  static async getUnassignedTickets(
    projectKey: string
  ): Promise<JiraUnassignedIssues[]> {
    const { data } = await privateClient.get<JiraUnassignedIssues[]>(
      `/jira/${projectKey}/unassigned-issues`
    );
    return data;
  }

  static async getJiraProjectStats(projectKey: string): Promise<JiraStats[]> {
    const { data } = await privateClient.get<JiraStats[]>(
      `/jira/${projectKey}`
    );
    return data;
  }

  static async assignTicketToUser(ticketId: string, assignee: string) {
    const { data } = await privateClient.post<JiraStats>(
      `/jira/${ticketId}/${assignee}`
    );
    return data;
  }
}
