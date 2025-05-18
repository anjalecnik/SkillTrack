import {
  ActivityAction,
  ActivityTableView,
  ActivityType,
  EmployeeDetailsView,
  IActivity,
  IActivityMoreToReportForm,
  IActivityParams,
  IActivityTableItem,
  IPositionResponse,
  IProject,
  IUserResponse,
  IWorkspaceModuleActivity,
  IWorkspaceUser,
  MoreToReportActivityType,
} from "~/types";
import { Flex, FlexColumn, MainCard } from "~/components/common";
import { CardLayout } from "~/components/layout";
import {
  UserOverviewCard,
  EmployeeSettings,
  ActivitiesTable,
  UserHubTableFilters,
  AbsencesTable,
  RequestsCard,
} from "~/components/features";
import { SubmissionResult } from "@conform-to/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { buildUrlWithParams, formatDate, handleAxiosError } from "~/util";
import { useNavigate, useParams, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { useMobile } from "~/hooks";
import { t } from "i18next";
import { Button, Typography } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import {
  ADMIN_HUB_BASE_PATH,
  USER_HUB_BASE_PATH,
  DEFAULT_PAGINATION_LIMIT,
} from "~/constants";
import { DataTestIds } from "~/data-test-ids";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";

interface IEmployeeCardProps {
  lastResult: SubmissionResult<string[]> | null;
  loaderData: {
    user: IWorkspaceUser;
    projects: IProject[] | null[];
    users: IUserResponse[];
    positions: IPositionResponse[] | null[];
    tableData: {
      activities?: IActivityTableItem[] | null[];
      absences?: IActivity[] | null[];
    } | null;
    requests?: any;
    limit: number;
  };
  reportRestrictions?: IWorkspaceModuleActivity;
  setIsViewing: Dispatch<SetStateAction<boolean>>;
  setDefaultMoreToReportValues: Dispatch<
    SetStateAction<IActivityMoreToReportForm | undefined>
  >;
  setSelectedMoreToReportType: Dispatch<
    SetStateAction<MoreToReportActivityType>
  >;
  setDefaultPerformanceReviewValues: Dispatch<
    SetStateAction<IActivityPerformanceReviewForm | undefined>
  >;
  setSelectedRequests: Dispatch<SetStateAction<IActivity[]>>;
  setIsRequestInfoDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedActivity: Dispatch<SetStateAction<IActivity | null>>;
  setDeleteAbsenceDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsPlanAbsenceDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsMoreToReportDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsPerformanceReviewPopupOpen: Dispatch<SetStateAction<boolean>>;
  isDetailsViewVisible?: boolean;
  enableToCancelAbsenceActivity: boolean;
}

export function EmployeeCard({
  loaderData,
  lastResult,
  reportRestrictions,
  setIsViewing,
  setDeleteAbsenceDialogOpen,
  setSelectedActivity,
  setIsMoreToReportDialogOpen,
  setIsPlanAbsenceDialogOpen,
  setDefaultMoreToReportValues,
  setIsRequestInfoDialogOpen,
  setSelectedMoreToReportType,
  setSelectedRequests,
  setIsPerformanceReviewPopupOpen,
  setDefaultPerformanceReviewValues,
  isDetailsViewVisible = true,
  enableToCancelAbsenceActivity = true,
}: IEmployeeCardProps) {
  const { user, tableData, limit } = loaderData;
  const { activities, absences } = tableData ?? {};
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabs, setTabs] =
    useState<
      { label: string; value: EmployeeDetailsView; dataTestId?: string }[]
    >();
  const tableView =
    searchParams.get("tableView") ?? ActivityTableView.Activities;
  const pageView = searchParams.get("view") as EmployeeDetailsView;
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { employeeId } = useParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const isOnWorkspaceHub = location.pathname.startsWith(
    `/${ADMIN_HUB_BASE_PATH}`
  );

  useEffect(() => {
    if (!pageView) {
      if (isDetailsViewVisible) {
        params.set("view", EmployeeDetailsView.UserDetails);
      } else {
        params.set("view", EmployeeDetailsView.Activity);
      }

      setSearchParams(params, { replace: true });
    }
  }, [setSearchParams, params, pageView, isDetailsViewVisible]);

  const handleTabChange = (
    event: React.SyntheticEvent,
    value: EmployeeDetailsView
  ) => {
    params.set("view", value);
    setSearchParams(params, { replace: true });
  };

  const handleActivityClick = (
    date: string,
    action: ActivityAction,
    _useDate?: boolean,
    employeeId?: number
  ) => {
    let baseUrl = ADMIN_HUB_BASE_PATH;
    if (!isOnWorkspaceHub) {
      baseUrl = USER_HUB_BASE_PATH;
    }
    const url = buildUrlWithParams(`/${baseUrl}/daily-report`, {
      date,
      action,
      employeeId,
    });
    navigate(url);
  };

  const handleReportMoreClick = (
    activityType: MoreToReportActivityType,
    data: IActivityMoreToReportForm
  ) => {
    setDefaultMoreToReportValues({
      date: formatDate(data.date, undefined, "DD.MM.YYYY"),
      dateStart: formatDate(data.dateStart, undefined, "DD.MM.YYYY"),
      startTime: data.startTime,
    });
    setIsMoreToReportDialogOpen(true);
    setSelectedMoreToReportType(activityType);
  };

  const handleRequestClick = async (requestIds: number[]) => {
    if (!requestIds?.length) {
      return;
    }
    // User can report multiple overtimes/expenses at once
    const requests: Promise<IActivity>[] = [];
    requestIds.forEach(async (id) => {
      const activityParams: IActivityParams = {
        userId: user.id,
        activityId: id,
      };

      // requests.push(RequestClient.getRequestById(activityParams));
    });
    try {
      const responses = await Promise.all(requests);
      setSelectedRequests(responses);
      setIsRequestInfoDialogOpen(true);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDailyReportClick = () => {
    handleActivityClick(
      formatDate(dayjs()),
      isDailyActivityEmpty() ? ActivityAction.Create : ActivityAction.Update,
      undefined,
      Number(employeeId)
    );
  };

  const handleDeleteAbsenceClick = (activity: IActivity) => {
    setSelectedActivity(activity);
    setDeleteAbsenceDialogOpen(true);
  };

  const isDailyActivityEmpty = (): boolean => {
    const todayActivity = activities?.find(
      (x) => x.date == formatDate(dayjs())
    );

    if (!todayActivity?.activities.length) {
      return true;
    }

    const dailyActivities = todayActivity.activities.filter(
      (x) => x.activityType === ActivityType.Daily
    );

    return dailyActivities.length <= 0;
  };

  useEffect(() => {
    const newTabs = [];
    if (isDetailsViewVisible) {
      newTabs.push({
        label: t("workspaceEmployees.details"),
        value: EmployeeDetailsView.UserDetails,
      });
    }

    // newTabs.push({
    //   label: t("workspaceEmployees.activity"),
    //   value: EmployeeDetailsView.Activity,
    // });

    // if (loaderData.requests) {
    //   newTabs.push({
    //     label: t("workspaceEmployees.requests"),
    //     value: EmployeeDetailsView.Requests,
    //     dataTestId: DataTestIds.user.requestsTab,
    //   });
    // }

    // newTabs.push({
    //   label: t("workspaceEmployees.performanceReviews"),
    //   value: EmployeeDetailsView.PerformanceReviews,
    //   dataTestId: DataTestIds.user.performanceReviewsTab,
    // });

    setTabs(newTabs);
  }, [isDetailsViewVisible, loaderData]);

  return (
    user && (
      <CardLayout sx={{ overflow: "visible" }}>
        <FlexColumn gap="20px">
          <UserOverviewCard
            workspaceUser={user}
            // TODO: Uncomment when user requests are implemented
            // footerChildren={
            //   <Flex gap="10px" justifyContent="end">
            //     <MiniButton
            //       variant="outlined"
            //       color="warning"
            //       fullWidth
            //       sx={{
            //         width: { sm: "auto" },
            //       }}
            //     >
            //       {t("common.userRequests")}
            //     </MiniButton>
            //   </Flex>
            // }
          />

          <MainCard
            content={false}
            divider
            tabs={tabs}
            onTabChange={handleTabChange}
            tabValue={pageView}
            sx={{ width: "100%", gap: "20px", overflow: "visible" }}
          >
            {pageView === EmployeeDetailsView.UserDetails &&
              isDetailsViewVisible && (
                <FlexColumn padding="20px" paddingTop="20px" gap="30px">
                  <Typography variant="subtitle1">
                    {t("workspaceEmployees.details")}
                  </Typography>
                  <EmployeeSettings
                    loaderData={loaderData}
                    lastResult={lastResult}
                  />
                </FlexColumn>
              )}

            {pageView === EmployeeDetailsView.Activity && (
              <FlexColumn gap={isMobile ? "80px" : "20px"} padding="20px">
                <UserHubTableFilters
                  onDailyReportClick={handleDailyReportClick}
                  onMoreToReportClick={() => setIsMoreToReportDialogOpen(true)}
                  onPlanAbsenceClick={() => setIsPlanAbsenceDialogOpen(true)}
                />
                {tableView === ActivityTableView.Activities ? (
                  <ActivitiesTable
                    sortKey="sortActivities"
                    projects={user.projects ?? []}
                    items={activities ?? []}
                    onItemClick={handleActivityClick}
                    onRequestClick={handleRequestClick}
                    onReportMoreClick={handleReportMoreClick}
                    reportActivityRestrictions={reportRestrictions}
                  />
                ) : (
                  <AbsencesTable
                    sortKey="sortActivities"
                    items={absences || []}
                    enableToCancelAbsenceActivity={
                      enableToCancelAbsenceActivity
                    }
                    onCancelClick={handleDeleteAbsenceClick}
                  />
                )}
              </FlexColumn>
            )}

            {pageView === EmployeeDetailsView.PerformanceReviews && (
              <FlexColumn padding="20px" paddingTop="20px" gap="30px">
                <Flex
                  justifyContent="space-between"
                  alignItems="end"
                  gap="10px"
                  sx={{ ...(isMobile && { flexDirection: "column" }) }}
                >
                  <Typography variant="subtitle1">
                    {t("workspaceEmployees.performanceReviews")}
                  </Typography>
                  <Button
                    data-testid={DataTestIds.user.addNewPerformanceReviewBtn}
                    variant="contained"
                    color="primary"
                    startIcon={<PlusOutlined />}
                    onClick={() => setIsPerformanceReviewPopupOpen(true)}
                  >
                    {t("common.addNew")}
                  </Button>
                </Flex>
              </FlexColumn>
            )}
          </MainCard>
        </FlexColumn>
      </CardLayout>
    )
  );
}
