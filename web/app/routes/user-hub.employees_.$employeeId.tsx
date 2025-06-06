import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  redirect,
  ShouldRevalidateFunctionArgs,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { ActivityClient, RequestClient, UserClient } from "~/clients";
import { WarningDialog } from "~/components/common";
import {
  EmployeeCard,
  MoreToReportForm,
  PlanAbsenceForm,
} from "~/components/features";
import { AddPerformanceReviewDialogForm } from "~/components/features/forms/add-performance-review-form";
import { AppHeaderBreadcrumbs, AppLayout } from "~/components/layout";
import { DEFAULT_PAGINATION_LIMIT, USER_HUB_PATH } from "~/constants";
import {
  createRequestsValidation,
  createUserDetailsAndActivityRequestValidation,
} from "~/schemas";
import { performanceReviewFormDialogSchema as schema } from "~/schemas/activities/performance-review-form-schema";
import {
  ActivityStatus,
  ActivityTableView,
  BreadcrumbVariant,
  ActivityFormDialogs as Dialogs,
  EmployeeDetailsView,
  ExtraActivitiesType,
  getActivityTypeLabel,
  IActivity,
  IActivityMoreToReportForm,
  IEmployeeParams,
  MoreToReportActivityType,
  PlanAbsenceActivityType,
  SearchParam,
  Status,
} from "~/types";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";
import { IPerformanceReviewActivityReq } from "~/types/interfaces/activity/requests/performance-review-activity.request";
import {
  createAbsencePlanActivity,
  createBusinessTripActivity,
  formatDate,
  fullNameFormatter,
  getAbsences,
  getActivities,
  getWorkspaceUserFromToken,
  handleAxiosError,
  updateBusinessTripActivity,
} from "~/util";
import { displaySuccess } from "~/util/snackbar-success";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();
  const { searchParams } = new URL(actionArgs.request.url);
  const employeeId = actionArgs.params.employeeId;
  const workspaceId = actionArgs.params.workspaceId;
  const pageView = searchParams.get("view");

  if (pageView === EmployeeDetailsView.Activity) {
    const submission = createUserDetailsAndActivityRequestValidation(formData);

    const employeeParams: IEmployeeParams = {
      employeeId: Number(employeeId),
    };

    if (submission.status !== Status.Success) {
      return json(submission.reply());
    }

    if (!workspaceId) {
      return redirect("/auth/selectWorkspace");
    }

    if (pageView === EmployeeDetailsView.Activity) {
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
              await createBusinessTripActivity(
                employeeParams,
                submission.value
              );
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
    }
  }

  if (pageView === EmployeeDetailsView.PerformanceReviews) {
    const submission = parseWithZod(formData, { schema });

    if (submission.status !== Status.Success) {
      return json(submission.reply());
    }
    try {
      if (submission.value.activityId) {
        const updatePerformanceReviewReq: IPerformanceReviewActivityReq = {
          quartal: submission.value.quartal,
          year: submission.value.year,
          answer1: submission.value.answer1,
          answer2: submission.value.answer2,
          answer3: submission.value.answer3,
          answer4: submission.value.answer4,
          activityType: "PerformanceReview",
        };

        await ActivityClient.updateActivity(
          {
            employeeId: submission.value.employeeId,
          },
          submission.value.activityId,
          updatePerformanceReviewReq
        );

        displaySuccess(
          t("workspacePerformanceReviews.updatedPerformanceReview")!
        );
      } else {
        const createPerformanceReviewReq: IPerformanceReviewActivityReq = {
          quartal: submission.value.quartal,
          year: submission.value.year,
          answer1: submission.value.answer1,
          answer2: submission.value.answer2,
          answer3: submission.value.answer3,
          answer4: submission.value.answer4,
          date: formatDate(dayjs(), undefined, "YYYY-MM-DD"),
          activityType: "PerformanceReview",
        };

        await ActivityClient.createActivity(
          {
            employeeId: submission.value.employeeId,
          },
          createPerformanceReviewReq
        );
        displaySuccess(
          t("workspacePerformanceReviews.addedNewPerformanceReview")!
        );
      }

      return json(submission.reply());
    } catch (error) {
      return handleAxiosError(error);
    }
  }

  if (pageView === EmployeeDetailsView.Requests) {
    const submission = createRequestsValidation(formData);

    if (submission.status !== Status.Success) {
      return json(submission.reply());
    }

    const employeeParams: IEmployeeParams = {
      employeeId: Number(employeeId),
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
          const requestId = submission.value.id;
          await ActivityClient.deleteActivity(
            employeeParams,
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
  }
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  const queryParams = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
  const subordinateEmployeeId = Number(loaderArgs.params.employeeId);

  const sort = queryParams.get("sort");
  const [sortField, sortDirection] = sort?.split(":") ?? [];

  const isDateStartAscending =
    sortField === "dateStart" && sortDirection === "asc";

  const tableView =
    queryParams.get("tableView") === ActivityTableView.Absence
      ? ActivityTableView.Absence
      : ActivityTableView.Activities;

  const limit: number = queryParams.get(SearchParam.Limit)
    ? Number(queryParams.get(SearchParam.Limit))
    : DEFAULT_PAGINATION_LIMIT;

  const workspaceUserAcc = getWorkspaceUserFromToken(loaderArgs);

  const [user, users, performanceReviews, requests] = await Promise.all([
    UserClient.getUserById(loaderArgs),
    UserClient.getUsers(loaderArgs),
    ActivityClient.getUserPerformanceReviews(loaderArgs),
    RequestClient.getRequestsOverview(
      loaderArgs,
      {
        userId: subordinateEmployeeId,
        forceShowDataForUserInParams: true,
      },
      limit,
      true
    ),
  ]);

  let tableData;
  switch (tableView) {
    case ActivityTableView.Activities: {
      tableData = await getActivities(
        loaderArgs,
        isDateStartAscending,
        workspaceUserAcc,
        subordinateEmployeeId
      );
      break;
    }
    case ActivityTableView.Absence:
      {
        tableData = await getAbsences(
          loaderArgs,
          workspaceUserAcc,
          subordinateEmployeeId
        );
      }
      break;
  }

  return json({
    user,
    workspacePositions: [],
    workspaceProjects: [],
    users: users.data,
    performanceReviews: performanceReviews,
    tableData,
    requests,
    limit,
  });
};

export const shouldRevalidate = ({
  actionResult,
  currentUrl,
  nextUrl,
}: ShouldRevalidateFunctionArgs) => {
  if (currentUrl.search !== nextUrl.search) {
    return true;
  }

  if (!actionResult || actionResult.status !== Status.Success) {
    return false;
  }

  const { intent } = actionResult;
  return intent?.type !== "remove" && intent?.type !== "insert";
};

export default function EmployeeDetailsPage() {
  const lastResult = useActionData<typeof clientAction>() as SubmissionResult<
    string[]
  >;
  const loaderData = useLoaderData<typeof clientLoader>() ?? [];
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = loaderData;

  const [isPlanAbsenceDialogOpen, setIsPlanAbsenceDialogOpen] = useState(false);
  const [isMoreToReportDialogOpen, setIsMoreToReportDialogOpen] =
    useState(false);
  const [isPerformanceReviewPopupOpen, setIsPerformanceReviewPopupOpen] =
    useState(false);
  const [deleteAbsenceDialogOpen, setDeleteAbsenceDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [selectedAbsenceType, setSelectedAbsenceType] =
    useState<PlanAbsenceActivityType | null>(null);
  const [selectedMoreToReportType, setSelectedMoreToReportType] =
    useState<MoreToReportActivityType>(MoreToReportActivityType.BusinessTrip);
  const [selectedPerformanceReview, setSelectedPerformanceReview] = useState<
    IActivityPerformanceReviewForm | undefined
  >({ employeeId: user.id });

  const navigate = useNavigate();
  const params = useParams();

  const handleBackClick = () => {
    navigate(`${USER_HUB_PATH}/${params.workspaceId}/employees`);
  };

  if (!user) {
    throw Error(t("error.somethingWentWrong") as string);
  }

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
      resetPerformanceReviewState();
      setIsEditing(false);

      setIsPerformanceReviewPopupOpen(
        lastResult?.initialValue?.intent === "createAndAddMoreDetails"
      );
    }
  }, [lastResult]);

  if (!user) {
    throw new Error(t("error.somethingWentWrong") as string);
  }

  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [defaultMoreToReportValues, setDefaultMoreToReportValues] =
    useState<IActivityMoreToReportForm>();

  const resetPerformanceReviewState = (shouldClose?: boolean) => {
    shouldClose
      ? setSelectedPerformanceReview(undefined)
      : setSelectedPerformanceReview((prevReview) => ({
          employeeId: prevReview?.employeeId,
          quartal: prevReview?.quartal,
          year: prevReview?.year,
        }));
    setIsEditing(false);
    setIsViewing(false);

    if (shouldClose) {
      setIsPerformanceReviewPopupOpen(false);
    }
  };

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("menu.teamMembers"),
            variant: BreadcrumbVariant.Previous,
            onClick: handleBackClick,
          },
          {
            text: fullNameFormatter(user) ?? "",
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <EmployeeCard
        setIsViewing={setIsViewing}
        setDeleteAbsenceDialogOpen={setDeleteAbsenceDialogOpen}
        setIsMoreToReportDialogOpen={setIsMoreToReportDialogOpen}
        setIsPlanAbsenceDialogOpen={setIsPlanAbsenceDialogOpen}
        setSelectedActivity={setSelectedActivity}
        setDefaultMoreToReportValues={setDefaultMoreToReportValues}
        setIsPerformanceReviewPopupOpen={setIsPerformanceReviewPopupOpen}
        setDefaultPerformanceReviewValues={setSelectedPerformanceReview}
        setSelectedMoreToReportType={setSelectedMoreToReportType}
        loaderData={loaderData}
        isDetailsViewVisible={false}
        lastResult={lastResult}
        enableToCancelAbsenceActivity={false}
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
        projects={user.projects ?? []}
        selectedType={selectedMoreToReportType}
        setSelectedMoreToReportType={setSelectedMoreToReportType}
        defaultValues={defaultMoreToReportValues}
        isEditing={isEditing}
      />
      <AddPerformanceReviewDialogForm
        lastResult={lastResult}
        employees={[
          {
            ...user,
          },
        ]}
        defaultValues={selectedPerformanceReview}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isViewing={isViewing}
        setIsViewing={setIsViewing}
        isOpen={isPerformanceReviewPopupOpen}
        onClose={resetPerformanceReviewState}
      />
    </AppLayout>
  );
}
