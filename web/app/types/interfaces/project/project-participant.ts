import { WorkspaceProjectUserRole, IUser } from "~/types";

export interface IProjectParticipant extends IUser {
  projectRole: WorkspaceProjectUserRole;
}
