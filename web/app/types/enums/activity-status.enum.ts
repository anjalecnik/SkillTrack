import { t } from "i18next";

export enum ActivityStatus {
  PendingApproval = "PendingApproval",
  Approved = "Approved",
  Canceled = "Canceled",
  Rejected = "Rejected",
  Assigned = "Assigned",
  Unassigned = "Unassigned",
}

export const getActivityStatusLabel = (status: ActivityStatus): string => {
  switch (status) {
    case ActivityStatus.PendingApproval:
      return t("activityStatus.pendingApproval");
    case ActivityStatus.Approved:
      return t("activityStatus.approved");
    case ActivityStatus.Canceled:
      return t("activityStatus.canceled");
    case ActivityStatus.Rejected:
      return t("activityStatus.rejected");
    case ActivityStatus.Assigned:
      return t("activityStatus.assigned");
    case ActivityStatus.Unassigned:
      return t("activityStatus.unassigned");
    default:
      return t("error.notPresent");
  }
};
