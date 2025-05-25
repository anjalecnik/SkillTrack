import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  redirect,
  ShouldRevalidateFunctionArgs,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { ActivityClient, UserClient } from "~/clients";
import { AppHeaderBreadcrumbs, AppLayout } from "~/components/layout";
import {
  buildUrlWithParams,
  displaySuccess,
  formatDate,
  getWorkspaceUserFromToken,
  handleAxiosError,
} from "~/util";
import {
  ActivityAction,
  ActivityType,
  BreadcrumbVariant,
  DailyActivityIntent,
  IActivityHours,
  IDailyActivityReq,
  IEmailSuccessParams,
  Status,
  SearchParam,
  IEmployeeParams,
} from "~/types";
import { projectHoursFormSchema, dailyActivityFormSchema } from "~/schemas";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { USER_HUB_PATH } from "~/constants";
import {
  DailyReportForm,
  MismatchUserWarningDialog,
} from "~/components/features";
import { mapProjectsUserResponseToActivityHours } from "~/mappers";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();
  const workspaceUserAcc = getWorkspaceUserFromToken(actionArgs);
  const searchParams = new URL(actionArgs.request.url).searchParams;
  const employeeIdFromSearchParams = Number(
    searchParams.get(SearchParam.EmployeeId)
  );

  let employeeId = employeeIdFromSearchParams;
  if (!employeeId || isNaN(employeeId)) {
    employeeId = workspaceUserAcc.id;
  }

  const submission = parseWithZod(formData, {
    schema: z.discriminatedUnion("intent", [
      dailyActivityFormSchema,
      projectHoursFormSchema,
    ]),
  });

  if (submission.status !== Status.Success) {
    return json(submission.reply());
  }

  const workspaceEmployeeParams: IEmployeeParams = {
    employeeId: employeeId,
  };

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
            await ActivityClient.createActivity(
              workspaceEmployeeParams,
              request
            );
            displaySuccess(t("dailyReport.activityCreated"));

            break;
          case ActivityAction.Update:
            if (!submission.value.activityId) {
              throw new Error(t("error.somethingWentWrong") as string);
            }

            if (submission.value.location) {
              await ActivityClient.updateActivity(
                workspaceEmployeeParams,
                submission.value.activityId,
                request
              );
              displaySuccess(t("dailyReport.activityUpdated"));
            }

            if (
              employeeIdFromSearchParams &&
              !isNaN(employeeIdFromSearchParams)
            ) {
              return redirect(
                `${USER_HUB_PATH}/employees/${employeeIdFromSearchParams}?view=activity`
              );
            } else {
              return redirect(`${USER_HUB_PATH}/dashboard`);
            }
        }

        if (employeeIdFromSearchParams && !isNaN(employeeIdFromSearchParams)) {
          return redirect(
            `${USER_HUB_PATH}/employees/${employeeIdFromSearchParams}?view=activity`
          );
        } else {
          const params: IEmailSuccessParams = {
            date: formatDate(submission.value.date),
          };

          const url = buildUrlWithParams(`${USER_HUB_PATH}/dashboard`, params);
          return redirect(url);
        }
      }
    }
  } catch (error) {
    return handleAxiosError(error);
  }
};
export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  const searchParams = new URL(loaderArgs.request.url).searchParams;
  const employeeIdFromSearchParams = Number(
    searchParams.get(SearchParam.EmployeeId)
  );
  const workspaceUserAcc = getWorkspaceUserFromToken(loaderArgs);
  const date = searchParams.get(SearchParam.Date);
  const action = searchParams.get(SearchParam.Action);

  if (
    !date ||
    !dayjs(date, "YYYY-MM-DD").isValid() ||
    !action ||
    (action !== ActivityAction.Create && action !== ActivityAction.Update)
  ) {
    throw redirect(`${USER_HUB_PATH}/dashboard`);
  }

  let employeeId = employeeIdFromSearchParams;
  if (!employeeId || isNaN(employeeId)) {
    employeeId = workspaceUserAcc.id;
  }

  const activityParams: IEmployeeParams = {
    employeeId: employeeId,
  };

  try {
    const [
      workspaceUser,
      requestorIsSupervisor,
      latestActivity,
      latestProject,
    ] = await Promise.all([
      UserClient.getUserById({
        employeeId: employeeId,
      }),
      UserClient.getUserIsSupervisor({
        employeeId: employeeId,
      }),

      ActivityClient.getLastDailyActivity(activityParams, {
        date,
      }),
      ActivityClient.getLatestReportedProject(activityParams),
    ]);

    const action =
      latestActivity?.date === date
        ? ActivityAction.Update
        : ActivityAction.Create;

    return json({
      user: workspaceUser,
      requestorIsSupervisor,
      latestActivity,
      workspaceUserAcc,
      date,
      action,
      latestProject,
    });
  } catch (error) {
    handleAxiosError(error);
    return redirect(`${USER_HUB_PATH}/dashboard`);
  }
};

export const shouldRevalidate = ({
  actionResult,
  currentUrl,
  nextUrl,
}: ShouldRevalidateFunctionArgs) => {
  // Do not revalidate on form error and activities submit
  return (
    actionResult &&
    actionResult.initialValue?.intent !== DailyActivityIntent.Activities &&
    actionResult.status === Status.Success &&
    currentUrl.search !== nextUrl.search
  );
};

export default function ActivityDetails() {
  const lastResult = useActionData<typeof clientAction>();
  const {
    user,
    requestorIsSupervisor,
    latestActivity,
    workspaceUserAcc,
    action,
    latestProject,
  } = useLoaderData<typeof clientLoader>() || {};
  const { projects, name } = user;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set(SearchParam.Action, action);

    setSearchParams(updatedSearchParams, {
      replace: true,
      preventScrollReset: true,
    });
  }, [action, searchParams, setSearchParams]);

  const _latestActivity = latestProject?._embedded?.activities?.map(
    (activity) => ({
      projectId: activity.projectId,
      hours: activity.hours,
      projectName: activity.projectName,
    })
  );

  const [selectedProjects, setSelectedProjects] = useState<IActivityHours[]>(
    _latestActivity ?? []
  );

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

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t(
              requestorIsSupervisor && workspaceUserAcc.id !== user.id
                ? "userHub.teamMember"
                : "userHub.welcome",
              {
                user: name,
              }
            ),
            variant: BreadcrumbVariant.Current,
          },
          {
            text: formatDate(dayjs(), undefined, "dddd, DD. MMM, YYYY"),
            variant: BreadcrumbVariant.Other,
          },
        ]}
      />
      <DailyReportForm
        latestActivity={latestActivity}
        lastResult={lastResult}
        selectedProjects={selectedProjects}
        projects={projects}
      />
      <MismatchUserWarningDialog workspaceUserAcc={workspaceUserAcc} />
    </AppLayout>
  );
}
