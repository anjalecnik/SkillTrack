import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";
import { Typography, Box, Paper, Grid, Stack } from "@mui/material";
import { IUserPerformanceDetails } from "~/types/interfaces/performance-review/user-performance-details";
import { fullNameFormatter } from "~/util";
import dayjs from "dayjs";
import { t } from "i18next";
import { PerformanceReviewQuartal } from "~/types/enums/performance-review-quartal.enum";
import { IPerformanceReview } from "~/types/interfaces/performance-review/users-performance-reviews-table";
import { Dispatch, SetStateAction } from "react";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";

interface IEmployeePerformanceReviewCard {
  userId: number;
  performanceReviews: IUserPerformanceDetails[];
  setDefaultPerformanceReviewValues: Dispatch<
    SetStateAction<IActivityPerformanceReviewForm | undefined>
  >;
  setIsViewing: Dispatch<SetStateAction<boolean>>;
  setIsPerformanceReviewPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export function EmployeePerformanceReviewCard({
  userId,
  performanceReviews,
  setDefaultPerformanceReviewValues,
  setIsViewing,
  setIsPerformanceReviewPopupOpen,
}: IEmployeePerformanceReviewCard) {
  const handlePerformanceReviewClick = (
    isViewing: boolean = false,
    quartal?: PerformanceReviewQuartal,
    review?: IPerformanceReview
  ) => {
    setDefaultPerformanceReviewValues({
      employeeId: userId,
      quartal,
      year: review?.year,
      answer1: review?.answer1,
      answer2: review?.answer2,
      answer3: review?.answer3,
      answer4: review?.answer4,
      activityId: review?.id,
    });
    if (isViewing) setIsViewing(true);
    setIsPerformanceReviewPopupOpen(true);
  };

  return (
    <>
      {!performanceReviews.length && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          {t("workspaceEmployees.noPerformanceReviewsAvailable")}
        </Typography>
      )}
      <Timeline sx={{ paddingLeft: 0 }}>
        <Box
          sx={{
            width: "55%",
            marginBottom: 2,
          }}
        >
          {performanceReviews.map((item, itemIndex) => (
            <TimelineItem key={itemIndex} sx={{ left: 0 }}>
              <TimelineOppositeContent
                sx={{
                  alignSelf:
                    itemIndex === 0
                      ? "flex-start"
                      : itemIndex === performanceReviews.length - 1
                      ? "flex-end"
                      : "center",
                  textAlign: "right",
                  flex: "0 0 auto",
                  minWidth: "10ch",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.quartal} {item.year}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {itemIndex !== 0 && <TimelineConnector />}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
                  onClick={() => {
                    handlePerformanceReviewClick(
                      !!item.answer1,
                      item.quartal as PerformanceReviewQuartal,
                      item
                    );
                  }}
                >
                  <TimelineDot>
                    {item.answer1 ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CheckCircleFilled />
                    )}
                  </TimelineDot>
                </Stack>
                {itemIndex !== performanceReviews.length - 1 && (
                  <TimelineConnector />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ display: "flex", alignItems: "center" }}>
                {item.answer1 || item.reportedBy ? (
                  <Paper
                    elevation={3}
                    sx={{ p: 2, width: "100%", cursor: "pointer" }}
                    onClick={() => {
                      handlePerformanceReviewClick(
                        true,
                        item.quartal as PerformanceReviewQuartal,
                        item
                      );
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" component="span">
                        {t("workspaceEmployees.performanceReview")}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {dayjs(item.createdAt).format("DD MMM YYYY")}
                      </Typography>
                    </Box>
                    <Typography>
                      By {fullNameFormatter(item.reportedBy)}
                    </Typography>
                    <Grid container>
                      {Object.entries({
                        "Top Pay": item.answer1,
                        "Keep on Team": item.answer2,
                        "Performance Risk": item.answer3 ? "Yes" : "No",
                        "Promotion Ready": item.answer4 ? "Yes" : "No",
                      }).map(([label, value], index) => (
                        <Grid item xs={6} key={index}>
                          <Box display="flex">
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              • {label}:&nbsp;
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ textTransform: "capitalize" }}
                              key={index}
                            >
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                ) : (
                  <></>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Box>
      </Timeline>
    </>
  );
}
