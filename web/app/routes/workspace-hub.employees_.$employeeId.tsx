import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import {
  createAbsencePlanActivity,
  createBusinessTripActivity,
  createExpensesActivity,
  createOnCallActivity,
  createOvertimeActivity,
  createTripToOfficeActivity,
  displaySuccess,
  formatDate,
  fullNameFormatter,
  getAbsences,
  getActivities,
  getWorkspaceUserFromToken,
  handleAxiosError,
  requireAdminRoleOrHigher,
  updateBusinessTripActivity,
  updateTripToOfficeActivity,
} from "~/util";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  redirect,
  ShouldRevalidateFunctionArgs,
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
  ActivityStatus,
  ActivityTableView,
  EmployeeAddressType,
  EmployeeDetailsView,
  getActivityTypeLabel,
  IWorkspaceUserUpdateReq,
  WorkspaceProjectUserRole,
  IEmployeeParams,
  EmployeeSettingsAccordions as Accordions,
} from "~/types";
import { t } from "i18next";
import { EmployeeCard } from "~/components/features";
import {
  ActivityClient,
  RequestClient,
  UserClient,
  WorkPositionClient,
} from "~/clients";
import { ProjectClient } from "~/clients/project.client";
import { useEffect, useState } from "react";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";
import { parseWithZod } from "@conform-to/zod";
import { DEFAULT_PROJECT_DATE_FORMAT } from "~/constants";
import { createUserDetailsAndActivityRequestValidation } from "~/schemas";
import { IPerformanceReviewActivityReq } from "~/types/interfaces/activity/requests/performance-review-activity.request";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();
  const { searchParams } = new URL(actionArgs.request.url);
  const employeeId = actionArgs.params.employeeId;
  const pageView = searchParams.get("view");

  if (
    pageView === EmployeeDetailsView.UserDetails ||
    pageView === EmployeeDetailsView.Activity
  ) {
    const submission = createUserDetailsAndActivityRequestValidation(formData);

    const workspaceEmployeeParams: IEmployeeParams = {
      employeeId: Number(employeeId),
    };

    if (submission.status !== Status.Success) {
      return json(submission.reply());
    }

    if (pageView === EmployeeDetailsView.UserDetails) {
      let workspaceUser: IWorkspaceUserUpdateReq = {};
      try {
        switch (submission.value.intent) {
          case Accordions.PersonalSettings: {
            const additionalAddresses = JSON.parse(
              submission.value.additionalAddresses!
            );
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
              nationality: submission.value.nationality ?? null,
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
                      ...additionalAddresses,
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

  const [user, positions, projects, users] = await Promise.all([
    UserClient.getUserById(loaderArgs),
    WorkPositionClient.getWorkPositions(loaderArgs),
    [], //ProjectClient.getProjects(loaderArgs),
    UserClient.getUsers(loaderArgs),
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
  const loaderData = useLoaderData<typeof clientLoader>() ?? [];
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = loaderData;

  const [isPlanAbsenceDialogOpen, setIsPlanAbsenceDialogOpen] = useState(false);
  const [isMoreToReportDialogOpen, setIsMoreToReportDialogOpen] =
    useState(false);
  const [isRequestInfoDialogOpen, setIsRequestInfoDialogOpen] = useState(false);
  const [isPerformanceReviewPopupOpen, setIsPerformanceReviewPopupOpen] =
    useState(false);
  const [deleteAbsenceDialogOpen, setDeleteAbsenceDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [selectedRequests, setSelectedRequests] = useState<IActivity[]>([]);
  const [selectedAbsenceType, setSelectedAbsenceType] =
    useState<PlanAbsenceActivityType | null>(null);
  const [selectedMoreToReportType, setSelectedMoreToReportType] =
    useState<MoreToReportActivityType>(MoreToReportActivityType.Expense);
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
      case MoreToReportActivityType.Overtime:
      case MoreToReportActivityType.OnCall:
      case MoreToReportActivityType.Expense:
      case MoreToReportActivityType.TripToOffice:
        setIsMoreToReportDialogOpen(true);
        setSelectedMoreToReportType(action);
        break;
      case PlanAbsenceActivityType.Vacation:
      case PlanAbsenceActivityType.SchoolSchedule:
      case PlanAbsenceActivityType.SickLeave:
        setIsPlanAbsenceDialogOpen(true);
        setSelectedAbsenceType(action);
        break;
    }
    searchParams.delete("action");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [defaultMoreToReportValues, setDefaultMoreToReportValues] =
    useState<IActivityMoreToReportForm>();

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
        setIsRequestInfoDialogOpen={setIsRequestInfoDialogOpen}
        setIsPerformanceReviewPopupOpen={setIsPerformanceReviewPopupOpen}
        setDefaultPerformanceReviewValues={setSelectedPerformanceReview}
        setSelectedMoreToReportType={setSelectedMoreToReportType}
        setSelectedRequests={setSelectedRequests}
        loaderData={loaderData}
      />
    </AppLayout>
  );
}
