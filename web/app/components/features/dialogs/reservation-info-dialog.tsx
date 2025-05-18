import { t } from "i18next";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { PaddedFlexColumn } from "~/components/common";
import { IDesk, IReservation, IWorkspaceUser } from "~/types";
import { formatDate, fullNameFormatter } from "~/util";

export interface IReservationInfo {
  workspaceUser: IWorkspaceUser;
  item: IDesk;
  reservation: IReservation | undefined;
}

export function ReservationInfoDialog({
  item,
  workspaceUser,
  reservation,
}: IReservationInfo) {
  return (
    <PaddedFlexColumn>
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          {fullNameFormatter(workspaceUser)}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
          }}
        >
          {workspaceUser.role}
        </Typography>
      </Box>
      <Box>
        <Typography>{item.name ?? t("error.notPresent")}</Typography>
      </Box>
      <Box>
        <Typography>{t("workspaceReservations.fromTo")}</Typography>
        <Typography
          sx={{
            color: "GrayText",
          }}
        >
          {(reservation &&
            formatDate(
              reservation.fromDateStart,
              undefined,
              "DD. MMM, YYYY"
            )) ??
            t("error.notPresent")}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
          }}
        >
          {(reservation &&
            formatDate(reservation.toDateEnd, undefined, "DD. MMM, YYYY")) ??
            t("error.notPresent")}
        </Typography>
      </Box>
    </PaddedFlexColumn>
  );
}
