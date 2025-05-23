import { redirect } from "@remix-run/node";
import { LocalStorageService } from "./services";
import { jwtDecode } from "jwt-decode";
import { ITokenData, IWorkspaceUser, UserRoles } from "~/types";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";

export function getDecodedToken(url?: string): ITokenData {
  const token = LocalStorageService.getString("token");
  if (!token) {
    throw redirect(url ? `/?returnUrl=${url}` : "/");
  }

  return jwtDecode<ITokenData>(token);
}

export function requireAdminRoleOrHigher(
  args: ClientLoaderFunctionArgs
): ITokenData {
  const searchParams = new URL(args.request.url).searchParams;
  const mailUserId = searchParams.get("id");

  const parsedUrl = new URL(args.request.url);
  const returnUrl = `${parsedUrl.pathname}?${parsedUrl.searchParams}`;
  const decodedToken = requireAuth(returnUrl);

  return decodedToken;
}

export function requireAuth(returnUrl?: string): ITokenData {
  return getDecodedToken(returnUrl);
}

export function requireNoAuth(): void {
  const token = LocalStorageService.getString("token");
  if (token) {
    throw redirect("/user-hub/dashboard");
  }
}

export function getWorkspaceUserFromToken(
  args: ClientActionFunctionArgs | ClientLoaderFunctionArgs
) {
  const parsedUrl = new URL(args.request.url);
  const currentHub = localStorage.getItem("currentHub");

  const returnUrl = `${parsedUrl.pathname}`;
  const decodedToken = requireAuth(returnUrl);

  const currentHubFromUrl = parsedUrl.pathname.includes("workspace-hub")
    ? "workspace-hub"
    : "user-hub/dashboard";
  if (currentHub !== currentHubFromUrl) {
    localStorage.setItem("currentHub", currentHubFromUrl);
  }

  const workspaceUserAcc = decodedToken.user;

  if (!workspaceUserAcc) {
    throw redirect("/auth");
  }

  return workspaceUserAcc;
}

export function isSupervisorOrHigher(workspaceUser: IWorkspaceUser): boolean {
  return workspaceUser.role !== UserRoles.User || workspaceUser.isSupervisor;
}
