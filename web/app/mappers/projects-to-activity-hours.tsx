import { SubmissionResult } from "@conform-to/react";
import { DEFAULT_ACTIVITY_DURATION } from "~/constants";
import { IActivityHoursForm, IProjectUserResponse } from "~/types";

export function mapProjectsUserResponseToActivityHours(
  projects: IProjectUserResponse[],
  lastResult: SubmissionResult<string[]>
) {
  const activities: IActivityHoursForm[] =
    (lastResult.initialValue?.activities as unknown as IActivityHoursForm[]) ??
    [];

  return projects
    ?.filter((project) =>
      activities.some((activity) => Number(activity.projectId) == project.id)
    )
    .map((project) => {
      const activity = activities.find(
        (activity) => Number(activity.projectId) == project.id
      );

      return {
        projectName: project.name,
        hours: activity?.hours
          ? Number(activity?.hours)
          : DEFAULT_ACTIVITY_DURATION,
        projectId: project.id,
      };
    });
}
