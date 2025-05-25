import { t } from "i18next";
import { AppHeaderBreadcrumbs, AppLayout } from "~/components/layout";
import {
  PlanAbsenceForm,
  MoreToReportForm,
  RequestsCard,
} from "~/components/features";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  useLoaderData,
  useActionData,
  useNavigate,
} from "@remix-run/react";
import {
  displaySuccess,
  getWorkspaceUserFromToken,
  handleAxiosError,
  createAbsencePlanActivity,
  createBusinessTripActivity,
  updateBusinessTripActivity,
  useTypedRouteLoaderData,
} from "~/util";
import { ActivityClient, RequestClient, UserClient } from "~/clients";
import {
  ActivityStatus,
  getActivityTypeLabel,
  MoreToReportActivityType,
  ActivityFormDialogs as Dialogs,
  UserRoles,
  IActivityMoreToReportForm,
  IProjectUserResponse,
  BreadcrumbVariant,
  Status,
  LoaderData,
  IEmployeeParams,
} from "~/types";
import { createRequestsValidation } from "~/schemas";
import { useEffect, useState } from "react";
import { DEFAULT_PAGINATION_LIMIT, WORKSPACE_HUB_PATH } from "~/constants";
import dayjs from "dayjs";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();

  const workspaceUserAcc = getWorkspaceUserFromToken(actionArgs);

  const employeeParamId = formData.get("employeeId");

  const submission = createRequestsValidation(formData);

  if (submission.status !== Status.Success) {
    return json(submission.reply());
  }

  const employeeId = employeeParamId
    ? Number(employeeParamId)
    : submission.value.intent === "updateStatus" ||
      submission.value.intent === "delete"
    ? (submission.value.employeeId as number)
    : workspaceUserAcc && workspaceUserAcc.id;

  const workspaceEmployeeParams: IEmployeeParams = {
    employeeId: employeeId,
  };
  try {
    switch (submission.value.intent) {
      case Dialogs.PlanAbsence: {
        await createAbsencePlanActivity(
          workspaceEmployeeParams,
          submission.value
        );
        displaySuccess(t("userHub.activityAbsenceRequest"));
        break;
      }
      case Dialogs.BusinessTrip: {
        if (submission.value.activityId) {
          await updateBusinessTripActivity(
            workspaceEmployeeParams,
            submission.value.activityId,
            submission.value
          );
          displaySuccess(t("userHub.activityUpdateSuccess"));
          break;
        } else {
          await createBusinessTripActivity(
            workspaceEmployeeParams,
            submission.value
          );
          displaySuccess(t("userHub.activityRequestSuccess"));
          break;
        }
      }
      case "updateStatus": {
        const action = submission.value.action;
        const request = await RequestClient.updateRequest(
          workspaceEmployeeParams,
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
        const requestId = submission.value.id;
        await ActivityClient.deleteActivity(
          workspaceEmployeeParams,
          Number(requestId)
        );
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
  const url = new URL(loaderArgs.request.url);
  const employeeId = url.searchParams.get("employeeId");

  const workspaceUserAcc = getWorkspaceUserFromToken(loaderArgs);

  const modifiedLoaderArgs = { ...loaderArgs };
  const urlWithoutParams = new URL(modifiedLoaderArgs.request.url);
  urlWithoutParams.search = "";
  modifiedLoaderArgs.request = new Request(
    urlWithoutParams,
    loaderArgs.request
  );

  try {
    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
    const limit: number = params.get("limit")
      ? Number(params.get("limit"))
      : DEFAULT_PAGINATION_LIMIT;

    const [requests, workspaceEmployees, employee] = await Promise.all([
      RequestClient.getRequestsOverview(
        loaderArgs,
        {
          userId: workspaceUserAcc.id,
        },
        limit
      ),
      workspaceUserAcc.role !== UserRoles.User
        ? UserClient.getUsers(modifiedLoaderArgs)
        : undefined,
      employeeId
        ? UserClient.getUserById({
            employeeId: Number(employeeId),
          })
        : undefined,
    ]);

    return json({
      limit,
      requests,
      workspaceEmployees: workspaceEmployees?.data,
      employeeProjects: employee?.projects,
    });
  } catch (error) {
    return handleAxiosError(error);
  }
};

export default function WorkspaceHubRequests() {
  const lastResult = useActionData<typeof clientAction>();
  const { limit, requests, workspaceEmployees, employeeProjects } =
    useLoaderData<typeof clientLoader>() ?? {};

  const data = useTypedRouteLoaderData<LoaderData>("root");

  const [defaultMoreToReportProject, setDefaultMoreToReportProject] = useState<
    IProjectUserResponse[]
  >([]);
  const [disabledItemById, setDisabledItemById] = useState<number | undefined>(
    undefined
  );
  const [isPlanAbsenceDialogOpen, setIsPlanAbsenceDialogOpen] = useState(false);
  const [isMoreToReportDialogOpen, setIsMoreToReportDialogOpen] =
    useState(false);
  const [selectedMoreToReportType, setSelectedMoreToReportType] =
    useState<MoreToReportActivityType>(MoreToReportActivityType.BusinessTrip);
  const [defaultMoreToReportValues, setDefaultMoreToReportValues] =
    useState<IActivityMoreToReportForm>();
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (lastResult && lastResult.status === Status.Success) {
      setDefaultMoreToReportValues(undefined);
      setDefaultMoreToReportProject([]);
      setIsEditing(false);
      setIsPlanAbsenceDialogOpen(false);
      setIsMoreToReportDialogOpen(false);
    }
    setDisabledItemById(undefined);
  }, [lastResult]);

  const handleDailyReportClick = () => {
    navigate(
      `${WORKSPACE_HUB_PATH}/daily-report?date=${dayjs().format(
        "YYYY-MM-DD"
      )}&action=create`
    );
  };

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("workspaceRequests.requests"),
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <RequestsCard
        limit={limit ?? DEFAULT_PAGINATION_LIMIT}
        requests={requests}
        disabledItemById={disabledItemById}
        setIsMoreToReportDialogOpen={setIsMoreToReportDialogOpen}
        setIsPlanAbsenceDialogOpen={setIsPlanAbsenceDialogOpen}
        handleDailyReportClick={handleDailyReportClick}
      />
      <PlanAbsenceForm
        lastResult={lastResult}
        open={isPlanAbsenceDialogOpen}
        onClose={() => setIsPlanAbsenceDialogOpen(false)}
        workspaceEmployees={workspaceEmployees ?? undefined}
      />
      <MoreToReportForm
        lastResult={lastResult}
        open={isMoreToReportDialogOpen}
        onClose={() => {
          setIsEditing(false);
          setDefaultMoreToReportValues(undefined);
          setDefaultMoreToReportProject([]);
          setIsMoreToReportDialogOpen(false);
        }}
        projects={employeeProjects ?? defaultMoreToReportProject ?? []}
        selectedType={selectedMoreToReportType}
        setSelectedMoreToReportType={setSelectedMoreToReportType}
        workspaceEmployees={workspaceEmployees ?? undefined}
        defaultValues={defaultMoreToReportValues}
        isEditing={isEditing}
      />
    </AppLayout>
  );
}
