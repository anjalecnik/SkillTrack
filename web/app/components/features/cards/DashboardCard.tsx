import { buildUrlWithParams, formatDate } from "~/util";
import { FlexColumn } from "~/components/common";
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
import { ADMIN_HUB_BASE_PATH, USER_HUB_BASE_PATH } from "~/constants";

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

    const url = buildUrlWithParams(
      `/${
        location.pathname.startsWith(`/${ADMIN_HUB_BASE_PATH}`)
          ? ADMIN_HUB_BASE_PATH
          : USER_HUB_BASE_PATH
      }/daily-report`,
      params
    );
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
        <UserOverviewCard workspaceUser={workspaceUser} />
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
