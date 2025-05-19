import { t } from "i18next";

export enum UserStatus {
  Active = "Active",
  Invited = "Invited",
  Deactivated = "Deactivated",
}

export enum UserStatusWithoutInvited {
  Active = "Active",
  Deactivated = "Deactivated",
}

export function getUserStatusWithoutInvitedLabel(
  value: UserStatusWithoutInvited
): string {
  return {
    [UserStatusWithoutInvited.Active]: t("workspaceEmployees.active"),
    [UserStatusWithoutInvited.Deactivated]: t("workspaceEmployees.deactivated"),
  }[value];
}
