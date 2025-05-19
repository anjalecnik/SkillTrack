import { WorkspaceProjectStatus } from "~/types";

export interface IProjectUpdateRequest {
  name?: string;
  status?: WorkspaceProjectStatus;
  dateStart?: string;
  dateEnd: string | null;
}
