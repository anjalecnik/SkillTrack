import {
  ActivityType,
  IActivity,
  MoreToReportActivityType,
  MoreToReportEditRequestType,
} from "~/types";
import { formatDateWithTimeWithoutTimezone } from "./date-utils";

export class MoreToReportEditRequest {
  static handleBusinessTripEdit(
    activity: IActivity,
    {
      setIsEditing,
      setSelectedMoreToReportType,
      setDefaultMoreToReportValues,
      setIsMoreToReportDialogOpen,
      setDefaultMoreToReportProject,
    }: MoreToReportEditRequestType
  ) {
    if (activity.activityType !== ActivityType.BusinessTrip) return;

    if (
      activity.projectId &&
      activity.projectName &&
      setDefaultMoreToReportProject
    )
      setDefaultMoreToReportProject([
        {
          id: activity.projectId,
          name: activity.projectName,
        },
      ]);

    setIsEditing(true);
    setSelectedMoreToReportType(MoreToReportActivityType.BusinessTrip);

    setDefaultMoreToReportValues(
      MoreToReportEditRequest.defaultBusinessTripValues(activity)
    );

    setIsMoreToReportDialogOpen(true);
  }

  private static defaultBusinessTripValues(activity: IActivity) {
    return {
      dateStart: formatDateWithTimeWithoutTimezone(
        activity.dateStart,
        "DD.MM.YYYY",
        "DD.MM.YYYY"
      ),
      departureTime: formatDateWithTimeWithoutTimezone(
        activity.dateStart,
        "DD.MM.YYYY",
        "HH:mm"
      ),
      dateEnd: formatDateWithTimeWithoutTimezone(
        activity.dateEnd,
        "DD.MM.YYYY",
        "DD.MM.YYYY"
      ),
      returnTime: formatDateWithTimeWithoutTimezone(
        activity.dateEnd,
        "DD.MM.YYYY",
        "HH:mm"
      ),
      location: activity.location,
      distanceInKM: activity.distanceInKM,
      description: activity.description,
      activityId: activity.id,
      projectId: activity.projectId,
      employeeId: activity._embedded.workspaceUser.id,
    };
  }
}
