import {
  TableRow,
  TableCell,
  Typography,
  useTheme,
  Tooltip,
  alpha,
  Box,
} from "@mui/material";
import { Link, useLocation, useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Flex, FlexColumn, PaginatedTable, Avatar } from "~/components/common";
import { YEAR_PERFORMANCE_REVIEW_QUARTALS } from "~/constants";
import { ITableMeta } from "~/types";
import { PerformanceReviewQuartal } from "~/types/enums/performance-review-quartal.enum";
import {
  IPerformanceReview,
  IUsersPerformanceReviews,
} from "~/types/interfaces/performance-review/users-performance-reviews-table";

export interface IPerformanceReviewTableProps {
  items: IUsersPerformanceReviews[];
  meta?: ITableMeta;
  isLoading?: boolean;
  onPerformanceReviewClick: (
    isViewing: boolean,
    userId: number,
    quartal: PerformanceReviewQuartal,
    review?: IPerformanceReview
  ) => void;
}

export function PerformanceReviewTable({
  items,
  meta,
  isLoading,
  onPerformanceReviewClick,
}: IPerformanceReviewTableProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const location = useLocation();
  const isOnWorkspaceHub = location.pathname.startsWith("/workspace-hub");

  return (
    <PaginatedTable
      isLoading={isLoading}
      headers={[
        {
          children: t("workspacePerformanceReviews.employeeName"),
          sort: true,
          param: "name",
        },
        ...YEAR_PERFORMANCE_REVIEW_QUARTALS.map((quartal) => ({
          children: t(`workspacePerformanceReviews.${quartal}`),
        })),
      ]}
      render={(item) => {
        const scoresMap = item.scores.reduce(
          (acc, score) => {
            acc[score.quartal] = score;
            return acc;
          },
          {} as Record<string, IPerformanceReview>
        );

        return (
          <TableRow key={item.id}>
            <TableCell width="20%">
              <Link
                to={
                  isOnWorkspaceHub
                    ? `/workspace-hub/employees/${item.id}?view=performanceReviews`
                    : "#"
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Flex alignItems={"center"} gap="10px">
                  <Avatar
                    avatarId={item.id}
                    name={`${item.name} ${item.surname}`}
                    size="40px"
                    fontSize="16px"
                  />
                  <FlexColumn>
                    <Typography>{`${item.name} ${item.surname}`}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.grey[500],
                      }}
                    >
                      {item.email}
                    </Typography>
                  </FlexColumn>
                </Flex>
              </Link>
            </TableCell>

            {YEAR_PERFORMANCE_REVIEW_QUARTALS.map((quartal, index) => {
              return (
                <Tooltip
                  title={
                    !scoresMap[quartal] &&
                    t("workspacePerformanceReviews.clickToReview")
                  }
                  followCursor
                  placement="top"
                  key={index}
                >
                  <TableCell
                    width="20%"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: !scoresMap[quartal]
                          ? alpha(theme.palette.secondary.light, 0.2)
                          : undefined,
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPerformanceReviewClick(
                        !!scoresMap[quartal],
                        item.id,
                        quartal as PerformanceReviewQuartal,
                        item.scores.find((score) => score.quartal === quartal)
                      );
                    }}
                  >
                    {scoresMap[quartal] ? (
                      Object.entries({
                        "Top Pay": scoresMap[quartal]?.answer1,
                        "Keep on Team": scoresMap[quartal]?.answer2,
                        "Performance Risk": scoresMap[quartal]?.answer3
                          ? "Yes"
                          : "No",
                        "Promotion Ready": scoresMap[quartal]?.answer4
                          ? "Yes"
                          : "No",
                      }).map(([label, value], index) => (
                        <Box display="flex" key={index}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            key={index}
                          >
                            {label}:&nbsp;
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
                      ))
                    ) : (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        key={index}
                      >
                        /
                      </Typography>
                    )}
                  </TableCell>
                </Tooltip>
              );
            })}
          </TableRow>
        );
      }}
      items={items}
      meta={meta}
    />
  );
}
