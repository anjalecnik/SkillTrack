import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  useActionData,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import dayjs from "dayjs";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { ActivityClient, RequestClient, UserClient } from "~/clients";
import {
  RequestsCard,
  PlanAbsenceForm,
  MoreToReportForm,
} from "~/components/features";
import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import { DEFAULT_PAGINATION_LIMIT, WORKSPACE_HUB_PATH } from "~/constants";
import { createRequestsValidation } from "~/schemas";
import {
  ActivityStatus,
  BreadcrumbVariant,
  getActivityTypeLabel,
  IActivityMoreToReportForm,
  IEmployeeParams,
  IProjectUserResponse,
  IUserResponse,
  LoaderData,
  MoreToReportActivityType,
  SearchParam,
  Status,
  ActivityFormDialogs as Dialogs,
} from "~/types";
import {
  createAbsencePlanActivity,
  createBusinessTripActivity,
  displaySuccess,
  getWorkspaceUserFromToken,
  handleAxiosError,
  updateBusinessTripActivity,
  useTypedRouteLoaderData,
} from "~/util";

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
  const employeeId = url.searchParams.get(SearchParam.EmployeeId);

  const workspaceUserAcc = getWorkspaceUserFromToken(loaderArgs);

  try {
    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
    const limit: number = params.get(SearchParam.Limit)
      ? Number(params.get(SearchParam.Limit))
      : DEFAULT_PAGINATION_LIMIT;

    const modifiedLoaderArgs = { ...loaderArgs };
    const urlWithoutParams = new URL(modifiedLoaderArgs.request.url);
    urlWithoutParams.search = "";
    modifiedLoaderArgs.request = new Request(
      urlWithoutParams,
      loaderArgs.request
    );

    const [requests, supervisor, workspaceEmployees, employee] =
      await Promise.all([
        RequestClient.getRequestsOverview(
          loaderArgs,
          {
            userId: workspaceUserAcc.id,
          },
          limit
        ),
        workspaceUserAcc.id
          ? UserClient.getUserById({
              employeeId: Number(workspaceUserAcc.id),
            })
          : undefined,
        UserClient.getUsers(modifiedLoaderArgs),
        employeeId
          ? UserClient.getUserById({
              employeeId: Number(employeeId),
            })
          : undefined,
      ]);

    // add also a supervisor to the list
    workspaceEmployees?.data.push({
      id: supervisor?.id,
      name: supervisor?.name,
      surname: supervisor?.surname,
      email: supervisor?.email,
      role: supervisor?.role,
      status: supervisor?.status,
      projects: supervisor?.projects,
      addresses: supervisor?.addresses,
    } as IUserResponse);

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

export default function UserHubRequests() {
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
