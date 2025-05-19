import { WorkspaceProjectUserRole } from "~/types";

export interface IProjectUserUpdateReq {
  id: number;
  role: WorkspaceProjectUserRole;
}
