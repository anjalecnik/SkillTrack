import { handleAxiosError, buildUrlWithParams, formatDate } from "~/util";
import { FlexColumn } from "~/components/common";
import { RequestClient } from "~/clients";
import { useNavigate, useSearchParams } from "@remix-run/react";
import {
  UserHubTableFilters,
  AbsencesTable,
  ActivitiesTable,
  UserOverviewCard,
} from "~/components/features";
import {
  IActivity,
  MoreToReportActivityType,
  ActivityAction,
  IActivityParams,
  IActivityMoreToReportForm,
  IWorkspaceUser,
  IProjectUserResponse,
  IActivityTableItem,
  IWorkspaceModuleActivity,
  ActivityTableView,
  ActivityType,
} from "~/types";
import { Dispatch, SetStateAction } from "react";
import { useMobile } from "~/hooks";
import { CardLayout } from "~/components/layout";
import dayjs from "dayjs";

interface DashboardCardProps {
  workspaceUser: IWorkspaceUser;
  projects?: IProjectUserResponse[];
  activities?: IActivityTableItem[];
  absences?: IActivity[];
  reportRestrictions?: IWorkspaceModuleActivity;
  setDefaultMoreToReportValues: Dispatch<
    SetStateAction<IActivityMoreToReportForm | undefined>
  >;
  setIsMoreToReportDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedMoreToReportType: Dispatch<
    SetStateAction<MoreToReportActivityType>
  >;
  setSelectedRequests: Dispatch<SetStateAction<IActivity[]>>;
  setIsRequestInfoDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedActivity: Dispatch<SetStateAction<IActivity | null>>;
  setDeleteAbsenceDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsPlanAbsenceDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function DashboardCard({
  workspaceUser,
  projects,
  activities,
  absences,
  reportRestrictions,
  setDefaultMoreToReportValues,
  setIsMoreToReportDialogOpen,
  setSelectedMoreToReportType,
  setSelectedRequests,
  setIsRequestInfoDialogOpen,
  setSelectedActivity,
  setDeleteAbsenceDialogOpen,
  setIsPlanAbsenceDialogOpen,
}: DashboardCardProps) {
  const [searchParams] = useSearchParams();
  const tableView =
    searchParams.get("tableView") ?? ActivityTableView.Activities;
  const navigate = useNavigate();
  const isMobile = useMobile();

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
        userId: workspaceUser.id,
        activityId: id,
      };

      requests.push(RequestClient.getRequestById(activityParams));
    });
    try {
      const responses = await Promise.all(requests);
      setSelectedRequests(responses);
      setIsRequestInfoDialogOpen(true);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDeleteAbsenceClick = (activity: IActivity) => {
    setSelectedActivity(activity);
    setDeleteAbsenceDialogOpen(true);
  };

  const handleActivityClick = (
    date: string,
    action: ActivityAction,
    useDate?: boolean
  ) => {
    const params: Record<string, string | boolean> = {
      date,
      action,
    };

    if (useDate !== undefined) {
      params.useDate = useDate;
    }

    const url = buildUrlWithParams("daily-report", params);
    navigate(url);
  };

  const handleDailyReportClick = () => {
    handleActivityClick(
      formatDate(dayjs()),
      isDailyActivityEmpty() ? ActivityAction.Create : ActivityAction.Update
    );
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

  return (
    <CardLayout sx={{ overflow: "visible" }}>
      <FlexColumn gap="20px">
        <UserOverviewCard
          workspaceUser={workspaceUser}
          // TODO: Uncomment when settings are implemented
          // footerChildren={
          //   <Flex gap="10px" justifyContent="end">
          //     <MiniButton
          //       variant="outlined"
          //       color="warning"
          //       fullWidth
          //       sx={{
          //         width: { sm: "auto" },
          //         gap: "8px",
          //       }}
          //     >
          //       <SettingOutlined />
          //       {t("common.settings")}
          //     </MiniButton>
          //   </Flex>
          // }
        />
        <CardLayout sx={{ overflow: "visible" }}>
          <FlexColumn
            gap={isMobile ? "80px" : "20px"}
            sx={{ overflow: "visible" }}
          >
            <UserHubTableFilters
              onMoreToReportClick={() => setIsMoreToReportDialogOpen(true)}
              onPlanAbsenceClick={() => setIsPlanAbsenceDialogOpen(true)}
              onDailyReportClick={() => handleDailyReportClick()}
            />
            {tableView === ActivityTableView.Activities ? (
              <ActivitiesTable
                sortKey="sortActivities"
                projects={projects ?? []}
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
                onCancelClick={handleDeleteAbsenceClick}
              />
            )}
          </FlexColumn>
        </CardLayout>
      </FlexColumn>
    </CardLayout>
  );
}
