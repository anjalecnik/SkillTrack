import { WorkspaceProjectUserRole } from "~/types";

export interface IProjectUserResponse {
  id: number;
  name: string;
  role?: WorkspaceProjectUserRole;
}
