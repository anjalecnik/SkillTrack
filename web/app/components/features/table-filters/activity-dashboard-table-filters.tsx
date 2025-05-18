import { useMobile } from "~/hooks";
import { DateRangeInput, Flex, FlexColumn } from "~/components/common";
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { t } from "i18next";
import { useSearchParams } from "@remix-run/react";
import { DEFAULT_ACTIVITIES_END_DATE_RANGE } from "~/constants";
import moment from "moment";
import { ActivityStatus } from "~/types";

export function ActivityDashboardTableFilters() {
  const isMobile = useMobile();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const showUnassignedActivities =
    searchParams.get("getUnnasignedActivities") === "true";
  const showPendingActivities =
    searchParams.get("getPendingActivities") === "true";

  const handleToggle = (filter: ActivityStatus) => {
    const params = new URLSearchParams(searchParams);

    params.delete("getUnnasignedActivities");
    params.delete("getPendingActivities");

    if (filter === ActivityStatus.Unassigned) {
      params.set("getUnnasignedActivities", "true");
    }
    if (filter === ActivityStatus.PendingApproval) {
      params.set("getPendingActivities", "true");
    }

    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("getUnnasignedActivities");
    params.delete("getPendingActivities");
    setSearchParams(params, { replace: true });
  };

  const getActivityStatusValue = () => {
    if (showUnassignedActivities) return ActivityStatus.Unassigned;
    if (showPendingActivities) return ActivityStatus.PendingApproval;
    return ActivityStatus.Approved;
  };

  return (
    <FlexColumn gap="30px">
      <Flex gap="20px" justifyContent="space-between">
        {!isMobile && (
          <Typography variant="subtitle1">{t("userHub.overview")}</Typography>
        )}
      </Flex>
      <Flex
        gap="32px"
        height="40px"
        sx={{
          ...(isMobile && {
            flexDirection: "column",
          }),
        }}
      >
        <ToggleButtonGroup
          exclusive
          value={getActivityStatusValue()}
          onChange={(_, value) => {
            if (value === ActivityStatus.Approved) {
              handleResetFilters();
            } else {
              handleToggle(value);
            }
          }}
          aria-label="filter buttons"
          sx={{
            "& .MuiToggleButton-root": {
              "&.Mui-selected": {
                borderColor: theme.palette.primary.main,
                borderLeftColor: theme.palette.primary.main + " !important",
                bgcolor: "transparent",
                "&:hover": {
                  bgcolor: "primary.lighter",
                },
                color: theme.palette.primary.main,
              },
              "&:hover": {
                bgcolor: "transparent",
                borderColor: theme.palette.primary.main,
                borderLeftColor: theme.palette.primary.main + " !important",
                zIndex: 2,
              },
            },
          }}
        >
          <ToggleButton value={ActivityStatus.Approved} aria-label="approved">
            {t("activityDashboard.approved")}
          </ToggleButton>
          <ToggleButton value={ActivityStatus.PendingApproval}>
            {t("activityDashboard.pending")}
          </ToggleButton>
          <ToggleButton value={ActivityStatus.Unassigned}>
            {t("activityDashboard.unassigned")}
          </ToggleButton>
        </ToggleButtonGroup>
        <DateRangeInput
          defaultStartDate={moment().subtract(
            DEFAULT_ACTIVITIES_END_DATE_RANGE,
            "days"
          )}
          defaultEndDate={moment()}
          containerProps={{ zIndex: 100 }}
        />
      </Flex>
    </FlexColumn>
  );
}
