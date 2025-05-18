import { ActivityType, IActivity } from "~/types";
import {
  Checkbox,
  FormControlLabel,
  styled,
  TableCell,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { formatDate, formatDateWithTimeWithoutTimezone } from "~/util";
import { FileTextOutlined } from "@ant-design/icons";
import { Flex, FlexColumn, MiniButton } from "~/components/common";
import { getActivityTypeDescriptionForTrip } from "./activity-request-to-ui-trip";
import { getActivityTypeDescriptionForOvertime } from "./activity-request-to-ui-overtime";

const NoWrapTableCell = styled(TableCell)({
  whiteSpace: "nowrap",
});

const handleExpenseDownload = (request: IActivity) => {
  const link = document.createElement("a");
  link.download = request.fileName || "file";
  link.href = request.fileUrl || "#";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getActivityTypeTableCell = (activity: IActivity) => {
  const { activityType, projectName, valueInEuro, fileUrl, hours } = activity;

  switch (activityType) {
    case ActivityType.Expense:
      return (
        <>
          <NoWrapTableCell>{activityType}</NoWrapTableCell>
          <NoWrapTableCell
            sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {projectName}
          </NoWrapTableCell>
          <NoWrapTableCell
            sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {valueInEuro} €
          </NoWrapTableCell>
          <NoWrapTableCell>
            <Flex justifyContent="end">
              {fileUrl && (
                <MiniButton
                  sx={{
                    width: "100px",
                  }}
                  variant="outlined"
                  startIcon={<FileTextOutlined />}
                  onClick={(e) => {
                    handleExpenseDownload(activity);
                    e.stopPropagation();
                  }}
                >
                  {t("requestInfo.viewFile")}
                </MiniButton>
              )}
            </Flex>
          </NoWrapTableCell>
        </>
      );
    case ActivityType.Overtime:
      return (
        <>
          <NoWrapTableCell>{activityType}</NoWrapTableCell>
          <NoWrapTableCell>{projectName}</NoWrapTableCell>
          <NoWrapTableCell>
            {t("common.hours", { count: hours })}
          </NoWrapTableCell>
        </>
      );
  }
};

export const getActivityTypeDescription = (request: IActivity) => {
  const {
    dateStart,
    dateEnd,
    hours,
    valueInEuro,
    isPaidWithCompanyCard,
    date,
  } = request;

  switch (request.activityType) {
    case ActivityType.BusinessTrip:
      return getActivityTypeDescriptionForTrip(
        request,
        ActivityType.BusinessTrip
      );
    case ActivityType.TripToOffice:
      return getActivityTypeDescriptionForTrip(
        request,
        ActivityType.TripToOffice
      );
    case ActivityType.SickLeave:
    case ActivityType.SpecialLeave:
    case ActivityType.SchoolSchedule:
    case ActivityType.Vacation:
      return (
        <Flex gap="25%">
          <FlexColumn gap="20px">
            <div>
              <Typography
                variant="body1"
                sx={{
                  color: "grey.500",
                }}
              >
                {t("userHub.startDate")}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                {formatDateWithTimeWithoutTimezone(
                  dateStart,
                  "DD.MM.YYYY",
                  "DD. MMM, YYYY"
                ) ?? t("error.notPresent")}
              </Typography>
            </div>
            {hours ? (
              <div>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                  }}
                >
                  {t("requestInfo.numberOfHours")}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {hours}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                  }}
                >
                  {t("userHub.endDate")}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {formatDateWithTimeWithoutTimezone(
                    dateEnd,
                    "DD.MM.YYYY",
                    "DD. MMM, YYYY"
                  ) ?? t("error.notPresent")}
                </Typography>
              </div>
            )}
          </FlexColumn>
        </Flex>
      );
    case ActivityType.OnCall:
      return (
        <>
          <Flex gap="25%">
            <FlexColumn gap="20px">
              <div>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                  }}
                >
                  {t("userHub.startDate")}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {formatDateWithTimeWithoutTimezone(
                    dateStart,
                    "DD.MM.YYYY",
                    "DD. MMM, YYYY"
                  ) ?? t("error.notPresent")}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                  }}
                >
                  {t("userHub.endDate")}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {formatDateWithTimeWithoutTimezone(
                    dateEnd,
                    "DD.MM.YYYY",
                    "DD. MMM, YYYY"
                  ) ?? t("error.notPresent")}
                </Typography>
              </div>
            </FlexColumn>
            <FlexColumn gap="20px">
              <div>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                  }}
                >
                  {t("userHub.startTime")}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {formatDateWithTimeWithoutTimezone(
                    dateStart,
                    "DD.MM.YYYY",
                    "H:mm"
                  ) ?? t("error.notPresent")}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                  }}
                >
                  {t("userHub.endTime")}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {formatDateWithTimeWithoutTimezone(
                    dateEnd,
                    "DD.MM.YYYY",
                    "H:mm"
                  ) ?? t("error.notPresent")}
                </Typography>
              </div>
            </FlexColumn>
          </Flex>
        </>
      );
    case ActivityType.Overtime:
      return getActivityTypeDescriptionForOvertime(request);
    case ActivityType.Expense:
      return (
        <>
          <div>
            <Typography
              variant="body1"
              sx={{
                color: "grey.500",
              }}
            >
              {t("requestInfo.value")}
            </Typography>
            <Typography variant="h5">{valueInEuro}€</Typography>
          </div>
          <div>
            <Typography
              variant="body1"
              sx={{
                color: "grey.500",
              }}
            >
              {t("workspaceRequests.date")}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
            >
              {formatDate(date, "YYYY-MM-DD", "DD. MMM, YYYY") ??
                t("error.notPresent")}
            </Typography>
          </div>
          <FlexColumn gap="20px">
            {request.fileUrl && (
              <MiniButton
                sx={{
                  width: "100px",
                }}
                variant="outlined"
                startIcon={<FileTextOutlined />}
                onClick={() => handleExpenseDownload(request)}
              >
                {t("requestInfo.viewFile")}
              </MiniButton>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    marginLeft: "5px",
                  }}
                  disabled
                  checked={isPaidWithCompanyCard}
                />
              }
              label={t("requestInfo.paidWithCompanyCard")}
            />
          </FlexColumn>
        </>
      );
    default:
      return (
        <>
          <Typography
            variant="body1"
            sx={{
              color: "grey.500",
            }}
          >
            {formatDateWithTimeWithoutTimezone(dateStart, "DD.MM.YYYY") ??
              t("error.notPresent")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "grey.500",
            }}
          >
            {formatDateWithTimeWithoutTimezone(dateEnd, "DD.MM.YYYY") ??
              t("error.notPresent")}
          </Typography>
        </>
      );
  }
};
