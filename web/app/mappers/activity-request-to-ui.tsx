import { ActivityType, IActivity } from "~/types";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { formatDateWithTimeWithoutTimezone } from "~/util";
import { Flex, FlexColumn } from "~/components/common";
import { getActivityTypeDescriptionForTrip } from "./activity-request-to-ui-trip";

export const getActivityTypeDescription = (request: IActivity) => {
  const { dateStart, dateEnd, hours } = request;

  switch (request.activityType) {
    case ActivityType.BusinessTrip:
      return getActivityTypeDescriptionForTrip(
        request,
        ActivityType.BusinessTrip
      );
    case ActivityType.SickLeave:
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
