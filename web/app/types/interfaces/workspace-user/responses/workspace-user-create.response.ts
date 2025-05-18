import { IWorkspace } from "~/types";

export interface IWorkspaceUserCreateRes extends IWorkspace {
  status: string;
  role: string;
  name: string;
  surname: string;
}
