import { t } from "i18next";

export enum ReservationTimePeriod {
  Weekly = "Weekly",
  Daily = "Daily",
  Once = "Once",
}

export const getReservationTimePeriodLabel = (
  type: ReservationTimePeriod
): string => {
  switch (type) {
    case ReservationTimePeriod.Once:
      return t("workspaceReservations.once");
    case ReservationTimePeriod.Daily:
      return t("workspaceReservations.daily");
    case ReservationTimePeriod.Weekly:
      return t("workspaceReservations.weekly");
    default:
      return t("error.notPresent");
  }
};
