import dayjs from "dayjs";
import { ActivityTypeLowerCase, IWorkspaceModuleActivity } from "~/types";

const maximumDaysInPast = (
  type: ActivityTypeLowerCase,
  reportRestrictions: IWorkspaceModuleActivity | undefined
) => {
  return reportRestrictions?.[type].maximumDaysInPast;
};

const maximumDaysInFuture = (
  type: ActivityTypeLowerCase,
  reportRestrictions: IWorkspaceModuleActivity | undefined
) => {
  return reportRestrictions?.[type].maximumDaysInFuture;
};

export const isActivityWithinReportableDays = (
  reportRestrictions: IWorkspaceModuleActivity | undefined,
  activityType: ActivityTypeLowerCase,
  date: string
) => {
  if (!reportRestrictions) return true;

  const activityMaxDaysInPast = maximumDaysInPast(
    activityType,
    reportRestrictions
  );
  const activityMaxDaysInFuture = maximumDaysInFuture(
    activityType,
    reportRestrictions
  );

  const numOfDaysAgo = dayjs().subtract(activityMaxDaysInPast ?? 0, "day");
  const numOfDaysFuture = dayjs().add(activityMaxDaysInFuture ?? 365, "day");
  const inputDate = dayjs(date);

  const isWithinAllowedDays =
    (inputDate.isAfter(numOfDaysAgo) && inputDate.isBefore(numOfDaysFuture)) ||
    inputDate.isSame(numOfDaysAgo, "day") ||
    inputDate.isSame(dayjs(), "day");

  return isWithinAllowedDays;
};
