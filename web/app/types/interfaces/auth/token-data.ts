import { UserRoles } from "~/types";

export interface IWorkspaceData {
  id: number;
  email: string;
  role: UserRoles;
  status: string;
}

export interface IUsereData {
  id: number;
  email: string;
  role: UserRoles;
  status: string;
}

export interface ITokenData {
  uuid: string;
  user: IUsereData;
  iat: number;
  exp: number;
}
