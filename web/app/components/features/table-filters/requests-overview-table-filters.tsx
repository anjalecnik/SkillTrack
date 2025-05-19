import {
  Checkbox,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "@remix-run/react";
import { t } from "i18next";
import { useState } from "react";
import { ActivityStatus, SearchParam } from "~/types";
import { DateRangeInput, Flex } from "~/components/common";
import moment from "moment";
import { useMobile } from "~/hooks";

interface IRequestsOverviewTableFilters {
  isSupervisorOrAdmin: boolean;
  shouldShowPersonalRequestsCheckbox?: boolean
}

export function RequestsOverviewTableFilters({
  isSupervisorOrAdmin,
  shouldShowPersonalRequestsCheckbox = true
}: IRequestsOverviewTableFilters) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statuses, setStatuses] = useState<ActivityStatus>(
    (searchParams.get(SearchParam.RequestStatuses) as ActivityStatus) ||
      ActivityStatus.PendingApproval
  );
  const defaultStartDateFromParams = searchParams.get(SearchParam.StartDate);
  const [defaultStartDate, setDefaultStartDate] = useState<string | undefined>(
    defaultStartDateFromParams && moment(defaultStartDateFromParams).isValid()
      ? defaultStartDateFromParams
      : undefined
  );
  const theme = useTheme();
  const isMobile = useMobile();

  const handleStatusChange = (
    event: React.MouseEvent<HTMLElement>,
    value: ActivityStatus
  ) => {
    if (value) {
      setStatuses(value);
      const params = new URLSearchParams(searchParams);
      params.set(SearchParam.RequestStatuses, value);
      params.set(SearchParam.Page, "1");

      if (
        !(params.get(SearchParam.StartDate) && params.get(SearchParam.EndDate))
      ) {
        if (
          value === ActivityStatus.Approved ||
          value === ActivityStatus.Rejected
        ) {
          const today = moment().format("YYYY-MM-DD");
          setDefaultStartDate(today);
          params.set(SearchParam.StartDate, today);
        } else if (value === ActivityStatus.PendingApproval) {
          setDefaultStartDate(undefined);
          params.delete(SearchParam.StartDate);
        }
      }
      setSearchParams(params, { replace: true });
    }
  };

  return (
    <Flex
      gap="20px"
      sx={{ ...(isMobile && { flexDirection: "column" }), flexWrap: "wrap" }}
    >
      <ToggleButtonGroup
        value={statuses}
        exclusive
        onChange={handleStatusChange}
        aria-label="text alignment"
        sx={{
          "& .MuiToggleButton-root": {
            height: "40px",
            "&.Mui-selected": {
              borderColor: theme.palette.primary.main,
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "primary.lighter",
              },
              color: theme.palette.primary.main,
            },
            "&:hover": {
              bgcolor: "transparent",
              borderColor: theme.palette.primary.main,
              zIndex: 2,
            },
          },
        }}
      >
        <ToggleButton value={ActivityStatus.PendingApproval} aria-label="first">
          {t("workspaceRequests.pending")}
        </ToggleButton>
        <ToggleButton value={ActivityStatus.Approved} aria-label="second">
          {t("workspaceRequests.approved")}
        </ToggleButton>
        <ToggleButton value={ActivityStatus.Rejected} aria-label="third">
          {t("workspaceRequests.declined")}
        </ToggleButton>
      </ToggleButtonGroup>

      <DateRangeInput
        defaultStartDate={
          defaultStartDate ? moment(defaultStartDate) : undefined
        }
      />

      {isSupervisorOrAdmin && shouldShowPersonalRequestsCheckbox && (
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={searchParams.get("showOnlyUserRequests") === "true"}
              onClick={() =>
                setSearchParams((prev) => {
                  const showOnlyUserRequests =
                    prev.get("showOnlyUserRequests") === "true";
                  prev.set(
                    "showOnlyUserRequests",
                    String(!showOnlyUserRequests)
                  );
                  return prev;
                })
              }
            />
          }
          label={t("workspaceRequests.showOnlyUserRequests")}
          labelPlacement="end"
          sx={{ ml: "1px" }}
        />
      )}
    </Flex>
  );
}
