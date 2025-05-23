import { Typography, Button } from "@mui/material";
import { t } from "i18next";
import { Flex, SearchField } from "~/components/common";
import { useIsAdminRoute, useMobile, useTablet } from "~/hooks";
import { RequestsOverviewTableFilters } from "~/components/features";
import { Dispatch, SetStateAction } from "react";
import { useMatches } from "@remix-run/react";
import { IWorkspace, IWorkspaceUser } from "~/types";
import { isSupervisorOrHigher } from "~/util";

interface RequestsCardHeaderProps {
  setIsMoreToReportDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsPlanAbsenceDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleDailyReportClick: () => void;
  shouldShowPersonalRequestsCheckbox?: boolean;
  shouldShowSearchBox?: boolean;
}

export function RequestsCardHeader({
  setIsMoreToReportDialogOpen,
  setIsPlanAbsenceDialogOpen,
  handleDailyReportClick,
  shouldShowPersonalRequestsCheckbox = true,
  shouldShowSearchBox = true,
}: RequestsCardHeaderProps) {
  const isTablet = useTablet();
  const isMobile = useMobile();
  const isAdminRoute = useIsAdminRoute();

  const matches = useMatches();
  const rootData = matches.find((match) => match.id === "root")?.data as
    | {
        user: { name: string; surname: string };
      }
    | { user: IWorkspaceUser };

  const workspaceUser = (rootData as { user: IWorkspaceUser })?.user;
  const isSupervisorOrAdmin = isSupervisorOrHigher(workspaceUser);

  return (
    <>
      <Typography variant="h6">{t("workspaceRequests.overview")}</Typography>
      <Flex
        sx={{
          ...(isTablet && { flexFlow: "row wrap", gap: "20px" }),
          justifyContent: "space-between",
        }}
      >
        <RequestsOverviewTableFilters
          isSupervisorOrAdmin={isSupervisorOrAdmin}
          shouldShowPersonalRequestsCheckbox={
            shouldShowPersonalRequestsCheckbox
          }
        />

        <Flex
          gap="20px"
          alignItems="center"
          sx={{
            ...(isMobile && {
              flexDirection: "column",
              width: "100%",
              alignItems: "normal",
            }),
          }}
        >
          {isSupervisorOrAdmin && shouldShowSearchBox && (
            <SearchField
              param="search"
              placeholder={t("workspaceRequests.searchByName")!}
            />
          )}
          {isAdminRoute && (
            <Button variant="outlined" onClick={handleDailyReportClick}>
              {t("userHub.dailyReport")}
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => setIsMoreToReportDialogOpen(true)}
          >
            {t("userHub.moreToReport")}
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsPlanAbsenceDialogOpen(true)}
          >
            {t("userHub.planAbsence")}
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
