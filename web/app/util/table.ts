import { ActivityType, IActivity, getActivityTypeLabel } from "~/types";
import { t } from "i18next";

const formatTripDetails = (trip: IActivity, type: ActivityType) => {
  const label = getActivityTypeLabel(type);
  const locations = `${trip.locationFrom || trip.location}`;

  const details = trip.distanceInKM
    ? `${locations} - ${trip.distanceInKM} km`
    : locations;

  return `${label}: ${details}`;
};

const formatBusinessTrip = (trip: IActivity) => {
  return formatTripDetails(trip, ActivityType.BusinessTrip);
};

export const getTripCellValue = (trip: IActivity) => {
  if (!trip) {
    return t("error.notPresent");
  }

  switch (trip.activityType) {
    case ActivityType.BusinessTrip:
      return formatBusinessTrip(trip);
    default:
      return t("error.notPresent");
  }
};

export const getAbsenceDescription = (absence: IActivity) => {
  const absenceType = getActivityTypeLabel(absence.activityType);
  switch (absence.activityType) {
    case ActivityType.SickLeave: {
      const hours =
        (absence.hours ?? 0) < 8 ? (absence.hours ?? 0) + " h" : null;
      return `${absenceType}${hours ? " - " + hours : ""}`;
    }
    default:
      return `${absenceType}`;
  }
};
