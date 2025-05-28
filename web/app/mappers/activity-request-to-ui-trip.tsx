import { ActivityType, IActivity } from "~/types";
import { t } from "i18next";
import { Typography } from "@mui/material";
import { Flex, FlexColumn } from "~/components/common";
import { formatDateWithTimeWithoutTimezone } from "~/util";

export const getActivityTypeDescriptionForTrip = (
  request: IActivity,
  activityType: ActivityType.BusinessTrip
) => {
  const { distanceInKM, location, dateStart, dateEnd } = request;

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
              {t("requestInfo.departureDate")}
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
              {t("requestInfo.returnDate")}
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
          <div style={{ width: "250px" }}>
            <Typography
              variant="body1"
              sx={{
                color: "grey.500",
              }}
            >
              {t("userHub.destination")}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
            >
              {activityType === ActivityType.BusinessTrip && location}
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
              {t("requestInfo.departureTime")}
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
              {t("requestInfo.returnTime")}
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
          <div>
            <Typography
              variant="body1"
              sx={{
                color: "grey.500",
              }}
            >
              {t("userHub.mileage")}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
            >
              {distanceInKM}
            </Typography>
          </div>
        </FlexColumn>
      </Flex>
    </>
  );
};
