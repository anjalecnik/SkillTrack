import {
  AssignedVacations,
  Employments,
  IAddress,
  IProjectUserUpdateReq,
} from "~/types";

interface EmergencyContact {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
}

interface WorkspaceGear {
  id?: number;
}

interface AssignedVacationsReq extends Omit<AssignedVacations, "id"> {
  id?: number;
}

export interface EmploymentsReq extends Omit<Employments, "id"> {
  id?: number;
}

export interface IWorkspaceUserUpdateReq {
  name?: string;
  surname?: string;
  nationality?: string | null;
  birthDate?: string | null;
  phone?: string | null;
  teamId?: number;
  workPositionId?: number | null;
  managerId?: number | null;
  addresses?: IAddress[];
  projects?: IProjectUserUpdateReq[];
  assignedVacations?: AssignedVacationsReq[];
  status?: string | null;
}
