import { AppleOutlined, HomeOutlined, SkinOutlined } from "@ant-design/icons";
import {
  alpha,
  Box,
  Chip,
  Icon,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "@remix-run/react";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, FlexColumn, PaginatedTable } from "~/components/common";
import { useMobile } from "~/hooks";
import {
  ActivityAction,
  ActivityStatus,
  ActivityType,
  ActivityTypeLowerCase,
  getActivityTypeLabel,
  IActivity,
  IActivityMoreToReportForm,
  IActivityTableItem,
  IProjectUserResponse,
  IWorkspaceModuleActivity,
  MoreToReportActivityTooltipType,
  MoreToReportActivityType,
} from "~/types";
import {
  formatDate,
  getAbsenceDescription,
  getTripCellValue,
  isActivityWithinReportableDays,
  isWeekend,
} from "~/util";

interface IActivitiesTableProps {
  items: IActivityTableItem[] | null[];
  sortKey?: string;
  projects: IProjectUserResponse[];
  isLoading?: boolean;
  onItemClick?: (
    date: string,
    action: ActivityAction,
    useDate?: boolean,
    employeeId?: number
  ) => void;
  onRequestClick?: (requestIds: number[]) => void;
  onReportMoreClick: (
    activityType: MoreToReportActivityType,
    data: IActivityMoreToReportForm
  ) => void;
  reportActivityRestrictions?: IWorkspaceModuleActivity;
}

