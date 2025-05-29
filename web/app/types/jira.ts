export type JiraStats = {
  user: string;
  accountId: string;
  todo: number;
  inProgress: number;
  done: number;
  totalDoneHistory: number;
  totalAssigned: number;
};

export type JiraProjects = { key: string; name: string };

export type JiraUnassignedIssues = { key: string; summary: string };
