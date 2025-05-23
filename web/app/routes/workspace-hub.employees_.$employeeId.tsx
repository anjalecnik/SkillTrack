import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import {
  createAbsencePlanActivity,
  createBusinessTripActivity,
  displaySuccess,
  formatDate,
  fullNameFormatter,
  getActivities,
  getWorkspaceUserFromToken,
  handleAxiosError,
  requireAdminRoleOrHigher,
  updateBusinessTripActivity,
} from "~/util";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  ShouldRevalidateFunctionArgs,
  useActionData,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import {
  BreadcrumbVariant,
  Status,
  IActivity,
  PlanAbsenceActivityType,
  MoreToReportActivityType,
  IActivityMoreToReportForm,
  ExtraActivitiesType,
  EmployeeAddressType,
  EmployeeDetailsView,
  IWorkspaceUserUpdateReq,
  WorkspaceProjectUserRole,
  EmployeeSettingsAccordions as Accordions,
  ActivityFormDialogs,
  ActivityStatus,
  getActivityTypeLabel,
  IEmployeeParams,
} from "~/types";
import { t } from "i18next";
import {
  EmployeeCard,
  MoreToReportForm,
  PlanAbsenceForm,
} from "~/components/features";
import {
  ActivityClient,
  ProjectClient,
  RequestClient,
  UserClient,
  WorkPositionClient,
} from "~/clients";
import { useEffect, useState } from "react";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";
import { createUserDetailsAndActivityRequestValidation } from "~/schemas";
import { parseWithZod } from "@conform-to/zod";
import { IPerformanceReviewActivityReq } from "~/types/interfaces/activity/requests/performance-review-activity.request";
import dayjs from "dayjs";
import { WarningDialog } from "~/components/common";
import { AddPerformanceReviewDialogForm } from "~/components/features/forms/add-performance-review-form";
import { SubmissionResult } from "@conform-to/react";
import { performanceReviewFormDialogSchema } from "~/schemas/activities/performance-review-form-schema";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();
  const { searchParams } = new URL(actionArgs.request.url);
  const pageView = searchParams.get("view");

  if (
    pageView === EmployeeDetailsView.UserDetails ||
    pageView === EmployeeDetailsView.Activity
  ) {
    const submission = createUserDetailsAndActivityRequestValidation(formData);
    const employeeParams: IEmployeeParams = {
      employeeId: Number(actionArgs.params.employeeId),
    };

    if (submission.status !== Status.Success) {
      return json(submission.reply());
    }

    if (pageView === EmployeeDetailsView.UserDetails) {
      let workspaceUser: IWorkspaceUserUpdateReq = {};

      try {
        switch (submission.value.intent) {
          case Accordions.PersonalSettings: {
            workspaceUser = {
              name: submission.value.name,
              surname: submission.value.surname,
              phone:
                submission.value.countryPhoneCode && submission.value.phone
                  ? submission.value?.countryPhoneCode + submission.value?.phone
                  : null,
              birthDate: formatDate(
                submission.value.birthDate,
                "DD.MM.YYYY",
                "YYYY-MM-DD"
              ),
              addresses:
                submission.value.streetAddress &&
                submission.value.city &&
                submission.value.postalCode &&
                submission.value.countryCode
                  ? [
                      {
                        streetAddress: submission.value.streetAddress,
                        city: submission.value.city,
                        countryCode: submission.value.countryCode,
                        postalCode: submission.value.postalCode,
                        type: EmployeeAddressType.Main,
                      },
                    ]
                  : undefined,
            };
            break;
          }
          case Accordions.Address: {
            const mainAddress = JSON.parse(submission.value.mainAddress);
            const addresses = submission.value.addresses;

            workspaceUser = {
              addresses: [
                {
                  id: mainAddress.id,
                  streetAddress: mainAddress.streetAddress,
                  city: mainAddress.city,
                  postalCode: mainAddress.postalCode,
                  countryCode: mainAddress.countryCode,
                  type: EmployeeAddressType.Main,
                },
                ...addresses.map((address) => ({
                  ...address,
                  type: EmployeeAddressType.Temporary,
                })),
              ],
            };
            break;
          }
          case Accordions.WorkPosition: {
            workspaceUser = {
              workPositionId: submission.value.workspaceWorkPositionId ?? null,
              teamId: submission.value.workspaceTeamId,
              managerId: submission.value.managerId ?? null,
            };
            break;
          }

          case Accordions.Projects: {
            workspaceUser = {
              projects: submission.value.projects.map((project) => ({
                id: project.id,
                role:
                  project?.isProjectLead === "on"
                    ? WorkspaceProjectUserRole.Lead
                    : WorkspaceProjectUserRole.Member,
              })),
            };
            break;
          }
          case Accordions.Vacation: {
            workspaceUser = {
              assignedVacations: [
                ...submission.value.assignedVacations,
                ...submission.value.hiddenOldVacations,
              ].map((vacation) => ({
                id: vacation.id,
                year: vacation.year,
                assignedDays: vacation.assignedDays,
                initialDate: vacation?.initialDate
                  ? formatDate(vacation.initialDate)
                  : undefined,
                initialUsedDays: vacation.initialUsedDays,
                oldVacationExpiration: vacation?.oldVacationExpiration
                  ? formatDate(vacation.oldVacationExpiration)
                  : undefined,
                description: vacation.description,
              })),
            };
            break;
          }
          case Accordions.UserStatus: {
            workspaceUser = {
              status: submission.value.status,
            };
          }
        }
        await UserClient.updateUser(workspaceUser, actionArgs);
        displaySuccess(t("workspaceEmployees.updateSuccess"));
        return json(submission.reply());
      } catch (error) {
        return handleAxiosError(error);
      }
    }
    if (pageView === EmployeeDetailsView.Activity) {
      try {
        switch (submission.value.intent) {
          case ActivityFormDialogs.PlanAbsence: {
            await createAbsencePlanActivity(employeeParams, submission.value);
            displaySuccess(t("userHub.activityAbsenceRequest"));
            break;
          }
          case ActivityFormDialogs.BusinessTrip: {
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
    const submission = parseWithZod(formData, {
      schema: performanceReviewFormDialogSchema,
    });

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
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  requireAdminRoleOrHigher(loaderArgs);

  const queryParams = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
  const employeeId = Number(loaderArgs.params.employeeId);

  const sort = queryParams.get("sort");
  const [sortField, sortDirection] = sort?.split(":") ?? [];

  const isDateStartAscending =
    sortField === "dateStart" && sortDirection === "asc";

  const workspaceUserAcc = getWorkspaceUserFromToken(loaderArgs);

  const [user, positions, projects, users, performanceReviews] =
    await Promise.all([
      UserClient.getUserById(loaderArgs),
      WorkPositionClient.getWorkPositions(loaderArgs),
      ProjectClient.getProjects(loaderArgs),
      UserClient.getUsers(loaderArgs),
      ActivityClient.getUserPerformanceReviews(loaderArgs),
    ]);

  const tableData = await getActivities(
    loaderArgs,
    isDateStartAscending,
    workspaceUserAcc,
    employeeId
  );

  return json({
    user,
    positions: positions.data,
    projects: projects.data,
    users: users.data,
    performanceReviews: performanceReviews,
    tableData: tableData,
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

  const handleBackClick = () => {
    navigate(`/employees`);
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
            text: t("workspaceEmployees.employees"),
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
