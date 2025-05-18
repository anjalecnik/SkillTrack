import { t } from "i18next";

export enum ActivityType {
  BusinessTrip = "BusinessTrip",
  TripToOffice = "TripToOffice",
  Daily = "Daily",
  Expense = "Expense",
  OnCall = "OnCall",
  Overtime = "Overtime",
  SchoolSchedule = "SchoolSchedule",
  SickLeave = "SickLeave",
  SpecialLeave = "SpecialLeave",
  Unassigned = "Unassigned",
  Vacation = "Vacation",
  Weekend = "Weekend",
  Holiday = "Holiday",
  Empty = "Empty",
  Lunch = "Lunch",
}

export enum ActivityTypeLowerCase {
  BusinessTrip = "businessTrip",
  TripToOffice = "tripToOffice",
  Daily = "daily",
  Expense = "expense",
  OnCall = "onCall",
  Overtime = "overtime",
  SchoolSchedule = "schoolSchedule",
  SickLeave = "sickLeave",
  SpecialLeave = "specialLeave",
  Unassigned = "unassigned",
  Vacation = "vacation",
  Weekend = "weekend",
  Holiday = "holiday",
  Empty = "empty",
}

export enum MoreToReportActivityType {
  OnCall = "OnCall",
  Overtime = "Overtime",
  Expense = "Expense",
  BusinessTrip = "BusinessTrip",
  TripToOffice = "TripToOffice",
}

export enum MoreToReportActivityTooltipType {
  OnCall = "On-call",
  Overtime = "Overtime",
  Expense = "Expense",
  BusinessTrip = "Business trip",
  TripToOffice = "Trip to office",
}

export enum PlanAbsenceActivityType {
  Vacation = "Vacation",
  SchoolSchedule = "SchoolSchedule",
  SickLeave = "SickLeave",
  SpecialLeave = "SpecialLeave",
}

export enum SpecialLeaveActivityType {
  OwnWedding = "Own wedding",
  ChildBirth = "Child birth",
  SpouseOrChildDeath = "Spouse or child death",
  ParentOrInLawDeath = "Parent or in law death",
  BrotherOrSisterDeath = "Brother or sister death",
  LocalRelocation = "Local relocation",
  DistantRelocation = "Distant relocation",
  ElementaryDisaster = "Elementary disaster",
  Other = "Other",
}

export enum ExtraActivitiesType {
  OnCall = "OnCall",
  Overtime = "Overtime",
  Expense = "Expense",
  BusinessTrip = "BusinessTrip",
  Vacation = "Vacation",
  SchoolSchedule = "SchoolSchedule",
  SickLeave = "SickLeave",
  TripToOffice = "TripToOffice",
}

export enum ActivityExpenseType {
  Internal = "Internal",
}

export const getActivityExpenseTypeLabel = (
  type: ActivityExpenseType
): string => {
  switch (type) {
    case ActivityExpenseType.Internal:
      return t("userHub.internal");
    default:
      return t("userHub.internal");
  }
};

export const getActivityTypeLabel = (type: ActivityType): string => {
  switch (type) {
    case ActivityType.BusinessTrip:
      return t("userHub.businessTrip");
    case ActivityType.TripToOffice:
      return t("userHub.tripToOffice");
    case ActivityType.Daily:
      return t("userHub.daily");
    case ActivityType.Expense:
      return t("userHub.expense");
    case ActivityType.OnCall:
      return t("userHub.onCall");
    case ActivityType.Overtime:
      return t("userHub.overtime");
    case ActivityType.SchoolSchedule:
      return t("userHub.schoolSchedule");
    case ActivityType.SickLeave:
      return t("userHub.sickLeave");
    case ActivityType.SpecialLeave:
      return t("userHub.specialLeave");
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
    case MoreToReportActivityType.Overtime:
      return t("userHub.overtime");
    case MoreToReportActivityType.OnCall:
      return t("userHub.onCall");
    case MoreToReportActivityType.Expense:
      return t("userHub.expense");
    case MoreToReportActivityType.BusinessTrip:
      return t("userHub.businessTrip");
    case MoreToReportActivityType.TripToOffice:
      return t("userHub.tripToOffice");
    default:
      return t("error.notPresent");
  }
};

export const getAbsenceTypeLabel = (type: PlanAbsenceActivityType): string => {
  switch (type) {
    case PlanAbsenceActivityType.Vacation:
      return t("userHub.vacation");
    case PlanAbsenceActivityType.SchoolSchedule:
      return t("userHub.schoolSchedule");
    case PlanAbsenceActivityType.SickLeave:
      return t("userHub.sickLeave");
    case PlanAbsenceActivityType.SpecialLeave:
      return t("userHub.specialLeave");
    default:
      return t("error.notPresent");
  }
};

export const getSpecialLeaveTypeLabel = (
  type: SpecialLeaveActivityType
): string => {
  switch (type) {
    case SpecialLeaveActivityType.OwnWedding:
      return t("userHub.ownWedding");
    case SpecialLeaveActivityType.ChildBirth:
      return t("userHub.childBirth");
    case SpecialLeaveActivityType.SpouseOrChildDeath:
      return t("userHub.spouseOrChildDeath");
    case SpecialLeaveActivityType.ParentOrInLawDeath:
      return t("userHub.parentOrInLawDeath");
    case SpecialLeaveActivityType.BrotherOrSisterDeath:
      return t("userHub.brotherOrSisterDeath");
    case SpecialLeaveActivityType.LocalRelocation:
      return t("userHub.localRelocation");
    case SpecialLeaveActivityType.DistantRelocation:
      return t("userHub.distantRelocation");
    case SpecialLeaveActivityType.ElementaryDisaster:
      return t("userHub.elementaryDisaster");
    case SpecialLeaveActivityType.Other:
      return t("userHub.other");
    default:
      return t("error.notPresent");
  }
};

export enum ActivityTableView {
  Activities = "activities",
  Absence = "absence",
}
