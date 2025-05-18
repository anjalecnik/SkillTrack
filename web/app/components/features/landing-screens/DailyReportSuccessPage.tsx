import { Divider, styled, Typography, useTheme } from "@mui/material";
import { Button, CenteredFlexColumn, FlexColumn } from "~/components/common";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { formatDate } from "~/util";
import { FEEDBACK_EMAIL_LIST, QUOTES, USER_HUB_PATH } from "~/constants";
import { ActivityWorkLocation, IActivityByIdResponse } from "~/types";
import { Link, useParams } from "@remix-run/react";

interface IDailyReportSuccessPageProps {
  lastActivities: IActivityByIdResponse;
}

export function DailyReportSuccessPage({
  lastActivities,
}: IDailyReportSuccessPageProps) {
  const { date } = lastActivities;
  const theme = useTheme();
  const params = useParams();

  const Graphic = styled("img")`
    max-width: 128px;
    min-width: 128px;

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      max-width: 64px;
      min-width: 64px;
    }
  `;

  const projectsUserReported = lastActivities._embedded.workingHours.map(
    ({ projectName }) => projectName
  );
  const location = lastActivities._embedded.activities?.[0]?.workLocation;

  if (!projectsUserReported.length) {
    throw Error();
  }

  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <FlexColumn
      justifyContent="space-around"
      alignItems="center"
      margin="20px 10px"
      height="100vh"
      textAlign="center"
    >
      <CenteredFlexColumn gap="50px">
        <Typography variant="h1">{randomQuote.content}</Typography>
        {randomQuote.author && (
          <Typography
            variant="h2"
            sx={{
              color: "grey.500",
            }}
          >
            - {randomQuote.author}
          </Typography>
        )}
        <Divider sx={{ width: "90%", borderBottomWidth: "2px" }} />
        <FlexColumn gap="15px">
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "unset",
            }}
          >
            {t("emailSuccess.thanksForReporting")}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "unset",
            }}
          >
            <Typography variant="subtitle1">
              <Trans
                i18nKey="emailSuccess.summary"
                values={{
                  date: formatDate(date, undefined, "ddd, DD. MMM, YYYY"),
                }}
              />
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                {projectsUserReported.join(", ")}
              </Typography>
              {location === ActivityWorkLocation.Home
                ? t("emailSuccess.fromHome")
                : ""}
            </Typography>
          </Typography>
          <Button variant="text" href={`${USER_HUB_PATH}`}>
            {t("emailSuccess.goBackToDashboard")}
          </Button>
        </FlexColumn>
      </CenteredFlexColumn>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "unset",
        }}
      >
        <Link
          style={{ color: "grey" }}
          to={`mailto:${FEEDBACK_EMAIL_LIST}?subject=Magnum - Problem`}
        >
          {t("emailSuccess.reportAProblem")}
        </Link>{" "}
        /{" "}
        <Link
          style={{ color: "grey" }}
          to={`mailto:${FEEDBACK_EMAIL_LIST}?subject=Magnum - Feedback`}
        >
          {t("emailSuccess.giveFeedback")}
        </Link>
      </Typography>
    </FlexColumn>
  );
}