export function ActivitiesTable({
  items,
  sortKey,
  isLoading,
  onItemClick,
  onRequestClick,
  onReportMoreClick,
  reportActivityRestrictions,
}: IActivitiesTableProps) {
  const { t } = useTranslation();
  const [isActivityHovered, setIsActivityHovered] = useState(false);
  const theme = useTheme();
  const { employeeId } = useParams();
  const isMobile = useMobile();

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
        { children: t("userHub.projectHours") },
        { children: t("userHub.trip") },
      ]}
      render={(item) => {
        const { date, activities } = item;
        const formattedDate = formatDate(date);
        const businessTrips: IActivity[] = [];
        const weekends: IActivity[] = [];
        const holidays: IActivity[] = [];
        const unassigned: IActivity[] = [];
        const empty: IActivity[] = [];
        const daily: IActivity[] = [];
        const absences: IActivity[] = [];
        let isPendingApproval = false;

        activities.forEach((activity) => {
          switch (activity.activityType) {
            case ActivityType.BusinessTrip:
              businessTrips.push(activity);
              isPendingApproval =
                activity.status === ActivityStatus.PendingApproval;
              break;

            case ActivityType.Empty:
              empty.push(activity);
              break;
            case ActivityType.Unassigned:
              unassigned.push(activity);
              break;
            case ActivityType.Daily:
              daily.push(activity);
              break;
            case ActivityType.SickLeave:
            case ActivityType.Vacation:
              absences.push(activity);
              isPendingApproval =
                activity.status === ActivityStatus.PendingApproval;
              break;
            case ActivityType.Weekend:
              weekends.push(activity);
              break;
            case ActivityType.Holiday:
              holidays.push(activity);
              break;
          }
        });

        const isWeekends = weekends.length > 0 || isWeekend(date);
        const isHoliday = holidays.length > 0;
        const hasAbsence = absences.length > 0;

        const isUnassigned =
          unassigned.length > 0 &&
          !hasAbsence &&
          !isWeekend(date) &&
          !isHoliday;
        const isEmpty =
          empty.length > 0 && !hasAbsence && !isWeekend(date) && !isHoliday;

        const isToday = dayjs(date).isSame(dayjs(), "day");
        const id = isUnassigned ? unassigned[0].id : daily[0]?.id;
        const hasReportedAnyActivity =
          businessTrips.length > 0 || daily.length > 0 || absences.length > 0;

        const isClickable =
          (id &&
            (isActivityWithinReportableDays(
              reportActivityRestrictions,
              ActivityTypeLowerCase.Daily,
              date
            ) ||
              isUnassigned)) ||
          (isEmpty && isToday) ||
          (isActivityWithinReportableDays(
            reportActivityRestrictions,
            ActivityTypeLowerCase.Daily,
            date
          ) &&
            hasReportedAnyActivity);

        const todaysDailyActivities = activities.filter(
          (activity) =>
            activity.activityType === ActivityType.Daily &&
            activity.date === date
        );

        const dailyWorkingHoursText = [
          ...todaysDailyActivities
            .filter((x) => x.workingHours)
            .map((x) => ({
              startTime: x.workingHours?.fromDateStart?.time ?? " / ",
              endTime: x.workingHours?.toDateEnd?.time ?? " / ",
              projectName: x.workingHours?.projectName ?? " / ",
              id: x.workingHours?.id,
            }))
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((workingHour) => (
              <div key={workingHour.id}>
                {`${workingHour.startTime} - ${workingHour.endTime}: ${workingHour.projectName}`}
              </div>
            )),
          ...(hasAbsence
            ? absences.map((x) => {
                return (
                  <div key={x.id} style={{ display: "flex" }}>
                    {getAbsenceDescription(x)}
                    {x.status === ActivityStatus.PendingApproval && (
                      <div style={{ fontStyle: "italic" }}>
                        {" "}
                        - {t("userHub.pendingApproval")}
                      </div>
                    )}
                  </div>
                );
              })
            : []),
        ];

        const lunchActivity = activities.find(
          (activity) =>
            activity.activityType === ActivityType.Lunch &&
            activity.date === date
        );

        let tableRowBgColors = "inherit";
        let tableCellBorderColor;
        switch (true) {
          case isToday:
            tableRowBgColors = alpha(theme.palette.primary.lighter, 0.4);
            tableCellBorderColor = `2px solid ${theme.palette.primary.main}`;
            break;
          case isUnassigned:
            tableRowBgColors = alpha(theme.palette.error.lighter, 0.4);
            tableCellBorderColor = `2px solid${theme.palette.error.main}`;
            break;
          case hasAbsence:
            tableRowBgColors = alpha(theme.palette.warning.lighter, 0.4);
            tableCellBorderColor = `2px solid${theme.palette.warning.light}`;
            break;
        }
        const requestBgColor = isPendingApproval
          ? theme.palette.secondary[200]
          : theme.palette.customColors.greekBlue.light;
        const requestTextColor = isPendingApproval
          ? alpha(theme.palette.secondary.dark, 0.4)
          : theme.palette.customColors.greekBlue.main;

        const tableRow = (
          <TableRow
            sx={{
              backgroundColor: tableRowBgColors,
              cursor: isClickable ? "pointer" : "default",
              "&.MuiTableRow-root:hover": {
                backgroundColor: isActivityHovered
                  ? alpha(theme.palette.secondary.light, 0.2)
                  : tableRowBgColors,
              },
            }}
            key={date}
            onClick={() => {
              if (isClickable && onItemClick && formattedDate) {
                onItemClick(
                  formattedDate,
                  isUnassigned || isEmpty
                    ? ActivityAction.Create
                    : ActivityAction.Update,
                  true,
                  Number(employeeId)
                );
              }
            }}
          >
            <TableCell
              onMouseEnter={() => setIsActivityHovered(true)}
              onMouseLeave={() => setIsActivityHovered(false)}
              sx={{
                color: isWeekends || isHoliday ? "secondary.main" : "inherit",
                borderLeft: tableCellBorderColor,
                width: "170px",
                minWidth: "170px",
              }}
            >
              {formatDate(date, undefined, "ddd, DD. MMM, YYYY") ??
                t("error.notPresent")}
            </TableCell>
            <TableCell
              onMouseEnter={() => setIsActivityHovered(true)}
              onMouseLeave={() => setIsActivityHovered(false)}
              sx={{
                whiteSpace: "pre-wrap",
                width: "500px",
                minWidth: "230px",
              }}
            >
              <Flex
                justifyContent="space-between"
                direction={isMobile ? "column" : "row"}
              >
                {(() => {
                  switch (true) {
                    case todaysDailyActivities.length > 0:
                      return (
                        <>
                          <FlexColumn>{dailyWorkingHoursText}</FlexColumn>
                          <Flex>
                            {lunchActivity && (
                              <Tooltip title={t("userHub.lunch")}>
                                <Icon>
                                  <AppleOutlined sx={{ height: "16px" }} />
                                </Icon>
                              </Tooltip>
                            )}
                            {daily.find((x) => x.workLocation == "Office") ? (
                              <Tooltip title={t("dailyReport.inOffice")}>
                                <Icon>
                                  <SkinOutlined style={{ height: "16px" }} />
                                </Icon>
                              </Tooltip>
                            ) : (
                              daily.find((x) => x.workLocation == "Home") && (
                                <Tooltip title={t("dailyReport.fromHome")}>
                                  <Icon>
                                    <HomeOutlined style={{ height: "16px" }} />
                                  </Icon>
                                </Tooltip>
                              )
                            )}
                          </Flex>
                        </>
                      );
                    case hasAbsence:
                      return (
                        <>
                          <FlexColumn>
                            {absences
                              .map((absence) =>
                                getActivityTypeLabel(absence.activityType)
                              )
                              .join(", ")}
                          </FlexColumn>
                          {isPendingApproval && (
                            <Chip
                              sx={{
                                "&& MuiChip-label": { padding: "0 8px" },
                                height: "50%",
                                fontSize: "12px",
                                backgroundColor: theme.palette.secondary[200],
                                color: alpha(theme.palette.secondary.dark, 0.4),
                                "&:hover": {
                                  backgroundColor: theme.palette.secondary[200],
                                },
                              }}
                              variant="light"
                              label={t("userHub.pendingApproval")}
                            />
                          )}
                        </>
                      );
                    default:
                      return (
                        <div
                          style={{
                            height: "24px",
                            width: "24px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          /
                        </div>
                      );
                  }
                })()}
              </Flex>
            </TableCell>
            <TableCell
              sx={{
                padding: "0 !important",
                height: "73px",
                maxWidth: "400px",
              }}
            >
              <Flex
                sx={{
                  gap: "4px",
                  height: "100%",
                  maxWidth: "400px",
                }}
              >
                {[...businessTrips].length === 0 ? (
                  <Tooltip
                    title={t("userHub.clickToReport", {
                      activityType:
                        MoreToReportActivityTooltipType.BusinessTrip,
                    })}
                    followCursor
                    placement="top"
                  >
                    <Box
                      sx={{
                        cursor: "pointer",
                        height: "100%",
                        flexGrow: 1,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReportMoreClick(
                          MoreToReportActivityType.BusinessTrip,
                          {
                            dateStart: date,
                            startTime: "07:00",
                          }
                        );
                      }}
                    >
                      <div />
                    </Box>
                  </Tooltip>
                ) : (
                  [...businessTrips].map((activity, index) => {
                    const backgroundColor =
                      activity.status === ActivityStatus.PendingApproval
                        ? theme.palette.secondary[200]
                        : theme.palette.customColors.greekBlue.light;
                    const isFillActivity = activity.isGhost;

                    return (
                      <Tooltip
                        key={index}
                        title=""
                        followCursor
                        placement="top"
                      >
                        <Box
                          sx={{
                            cursor: isFillActivity ? "default" : "pointer",
                            borderRadius:
                              activity.isFirst && activity.isLast
                                ? "4px"
                                : activity.isFirst
                                ? "4px 4px 0 0"
                                : activity.isLast
                                ? "0 0 4px 4px"
                                : "0",
                            margin:
                              activity.isFirst && activity.isLast
                                ? "auto 0 auto 0"
                                : activity.isFirst
                                ? "auto 0 0 0"
                                : "0 0 auto 0",
                            height:
                              activity.isFirst && activity.isLast
                                ? "50%"
                                : activity.isFirst || activity.isLast
                                ? "75%"
                                : "100%",
                            backgroundColor: !isFillActivity
                              ? backgroundColor
                              : undefined,
                            padding: "2px",
                            flexGrow: 1,
                            flexBasis: 0,
                            flexShrink: 0,
                            overflow: "hidden",
                            borderBottom: !activity.isLast ? 0 : undefined,
                          }}
                          onMouseEnter={() =>
                            !isFillActivity && setIsActivityHovered(false)
                          }
                          onMouseLeave={() =>
                            !isFillActivity && setIsActivityHovered(true)
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            !isFillActivity &&
                              onRequestClick?.([activity.activityRequestId]);
                          }}
                        >
                          {!isFillActivity &&
                            (activity.isFirst || activity.isLast) && (
                              <Chip
                                sx={{
                                  backgroundColor: backgroundColor,
                                  color:
                                    activity.status ===
                                    ActivityStatus.PendingApproval
                                      ? alpha(theme.palette.secondary.dark, 0.4)
                                      : theme.palette.customColors.greekBlue
                                          .main,
                                  width: "100%",
                                }}
                                label={
                                  activity.isFirst && (
                                    <Tooltip
                                      title={
                                        activity.status ===
                                        ActivityStatus.PendingApproval
                                          ? t("userHub.pendingApproval")
                                          : getTripCellValue(activity)
                                      }
                                    >
                                      <Typography
                                        sx={{
                                          display: "inline",
                                        }}
                                      >
                                        {getTripCellValue(activity)}
                                      </Typography>
                                    </Tooltip>
                                  )
                                }
                                variant="light"
                              />
                            )}
                        </Box>
                      </Tooltip>
                    );
                  })
                )}
              </Flex>
            </TableCell>
          </TableRow>
        );

        return isClickable && isActivityHovered ? (
          <Tooltip
            title={t("userHub.clickToViewReport")}
            key={item.date}
            placement="top"
          >
            {tableRow}
          </Tooltip>
        ) : (
          tableRow
        );
      }}
      items={items}
    />
  );
}
