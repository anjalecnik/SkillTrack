import { IActivity } from "~/types";
import { t } from "i18next";
import { Typography } from "@mui/material";
import { Flex } from "~/components/common";
import { formatDateWithTimeWithoutTimezone } from "~/util";

export const getActivityTypeDescriptionForOvertime = (request: IActivity) => {
  const { dateStart, dateEnd } = request;

  return (
    <>
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
      <Flex gap="25%">
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
            {formatDateWithTimeWithoutTimezone(dateEnd, "DD.MM.YYYY", "H:mm") ??
              t("error.notPresent")}
          </Typography>
        </div>
      </Flex>
    </>
  );
};
