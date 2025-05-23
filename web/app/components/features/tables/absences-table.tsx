import { TableRow, TableCell, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PaginatedTable } from "~/components/common";
import {
  getActivityStatusLabel,
  IActivity,
  getActivityTypeLabel,
  ActivityStatus,
} from "~/types";
import { formatDateWithStartAndEnd } from "~/util";

interface IAbsencesTableProps {
  items: null[] | IActivity[];
  sortKey?: string;
  isLoading?: boolean;
  enableToCancelAbsenceActivity?: boolean;
  onCancelClick: (item: IActivity) => void;
}

export function AbsencesTable({
  items,
  sortKey,
  isLoading,
  enableToCancelAbsenceActivity = true,
  onCancelClick,
}: IAbsencesTableProps) {
  const { t } = useTranslation();

  return (
    <PaginatedTable
      isLoading={isLoading}
      sortKey={sortKey}
      headers={[
        {
          children: t("userHub.date"),
          sort: true,
          param: "dateStart",
        },
        {
          children: t("userHub.type"),
        },
        { children: t("userHub.status") },
        { children: "" },
      ]}
      render={(item) => {
        const isCanceled = item.status === ActivityStatus.Canceled;
        return (
          <TableRow key={item.id + item.activityType}>
            <TableCell
              sx={{
                color: isCanceled ? "grey.400" : "inherit",
              }}
            >
              {formatDateWithStartAndEnd(item, "ddd, DD. MMM, YYYY")}
            </TableCell>
            <TableCell
              sx={{
                color: isCanceled ? "grey.400" : "inherit",
              }}
            >
              {(item.activityType && getActivityTypeLabel(item.activityType)) ||
                "/"}
            </TableCell>
            <TableCell
              sx={{
                color: isCanceled ? "grey.400" : "inherit",
              }}
            >
              {(item.status && getActivityStatusLabel(item.status)) || "/"}
            </TableCell>
            <TableCell align="right">
              {!isCanceled && enableToCancelAbsenceActivity && (
                <Typography
                  variant="body2"
                  onClick={() => onCancelClick(item)}
                  sx={{
                    textDecoration: "underline",
                    color: "grey.500",
                    ":hover": {
                      cursor: "pointer",
                      color: "primary.main",
                    },
                  }}
                >
                  {t("common.cancel")}
                </Typography>
              )}
            </TableCell>
          </TableRow>
        );
      }}
      items={items}
    />
  );
}
