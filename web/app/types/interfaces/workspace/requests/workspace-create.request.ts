import { IOwner, IWorkspace } from "~/types";

export interface IWorkspaceCreateReq
  extends Pick<IWorkspace, "name" | "email" | "timezone"> {
  owner: IOwner;
}
