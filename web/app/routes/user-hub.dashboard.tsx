import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import {
  displaySuccess,
  handleAxiosError,
  formatDate,
  getWorkspaceUserFromToken,
  createAbsencePlanActivity,
  getAbsences,
  getActivities,
  updateBusinessTripActivity,
  createBusinessTripActivity,
} from "~/util";
import { WarningDialog } from "~/components/common";
import { ActivityClient, RequestClient } from "~/clients";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  ShouldRevalidateFunctionArgs,
  useActionData,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import {
  MoreToReportForm,
  PlanAbsenceForm,
  DashboardCard,
  MismatchUserWarningDialog,
} from "~/components/features";
import { createRequestsValidation } from "~/schemas";
import {
  ActivityFormDialogs as Dialogs,
  ExtraActivitiesType,
  IActivity,
  MoreToReportActivityType,
  IActivityMoreToReportForm,
  ActivityStatus,
  getActivityTypeLabel,
  BreadcrumbVariant,
  Status,
  ActivityTableView,
  PlanAbsenceActivityType,
  ReportingModuleType,
  IEmployeeParams,
} from "~/types";
import { LoaderData } from "~/root";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();

  const workspaceUserAcc = getWorkspaceUserFromToken(actionArgs);
  const submission = createRequestsValidation(formData);

  if (submission.status === Status.Error) {
    return json(submission.reply());
  }

  const employeeParams: IEmployeeParams = {
    employeeId: workspaceUserAcc && workspaceUserAcc.id,
  };

  try {
    switch (submission.value.intent) {
      case Dialogs.PlanAbsence: {
        await createAbsencePlanActivity(employeeParams, submission.value);
        displaySuccess(t("userHub.activityAbsenceRequest"));
        break;
      }

      case Dialogs.BusinessTrip: {
        if (submission.value.activityId) {
          await updateBusinessTripActivity(
            employeeParams,
            submission.value.activityId,
            submission.value
          );
          displaySuccess(t("userHub.activityUpdateSuccess"));
          break;
        } else {
          await createBusinessTripActivity(employeeParams, submission.value);
          displaySuccess(t("userHub.activityRequestSuccess"));
          break;
        }
      }
      case "updateStatus": {
        const action = submission.value.action;
        const request = await RequestClient.updateRequest(
          employeeParams,
          Number(submission.value.id),
          { status: action as ActivityStatus }
        );

        displaySuccess(
          t(
            action === ActivityStatus.Approved
              ? "workspaceRequests.approveSuccess"
              : "workspaceRequests.declineSuccess",
            {
              activityType: getActivityTypeLabel(request.activityType),
            }
          )
        );
        break;
      }
      case "delete": {
        const activityId = submission.value.id;
        await ActivityClient.deleteActivity(employeeParams, activityId);
        displaySuccess(t("userHub.activityCancelSuccess"));
        break;
      }
    }
  } catch (error) {
    return handleAxiosError(error);
  }
  return json(submission.reply());
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  const queryParams = new URLSearchParams(loaderArgs.request.url.split("?")[1]);

  const sort = queryParams.get("sort");
  const [sortField, sortDirection] = sort?.split(":") ?? [];

  const isDateStartAscending =
    sortField === "dateStart" && sortDirection === "asc";

  const workspaceUserAcc = getWorkspaceUserFromToken(loaderArgs);

  const tableView =
    queryParams.get("tableView") === ActivityTableView.Absence
      ? ActivityTableView.Absence
      : ActivityTableView.Activities;

  try {
    let data;
    switch (tableView) {
      case ActivityTableView.Activities: {
        data = await getActivities(
          loaderArgs,
          isDateStartAscending,
          workspaceUserAcc
        );
        break;
      }
      case ActivityTableView.Absence:
        {
          data = await getAbsences(loaderArgs, workspaceUserAcc);
        }
        break;
    }
    return json({ data, workspaceUserAcc });
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const shouldRevalidate = ({
  actionResult,
}: ShouldRevalidateFunctionArgs) => {
  // Do not revalidate on form reset and form error
  return (
    actionResult &&
    actionResult.initialValue !== null &&
    actionResult.status === Status.Success
  );
};

export default function UserHubHome() {
  const { data, workspaceUserAcc } = useLoaderData<typeof clientLoader>() ?? {};
  const { user } = useRouteLoaderData<LoaderData>("root") ?? {};
  const { absences, activities, reportRestrictions, workspaceAddresses } =
    data ?? {};
  const { projects } = user ?? {};
  const lastResult = useActionData<typeof clientAction>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPlanAbsenceDialogOpen, setIsPlanAbsenceDialogOpen] = useState(false);
  const [isMoreToReportDialogOpen, setIsMoreToReportDialogOpen] =
    useState(false);
  const [deleteAbsenceDialogOpen, setDeleteAbsenceDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [selectedAbsenceType, setSelectedAbsenceType] =
    useState<PlanAbsenceActivityType | null>(null);
  const [selectedMoreToReportType, setSelectedMoreToReportType] =
    useState<MoreToReportActivityType>(MoreToReportActivityType.BusinessTrip);

  const rootData = useRouteLoaderData<LoaderData>("root");

  useEffect(() => {
    const action = searchParams.get("action");
    if (
      !action ||
      !Object.values(ExtraActivitiesType).includes(
        action as ExtraActivitiesType
      )
    ) {
      return;
    }

    switch (action) {
      case MoreToReportActivityType.BusinessTrip:
        setIsMoreToReportDialogOpen(true);
        setSelectedMoreToReportType(action);
        break;
      case PlanAbsenceActivityType.Vacation:
      case PlanAbsenceActivityType.SickLeave:
        setIsPlanAbsenceDialogOpen(true);
        setSelectedAbsenceType(action);
        break;
    }
    searchParams.delete("action");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (lastResult && lastResult.status === Status.Success) {
      setIsPlanAbsenceDialogOpen(false);
      setDeleteAbsenceDialogOpen(false);
      setIsMoreToReportDialogOpen(false);
      setIsEditing(false);
    }
  }, [lastResult]);

  if (!user) {
    throw new Error(t("error.somethingWentWrong") as string);
  }

  const [isEditing, setIsEditing] = useState(false);
  const [defaultMoreToReportValues, setDefaultMoreToReportValues] =
    useState<IActivityMoreToReportForm>();

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("userHub.welcome", {
              user: user.name,
            }),
            variant: BreadcrumbVariant.Current,
          },
          {
            text: formatDate(dayjs(), undefined, "dddd, DD. MMM, YYYY"),
            variant: BreadcrumbVariant.Other,
          },
        ]}
      />
      <DashboardCard
        workspaceUser={user}
        projects={projects}
        activities={activities}
        absences={absences}
        setDefaultMoreToReportValues={setDefaultMoreToReportValues}
        setIsMoreToReportDialogOpen={setIsMoreToReportDialogOpen}
        setSelectedMoreToReportType={setSelectedMoreToReportType}
        setSelectedActivity={setSelectedActivity}
        setDeleteAbsenceDialogOpen={setDeleteAbsenceDialogOpen}
        setIsPlanAbsenceDialogOpen={setIsPlanAbsenceDialogOpen}
      />
      <WarningDialog
        open={deleteAbsenceDialogOpen}
        onClose={() => setDeleteAbsenceDialogOpen(false)}
        id={selectedActivity?.id || null}
        title={t("userHub.activityCancelTitle")}
        submitButtonText={t("userHub.cancelActivity")}
      />
      <PlanAbsenceForm
        lastResult={lastResult}
        open={isPlanAbsenceDialogOpen}
        onClose={() => setIsPlanAbsenceDialogOpen(false)}
        defaultType={selectedAbsenceType}
      />
      <MoreToReportForm
        lastResult={lastResult}
        open={isMoreToReportDialogOpen}
        onClose={() => {
          setIsEditing(false);
          setIsMoreToReportDialogOpen(false);
          setDefaultMoreToReportValues(undefined);
        }}
        projects={projects ?? []}
        selectedType={selectedMoreToReportType}
        setSelectedMoreToReportType={setSelectedMoreToReportType}
        defaultValues={defaultMoreToReportValues}
        isEditing={isEditing}
      />

      <MismatchUserWarningDialog
        workspaceUserAcc={workspaceUserAcc}
        setIsMoreToReportDialogOpen={setIsMoreToReportDialogOpen}
        setIsPlanAbsenceDialogOpen={setIsPlanAbsenceDialogOpen}
      />
    </AppLayout>
  );
}
