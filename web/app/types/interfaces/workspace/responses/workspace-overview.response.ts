import { IWorkspace } from "~/types";

export interface IWorkspaceOverview
  extends Pick<IWorkspace, "id" | "email" | "name"> {
  projectsCount: number;
  workspaceUsersCount: number;
  isInvited: boolean;
  workspaceUserRole: string;
  userJoinData: {
    email: string;
    name: string;
    surname: string;
  };
}
