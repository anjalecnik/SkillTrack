import { WorkspaceProjectStatus, IProjectParticipant } from "~/types";

export interface IProject {
  id: number;
  name: string;
  dateStart: string; // ISO date string
  dateEnd: string; // ISO date string
  participants?: IProjectParticipant[];
  status?: WorkspaceProjectStatus;
  totalHours?: number;
  totalDays: number;
}
