import { FlexColumn } from "~/components/common";
import { CardLayout } from "~/components/layout";
import {
  ActivityDashboardTable,
  ActivityDashboardTableFilters,
} from "~/components/features";
import { ActivityAction, IActivitiesOverviewResponse } from "~/types";
import { useMobile, useNavigationState } from "~/hooks";
import { useNavigate, useParams } from "@remix-run/react";
import { buildUrlWithParams } from "~/util";
import { ADMIN_HUB_BASE_PATH, USER_HUB_BASE_PATH } from "~/constants";

interface IDailiesCardProps {
  activitiesOverview?: IActivitiesOverviewResponse;
}

export function ActivityDashboardCard({
  activitiesOverview,
}: IDailiesCardProps) {
  const isMobile = useMobile();
  const { isLoading } = useNavigationState();
  const navigate = useNavigate();
  const isOnWorkspaceHub = location.pathname.startsWith(
    `/${ADMIN_HUB_BASE_PATH}`
  );

  const handleActivityClick = (
    date: string,
    action: ActivityAction,
    employeeId: number
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

  return (
    <CardLayout sx={{ overflow: "visible" }}>
      <FlexColumn gap={isMobile ? "80px" : "30px"} paddingBottom="20px">
        <ActivityDashboardTableFilters />
        <ActivityDashboardTable
          onItemClick={handleActivityClick}
          activitiesOverview={activitiesOverview}
          meta={{
            total: activitiesOverview?.meta?.total,
            page: activitiesOverview?.meta?.page,
            limit: 10,
          }}
          isLoading={isLoading}
        />
      </FlexColumn>
    </CardLayout>
  );
}
