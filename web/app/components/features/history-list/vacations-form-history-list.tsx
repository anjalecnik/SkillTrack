import { AssignedVacations } from "~/types";
import { formatDate } from "~/util";
import { FlexColumn } from "~/components/common";
import { Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IVacationsFormHistoryListProps {
  assignedVacations: AssignedVacations[];
}

export function VacationsFormHistoryList({
  assignedVacations,
}: IVacationsFormHistoryListProps) {
  const { t } = useTranslation();
  const sortedAssignedVacationsByYear = assignedVacations
    .slice()
    .sort((a, b) => b.year - a.year);

  return (
    <FlexColumn>
      {sortedAssignedVacationsByYear.map((vacation, index) => (
        <FlexColumn key={`${vacation.year}-${index}`}>
          <Typography padding="12px">
            {vacation.initialDate ? (
              <>
                {vacation.year}: {t("workspaceEmployees.initialMigrationOn")}{" "}
                {formatDate(vacation.initialDate, "YYYY-MM-DD", "DD.MM.YYYY")} /{" "}
                {vacation.assignedDays} {t("activityStatus.assigned")} /{" "}
                {vacation.initialUsedDays} {t("workspaceEmployees.used")}
              </>
            ) : (
              <>
                {vacation.year}: {vacation.assignedDays}{" "}
                {t("workspaceEmployees.days")}
              </>
            )}
          </Typography>
          <Divider />
        </FlexColumn>
      ))}
    </FlexColumn>
  );
}
