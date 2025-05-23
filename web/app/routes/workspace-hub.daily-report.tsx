import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  redirect,
  ShouldRevalidateFunctionArgs,
  useActionData,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { ActivityClient, UserClient } from "~/clients";
import { AppHeaderBreadcrumbs, AppLayout } from "~/components/layout";
import {
  displaySuccess,
  formatDate,
  fullNameFormatter,
  handleAxiosError,
  IUserWithFullName,
} from "~/util";
import {
  ActivityAction,
  ActivityType,
  BreadcrumbVariant,
  DailyActivityIntent,
  IActivityByIdResponse,
  IActivityHours,
  IDailyActivityReq,
  IEmployeeParams,
  IProjectUserResponse,
  IUserResponse,
  LoaderData,
  ReportingModuleType,
  SearchParam,
  Status,
} from "~/types";
import { projectHoursFormSchema, dailyActivityFormSchema } from "~/schemas";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { USER_HUB_PATH, WORKSPACE_HUB_PATH } from "~/constants";
import { DailyReportForm } from "~/components/features";
import { mapProjectsUserResponseToActivityHours } from "~/mappers";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();
  const workspaceId = actionArgs.params.workspaceId;
  const { searchParams } = new URL(actionArgs.request.url);
  const userIdFromActivityDashboard = searchParams.get("userId");
  const userIdFromEmployeeDetails = searchParams.get("employeeId");

  const submission = parseWithZod(formData, {
    schema: z.discriminatedUnion("intent", [
      dailyActivityFormSchema,
      projectHoursFormSchema,
    ]),
  });

  if (submission.status !== Status.Success) {
    return json(submission.reply());
  }

  try {
    switch (submission.value.intent) {
      case DailyActivityIntent.Activities: {
        return json(submission.reply());
      }
      case DailyActivityIntent.DailyActivities: {
        const date = formatDate(submission.value.date);
        const request: IDailyActivityReq = {
          activityType: ActivityType.Daily,
          date: date,
          lunch: submission.value.lunch,
          workLocation: submission.value.location,
          workingHours: submission.value.workingTime.map((time) => ({
            timeRange: {
              fromTimeStart: time?.timeRange.fromTimeStart,
              toTimeEnd: time?.timeRange.toTimeEnd,
            },
            projectId: time?.projectId,
          })),
        };
        switch (submission.value.action) {
          case ActivityAction.Create:
            if (!submission.value.userId) {
              throw Error(t("error.somethingWentWrong") as string);
            }
            await ActivityClient.createActivity(
              {
                employeeId: submission.value.userId,
              },
              request
            );
            displaySuccess(t("dailyReport.activityCreated"));

            if (userIdFromActivityDashboard) {
              return redirect(`${WORKSPACE_HUB_PATH}/activity-dashboard`);
            }

            if (userIdFromEmployeeDetails) {
              return redirect(
                `${WORKSPACE_HUB_PATH}/employees/${userIdFromEmployeeDetails}`
              );
            }

            return redirect(`${WORKSPACE_HUB_PATH}/requests`);
          case ActivityAction.Update:
            if (!submission.value.activityId || !submission.value.userId) {
              throw new Error(t("error.somethingWentWrong") as string);
            }

            if (submission.value.location) {
              await ActivityClient.updateActivity(
                {
                  employeeId: submission.value.userId,
                },
                submission.value.activityId,
                request
              );
              displaySuccess(t("dailyReport.activityUpdated"));
            }

            if (userIdFromActivityDashboard) {
              return redirect(`${WORKSPACE_HUB_PATH}/activity-dashboard`);
            }

            if (userIdFromEmployeeDetails) {
              return redirect(
                `${WORKSPACE_HUB_PATH}/employees/${userIdFromEmployeeDetails}`
              );
            }

            return redirect(`${WORKSPACE_HUB_PATH}/requests`);
        }
      }
    }
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  const searchParams = new URL(loaderArgs.request.url).searchParams;
  const date = searchParams.get("date");
  const action = searchParams.get("action");

  if (
    !date ||
    !dayjs(date, "YYYY-MM-DD").isValid() ||
    !action ||
    (action !== ActivityAction.Create && action !== ActivityAction.Update)
  ) {
    throw redirect(`${USER_HUB_PATH}/dashboard`);
  }

  try {
    const users = await UserClient.getUsers(loaderArgs);
    return json({
      users: users.data,
    });
  } catch (error) {
    handleAxiosError(error);
    return redirect(`${WORKSPACE_HUB_PATH}`);
  }
};

