import { alpha, TableCell, TableRow, useTheme } from "@mui/material";
import { t } from "i18next";
import { PaginatedTable } from "~/components/common";
import {
  ActivityAction,
  ActivityType,
  getActivityTypeLabel,
  IActivitiesOverviewResponse,
  ITableMeta,
} from "~/types";
import { isWeekend } from "~/util";
import moment from "moment";
interface IDailiesTableProps {
  activitiesOverview?: IActivitiesOverviewResponse;
  onItemClick: (date: string, action: ActivityAction, userId: number) => void;
  meta?: ITableMeta;
  isLoading?: boolean;
}

export function ActivityDashboardTable({
  activitiesOverview,
  meta,
  isLoading,
  onItemClick,
}: IDailiesTableProps) {
  const theme = useTheme();

  const flatWorkspaceUserActivities = Array.from(
    new Set(
      activitiesOverview?.workspaceUsers.flatMap((user) =>
        user.workspaceUserActivity.map((activity) =>
          moment(activity.date).format("YYYY-MM-DD")
        )
      )
    )
  );

  const activitiesSortByDateAsc = flatWorkspaceUserActivities
    .sort()
    .map((date) => moment(date, "YYYY-MM-DD").format("DD.MM.YYYY"));

  const workspaceUserActivitiesByEachDate =
    activitiesOverview?.workspaceUsers.map((user) => {
      const activitiesByDate = activitiesSortByDateAsc.map((date) => {
        const formattedDate = moment(date, "DD.MM.YYYY", true).format(
          "YYYY-MM-DD"
        );

        const isWeekendActivity = isWeekend(formattedDate);

        if (isWeekendActivity) {
          return getActivityTypeLabel(ActivityType.Weekend);
        }

        const activitiesOnDate = user.workspaceUserActivity
          .filter((act) => moment(act.date).format("DD.MM.YYYY") === date)
          .map((act) => {
            return {
              type: act.activityType,
              id: act.id,
              project: act.project?.name || null,
            };
          });

        return activitiesOnDate.length > 0
          ? activitiesOnDate
              .map((activity) =>
                activity.type === ActivityType.Daily && activity.project
                  ? activity.project
                  : getActivityTypeLabel(activity.type as ActivityType)
              )
              .join(", ")
          : t("error.notPresent");
      });

      return {
        fullName: `${user.name} ${user.middleName ?? ""} ${user.surname}`,
        activities: activitiesByDate,
        userId: user.id,
        workspaceUserActivity: user.workspaceUserActivity,
      };
    });

  return (
    <PaginatedTable
      isLoading={isLoading}
      headers={[
        {
          children: t("activityDashboard.employeeName"),
          sx: {
            backgroundColor: "#f0f0f0",
            left: 0,
            minWidth: "130px",
          },
        },
        ...activitiesSortByDateAsc.map((date) => ({
          children: date,
        })),
      ]}
      items={workspaceUserActivitiesByEachDate ?? null}
      render={(employee) => (
        <TableRow key={employee.userId}>
          <TableCell
            sx={{
              left: 0,
              zIndex: 1,
              backgroundColor: "background.paper",
            }}
          >
            {employee.fullName}
          </TableCell>
          {employee.activities.map((activity, index) => {
            const activitiesList = activity.split(", ");
            const isUnassigned = activitiesList.includes(
              getActivityTypeLabel(ActivityType.Unassigned)
            );
            const formattedDate = moment(
              activitiesSortByDateAsc[index],
              "DD.MM.YYYY"
            ).format("YYYY-MM-DD");
            const isWeekendCell = isWeekend(formattedDate);

            return (
              <TableCell
                sx={{
                  minWidth: "130px",
                  cursor: isUnassigned ? "pointer" : "default",
                  "&:hover": {
                    backgroundColor: isUnassigned
                      ? alpha(theme.palette.secondary.light, 0.2)
                      : undefined,
                  },
                  color: isWeekendCell ? "secondary.main" : "inherit",
                }}
                key={index}
                onClick={() => {
                  if (isUnassigned) {
                    onItemClick(
                      formattedDate,
                      ActivityAction.Create,
                      employee.userId
                    );
                  }
                }}
              >
                {activity}
              </TableCell>
            );
          })}
        </TableRow>
      )}
      meta={meta}
    />
  );
}
