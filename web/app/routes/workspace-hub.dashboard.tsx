import { TableOutlined, UserOutlined } from "@ant-design/icons";
import { Box, Card, Grid } from "@mui/material";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { DashboardClient } from "~/clients/dashboard.client";
import { Graph } from "~/components/dashboard/Graph";
import { TasksProgress } from "~/components/dashboard/TaskProgress";
import { TopMiniCard } from "~/components/dashboard/TopMiniCard";
import { WorkPositions } from "~/components/dashboard/WorkPositions";
import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import {
  BreadcrumbVariant,
  DashboardStatistics,
  DashboardWorkingHoursStatistics,
} from "~/types";

const DEFAULT_WORK_HOURS_STATISTICS: DashboardWorkingHoursStatistics = {
  monthlyUserProductivity: {
    thisYear: [],
    lastYear: [],
  },
};

const DEFAULT_STATISTICS: DashboardStatistics = {
  members: 0,
  projects: 0,
  taskProgress: 0,
  positionDistribution: {
    cloud: 0,
    database: 0,
    other: 0,
  },
};

export default function WorkspaceHubDashboard() {
  const [statistics, setStatistics] =
    useState<DashboardStatistics>(DEFAULT_STATISTICS);
  const [workingHoursStatistics, setWorkingHoursStatistics] =
    useState<DashboardWorkingHoursStatistics>(DEFAULT_WORK_HOURS_STATISTICS);
  const [isStatisticsLoading, setIsStatisticsLoading] = useState(true);
  const [isWorkingHoursStatisticsLoading, setIsWorkingHoursStatisticsLoading] =
    useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        DashboardClient.getDashboardStatistics()
          .then((stats) => setStatistics(stats))
          .finally(() => setIsStatisticsLoading(false));

        DashboardClient.getDashboardWorkingHoursStatistics()
          .then((workingHours) => setWorkingHoursStatistics(workingHours))
          .finally(() => setIsWorkingHoursStatisticsLoading(false));
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    loadData();
  }, []);

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("dashboard.dashboard"),
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <Card sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Box
            sx={{
              width: { xs: "100%", sm: "45%", lg: "30%" },
              padding: 1,
            }}
          >
            <TopMiniCard
              title="dashboard.members"
              icon={<UserOutlined />}
              diff={12}
              trend="up"
              sx={{ height: "100%" }}
              value={statistics.members}
              isLoading={isStatisticsLoading}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "45%", lg: "30%" },
              padding: 1,
            }}
          >
            <TopMiniCard
              title="dashboard.projects"
              icon={<TableOutlined />}
              diff={16}
              trend="down"
              sx={{ height: "100%" }}
              value={statistics.projects}
              isLoading={isStatisticsLoading}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "45%", lg: "35%" },
              padding: 1,
            }}
          >
            <TasksProgress
              sx={{ height: "100%" }}
              value={statistics.taskProgress}
              isLoading={isStatisticsLoading}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", lg: "62%" },
              padding: 1,
            }}
          >
            <Graph
              chartSeries={[
                {
                  name: "This year",
                  data: workingHoursStatistics.monthlyUserProductivity.thisYear,
                },
                {
                  name: "Last year",
                  data: workingHoursStatistics.monthlyUserProductivity.lastYear,
                },
              ]}
              sx={{ height: "100%" }}
              isLoading={isWorkingHoursStatisticsLoading}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", lg: "35%" },
              padding: 1,
            }}
          >
            <WorkPositions
              chartSeries={[
                statistics.positionDistribution.other,
                statistics.positionDistribution.cloud,
                statistics.positionDistribution.database,
              ]}
              total={statistics.members}
              labels={[
                "Other",
                "Cloud Infrastructure Engineer",
                "Database Reliability Engineer",
              ]}
              sx={{ height: "100%" }}
              isLoading={isStatisticsLoading}
            />
          </Box>
        </Grid>
      </Card>
    </AppLayout>
  );
}