export const shouldRevalidate = ({
  actionResult,
}: ShouldRevalidateFunctionArgs) => {
  // Do not revalidate on form error and activities submit
  return (
    actionResult &&
    actionResult.initialValue?.intent !== DailyActivityIntent.Activities &&
    actionResult.status === Status.Success
  );
};

export default function ActivityDetails() {
  const lastResult = useActionData<typeof clientAction>();
  const { users } = useLoaderData<typeof clientLoader>() as {
    users: IUserResponse[];
    loaderArgs: ClientLoaderFunctionArgs;
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const userIdFromActivityDashboard = searchParams.get("userId");
  const userIdFromEmployeeDetails = searchParams.get("employeeId");

  const userFromActivityDashboard = users?.find(
    (user) => user.id === Number(userIdFromActivityDashboard)
  );

  const userFromEmployeeDetails = users?.find(
    (user) => user.id === Number(userIdFromEmployeeDetails)
  );

  const [latestActivity, setLatestActivity] =
    useState<IActivityByIdResponse | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUserResponse>(
    (userFromActivityDashboard || userFromEmployeeDetails) ?? users[0]
  );

  const [projects, setProjects] = useState<IProjectUserResponse[]>();
  const [selectedProjects, setSelectedProjects] = useState<
    IActivityHours[] | undefined
  >();
  const [unassignedActivities, setUnassignedActivities] = useState<
    IActivityByIdResponse[] | null
  >();

  const data = useRouteLoaderData<LoaderData>("root");
  const userAllowedReportingDaysInPast: number | undefined = 8;

  useEffect(() => {
    const reportDate = searchParams.get(SearchParam.Date)!;
    if (!selectedUser || !reportDate) return;
    setSelectedProjects([]);

    const employeeParams: IEmployeeParams = {
      employeeId: selectedUser.id,
    };

    const fetchUserProjects = async () => {
      const data = await UserClient.getUserById(employeeParams);
      if (data.projects) {
        setProjects((prev) => (prev !== data.projects ? data.projects : prev));
        return data.projects;
      }
    };
    const fetchLatestActivity = async (projects: IProjectUserResponse[]) => {
      ActivityClient.getLastDailyActivity(employeeParams, {
        date: reportDate,
      })
        .then((data) => {
          if (data && projects) {
            setLatestActivity(data);
            const lastActivityProjects = data?._embedded?.activities?.map(
              (activity) => ({
                projectId: activity.projectId,
                hours: activity.hours,
                projectName: activity.projectName,
              })
            );

            setSelectedProjects(
              lastActivityProjects.filter((latestProject) =>
                projects.some(
                  (project) => project.id === latestProject.projectId
                )
              )
            );
          }
        })
        .catch((error) => {
          handleAxiosError(error);
        });
    };

    const setReportAction = async () => {
      ActivityClient.getActivitiesOnDay({
        userId: employeeParams.employeeId,
        dateStart: reportDate,
        dateEnd: reportDate,
      })
        .then((data) => {
          const dailyActivities = data.activities.filter(
            (activity) => activity.activityType === ActivityType.Daily
          );
          if (dailyActivities.length > 0) {
            searchParams.set("action", "update");
          } else {
            searchParams.set("action", "create");
          }
          setSearchParams(searchParams, {
            replace: true,
            preventScrollReset: true,
          });
        })
        .catch((error) => {
          handleAxiosError(error);
        });
    };

    const initializeData = async () => {
      const projects = await fetchUserProjects();
      if (projects) {
        await fetchLatestActivity(projects);
      }
      await setReportAction();
    };

    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser, searchParams]);

  useEffect(() => {
    if (!lastResult || lastResult.status !== Status.Success || !projects) {
      return;
    }

    const activityHours = mapProjectsUserResponseToActivityHours(
      projects,
      lastResult
    );

    if (activityHours?.length) {
      setSelectedProjects(activityHours);
    }
  }, [lastResult, projects]);

  const handleUserChange = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    user && setSelectedUser(user);
  };

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("Daily report"),
            variant: BreadcrumbVariant.Current,
          },
          {
            text: fullNameFormatter(selectedUser as IUserWithFullName) ?? "",
            variant: BreadcrumbVariant.Other,
          },
        ]}
      />
      <DailyReportForm
        latestActivity={latestActivity}
        lastResult={lastResult}
        unassignedActivities={unassignedActivities}
        selectedProjects={selectedProjects}
        handleUserChange={handleUserChange}
        users={users}
        selectedUser={selectedUser}
        projects={projects}
        userAllowedReportingDaysInPast={userAllowedReportingDaysInPast}
      />
    </AppLayout>
  );
}
