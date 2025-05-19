import {
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "@remix-run/react";
import { t } from "i18next";
import moment from "moment";
import { useEffect, useState } from "react";
import { Flex, FlexColumn, DateRangeInput } from "~/components/common";
import {
  DEFAULT_ABSENCE_END_DATE_RANGE,
  DEFAULT_ACTIVITIES_END_DATE_RANGE,
} from "~/constants";
import { useMobile } from "~/hooks";
import { ActivityTableView } from "~/types";

interface IUserHubTableFiltersProps {
  onPlanAbsenceClick: () => void;
  onMoreToReportClick: () => void;
  onDailyReportClick: () => void;
}

export function UserHubTableFilters({
  onPlanAbsenceClick,
  onMoreToReportClick,
  onDailyReportClick,
}: IUserHubTableFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const [tableView, setTableView] = useState<ActivityTableView>(
    ActivityTableView.Activities
  );
  const isMobile = useMobile();

  useEffect(() => {
    const tableView = searchParams.get("tableView") as ActivityTableView;

    if (tableView) {
      setTableView(tableView);
    }
  }, [searchParams]);

  const handleTableViewChange = (value: ActivityTableView) => {
    const params = new URLSearchParams(searchParams);
    params.set("tableView", value);

    const sixMonthsFromToday = moment()
      .add(DEFAULT_ABSENCE_END_DATE_RANGE, "months")
      .format("YYYY-MM-DD");
    const today = moment().format("YYYY-MM-DD");

    // startDate wont be present until user manually sets date range
    if (!params.get("startDate")) {
      if (value === ActivityTableView.Absence) {
        params.set("endDate", sixMonthsFromToday);
      } else {
        params.set("endDate", today);
      }
    }

    setSearchParams(params, { replace: true });
  };

  return (
    <FlexColumn gap="30px">
      <Flex gap="20px" justifyContent="space-between">
        {!isMobile && (
          <Typography variant="subtitle1">{t("userHub.overview")}</Typography>
        )}
        <Flex
          gap="20px"
          width={isMobile ? "100%" : undefined}
          justifyContent="space-between"
        >
          <Button variant="outlined" onClick={onDailyReportClick}>
            {t("userHub.dailyReport")}
          </Button>
          <Button
            data-testid="moreToReportBtn"
            variant="outlined"
            onClick={onMoreToReportClick}
          >
            {t("userHub.moreToReport")}
          </Button>
          <Button variant="contained" onClick={onPlanAbsenceClick}>
            {t("userHub.planAbsence")}
          </Button>
        </Flex>
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
          value={tableView}
          exclusive
          onChange={(_, value) => {
            if (value) {
              setTableView(value);
              handleTableViewChange(value);
            }
          }}
          aria-label="text alignment"
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
          <ToggleButton value={ActivityTableView.Activities} aria-label="first">
            {t("userHub.lastActivities")}
          </ToggleButton>
          <ToggleButton value={ActivityTableView.Absence} aria-label="second">
            {t("userHub.absence")}
          </ToggleButton>
        </ToggleButtonGroup>
        <DateRangeInput
          defaultStartDate={moment().subtract(
            DEFAULT_ACTIVITIES_END_DATE_RANGE,
            "days"
          )}
          defaultEndDate={
            tableView === ActivityTableView.Absence
              ? moment().add(DEFAULT_ABSENCE_END_DATE_RANGE, "months")
              : moment()
          }
        />
      </Flex>
    </FlexColumn>
  );
}
