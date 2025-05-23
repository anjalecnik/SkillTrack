import { t } from "i18next";

export enum ActivityType {
  BusinessTrip = "BusinessTrip",
  Daily = "Daily",
  SickLeave = "SickLeave",
  Unassigned = "Unassigned",
  Vacation = "Vacation",
  Weekend = "Weekend",
  Holiday = "Holiday",
  Empty = "Empty",
  Lunch = "Lunch",
}

export enum ActivityTypeLowerCase {
  BusinessTrip = "businessTrip",
  Daily = "daily",
  SickLeave = "sickLeave",
  Unassigned = "unassigned",
  Vacation = "vacation",
  Weekend = "weekend",
  Holiday = "holiday",
  Empty = "empty",
}

export enum MoreToReportActivityType {
  BusinessTrip = "BusinessTrip",
}

export enum MoreToReportActivityTooltipType {
  BusinessTrip = "Business trip",
}

export enum PlanAbsenceActivityType {
  Vacation = "Vacation",
  SickLeave = "SickLeave",
}

export enum ExtraActivitiesType {
  BusinessTrip = "BusinessTrip",
  Vacation = "Vacation",
  SickLeave = "SickLeave",
}

export const getActivityTypeLabel = (type: ActivityType): string => {
  switch (type) {
    case ActivityType.BusinessTrip:
      return t("userHub.businessTrip");
    case ActivityType.Daily:
      return t("userHub.daily");
    case ActivityType.SickLeave:
      return t("userHub.sickLeave");
    case ActivityType.Unassigned:
      return t("userHub.unassigned");
    case ActivityType.Vacation:
      return t("userHub.vacation");
    case ActivityType.Holiday:
      return t("userHub.holiday");
    case ActivityType.Weekend:
      return t("userHub.weekend");
    default:
      return t("error.notPresent");
  }
};

export const getMoreToReportTypeLabel = (
  type: MoreToReportActivityType
): string => {
  switch (type) {
    case MoreToReportActivityType.BusinessTrip:
      return t("userHub.businessTrip");
    default:
      return t("error.notPresent");
  }
};

export const getAbsenceTypeLabel = (type: PlanAbsenceActivityType): string => {
  switch (type) {
    case PlanAbsenceActivityType.Vacation:
      return t("userHub.vacation");
    case PlanAbsenceActivityType.SickLeave:
      return t("userHub.sickLeave");
    default:
      return t("error.notPresent");
  }
};

export enum ActivityTableView {
  Activities = "activities",
  Absence = "absence",
}
