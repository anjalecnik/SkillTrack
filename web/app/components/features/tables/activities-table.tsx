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
import { DataTestIds } from "~/data-test-ids";
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
  items: IActivityTableItem[];
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
        { children: t("userHub.expenses") },
        { children: t("userHub.overtime") },
        { children: t("userHub.onCall") },
      ]}
      render={(item) => {
        const { date, activities } = item;
        const formattedDate = formatDate(date);
        const businessTrips: IActivity[] = [];
        const tripsToOffice: IActivity[] = [];
        const overtimes: IActivity[] = [];
        const weekends: IActivity[] = [];
        const holidays: IActivity[] = [];
        const onCalls: IActivity[] = [];
        const expenses: IActivity[] = [];
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
            case ActivityType.TripToOffice:
              tripsToOffice.push(activity);
              isPendingApproval =
                activity.status === ActivityStatus.PendingApproval;
              break;
            case ActivityType.Overtime:
              overtimes.push(activity);
              isPendingApproval =
                activity.status === ActivityStatus.PendingApproval;
              break;
            case ActivityType.OnCall:
              onCalls.push(activity);
              isPendingApproval =
                activity.status === ActivityStatus.PendingApproval;
              break;
            case ActivityType.Expense:
              expenses.push(activity);
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
            case ActivityType.SchoolSchedule:
            case ActivityType.SickLeave:
            case ActivityType.Vacation:
            case ActivityType.SpecialLeave:
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

        const isExpense = expenses.length > 0;
        const isWeekends = weekends.length > 0 || isWeekend(date);
        const isHoliday = holidays.length > 0;
        const hasAbsence = absences.length > 0;
        const isOvertime = overtimes.length > 0;
        const onCall = onCalls[0];

        const isUnassigned =
          unassigned.length > 0 &&
          !hasAbsence &&
          !isWeekend(date) &&
          !isHoliday;
        const isEmpty =
          empty.length > 0 && !hasAbsence && !isWeekend(date) && !isHoliday;

        const isFirstOnCallRow = onCalls.some(
          (activity) => activity.firstOnCall
        );
        const isLastOnCallRow = onCalls.some((activity) => activity.lastOnCall);

        const isToday = dayjs(date).isSame(dayjs(), "day");
        const id = isUnassigned ? unassigned[0].id : daily[0]?.id;
        const hasReportedAnyActivity =
          tripsToOffice.length > 0 ||
          businessTrips.length > 0 ||
          overtimes.length > 0 ||
          onCalls.length > 0 ||
          expenses.length > 0 ||
          daily.length > 0 ||
          absences.length > 0;

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

        const isReportTripOnClickEnabled =
          (businessTrips.length > 0 ? businessTrips[0] : tripsToOffice[0])
            ?.activityType === ActivityType.TripToOffice
            ? isActivityWithinReportableDays(
                reportActivityRestrictions,
                ActivityTypeLowerCase.TripToOffice,
                date
              )
            : isActivityWithinReportableDays(
                reportActivityRestrictions,
                ActivityTypeLowerCase.BusinessTrip,
                date
              ) && !hasAbsence;

        const isReportOvertimeOnClickEnabled =
          !hasAbsence &&
          !businessTrips.length &&
          isActivityWithinReportableDays(
            reportActivityRestrictions,
            ActivityTypeLowerCase.Overtime,
            date
          );
        const isReportOnCallOnClickEnabled =
          isActivityWithinReportableDays(
            reportActivityRestrictions,
            ActivityTypeLowerCase.OnCall,
            date
          ) && !hasAbsence;

        const isReportExpenseClickEnabled = isActivityWithinReportableDays(
          reportActivityRestrictions,
          ActivityTypeLowerCase.Expense,
          date
        );

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
                {[...businessTrips, ...tripsToOffice].length === 0 ? (
                  <Tooltip
                    title={
                      isReportTripOnClickEnabled
                        ? t("userHub.clickToReport", {
                            activityType:
                              MoreToReportActivityTooltipType.BusinessTrip,
                          })
                        : ""
                    }
                    followCursor
                    placement="top"
                  >
                    <Box
                      data-testid={
                        isToday &&
                        DataTestIds.activityDashboard.todayBusinessTripCell
                      }
                      sx={{
                        cursor: "pointer",
                        height: "100%",
                        flexGrow: 1,
                        "&:hover": {
                          backgroundColor: isReportTripOnClickEnabled
                            ? alpha(theme.palette.secondary.light, 0.2)
                            : undefined,
                        },
                      }}
                      onMouseEnter={() =>
                        isReportTripOnClickEnabled
                          ? setIsActivityHovered(false)
                          : setIsActivityHovered(true)
                      }
                      onMouseLeave={() =>
                        isReportTripOnClickEnabled
                          ? setIsActivityHovered(true)
                          : setIsActivityHovered(false)
                      }
                      onClick={(e) => {
                        if (isReportTripOnClickEnabled) {
                          e.stopPropagation();
                          onReportMoreClick(
                            MoreToReportActivityType.BusinessTrip,
                            {
                              dateStart: date,
                              startTime: "07:00",
                            }
                          );

                          return;
                        }
                      }}
                    >
                      <div />
                    </Box>
                  </Tooltip>
                ) : (
                  [...businessTrips, ...tripsToOffice].map(
                    (activity, index) => {
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
                                        ? alpha(
                                            theme.palette.secondary.dark,
                                            0.4
                                          )
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
                    }
                  )
                )}
              </Flex>
            </TableCell>

            <Tooltip
              title={
                !isExpense && isReportExpenseClickEnabled
                  ? t("userHub.clickToReport", {
                      activityType: MoreToReportActivityTooltipType.Expense,
                    })
                  : ""
              }
              followCursor
              placement="top"
            >
              <TableCell
                sx={{
                  padding: "0 10px !important",
                  height: 0,
                  cursor:
                    isExpense || isClickable || isReportExpenseClickEnabled
                      ? "pointer"
                      : "default",
                  "&:hover": {
                    backgroundColor:
                      !isExpense && isReportExpenseClickEnabled
                        ? alpha(theme.palette.secondary.light, 0.2)
                        : undefined,
                  },
                }}
                onClick={(e) => {
                  if (!isExpense && isReportExpenseClickEnabled) {
                    e.stopPropagation();
                    onReportMoreClick?.(MoreToReportActivityType.Expense, {
                      date,
                    });
                    return;
                  }
                }}
                onMouseEnter={() =>
                  isReportExpenseClickEnabled || isExpense
                    ? setIsActivityHovered(false)
                    : setIsActivityHovered(true)
                }
                onMouseLeave={() =>
                  isReportExpenseClickEnabled || isExpense
                    ? setIsActivityHovered(true)
                    : setIsActivityHovered(false)
                }
              >
                {isExpense && (
                  <Tooltip
                    title={
                      isPendingApproval ? t("userHub.pendingApproval") : ""
                    }
                  >
                    <Chip
                      sx={{
                        height: "50%",
                        width: "100%",
                        backgroundColor: requestBgColor,
                        color: requestTextColor,
                        "&:hover": {
                          backgroundColor: requestBgColor,
                        },
                      }}
                      variant="light"
                      label={
                        expenses
                          ?.reduce(
                            (sum, expense) =>
                              sum + (Number(expense.valueInEuro) || 0),
                            0
                          )
                          .toFixed(2) + " €" || "0.00 €"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestClick?.(
                          expenses.map((e) => e.activityRequestId)
                        );
                      }}
                    />
                  </Tooltip>
                )}
              </TableCell>
            </Tooltip>

            <Tooltip
              title={
                isReportOvertimeOnClickEnabled && !isOvertime
                  ? t("userHub.clickToReport", {
                      activityType: MoreToReportActivityTooltipType.Overtime,
                    })
                  : ""
              }
              followCursor
              placement="top"
            >
              <TableCell
                sx={{
                  padding: "0 10px !important",
                  height: 0,
                  cursor:
                    isReportOvertimeOnClickEnabled || isOvertime || isClickable
                      ? "pointer"
                      : "default",
                  "&:hover": {
                    backgroundColor:
                      isReportOvertimeOnClickEnabled && !isOvertime
                        ? alpha(theme.palette.secondary.light, 0.2)
                        : undefined,
                  },
                }}
                onClick={(e) => {
                  if (!isOvertime && isReportOvertimeOnClickEnabled) {
                    e.stopPropagation();
                    onReportMoreClick(MoreToReportActivityType.Overtime, {
                      date,
                    });
                    return;
                  }
                }}
                onMouseEnter={() =>
                  isReportOvertimeOnClickEnabled || isOvertime
                    ? setIsActivityHovered(false)
                    : setIsActivityHovered(true)
                }
                onMouseLeave={() =>
                  isReportOvertimeOnClickEnabled || isOvertime
                    ? setIsActivityHovered(true)
                    : setIsActivityHovered(false)
                }
              >
                {isOvertime && (
                  <Tooltip
                    title={
                      isPendingApproval ? t("userHub.pendingApproval") : ""
                    }
                  >
                    <Chip
                      sx={{
                        height: "50%",
                        width: "100%",
                        backgroundColor: requestBgColor,
                        color: requestTextColor,
                        "&:hover": {
                          backgroundColor: requestBgColor,
                        },
                      }}
                      variant="light"
                      label={
                        overtimes?.reduce(
                          (sum, overtime) => (sum += overtime.hours ?? 0),
                          0
                        ) + " h"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestClick?.(
                          overtimes.map((o) => o.activityRequestId)
                        );
                      }}
                    />
                  </Tooltip>
                )}
              </TableCell>
            </Tooltip>
            <Tooltip
              title={
                isReportOnCallOnClickEnabled && !onCall
                  ? t("userHub.clickToReport", {
                      activityType: MoreToReportActivityTooltipType.OnCall,
                    })
                  : ""
              }
              followCursor
              placement="top"
            >
              <TableCell
                sx={{
                  padding: "0 !important",
                  backgroundColor:
                    onCall && !isFirstOnCallRow && !isLastOnCallRow
                      ? isPendingApproval
                        ? theme.palette.secondary[200]
                        : theme.palette.customColors.greekBlue.light
                      : undefined,
                  height: 0,
                  maxWidth: "200px",
                  minWidth: "80px",
                  borderBottom: onCall && !isLastOnCallRow ? 0 : undefined,
                  cursor:
                    onCall || isClickable || isReportOnCallOnClickEnabled
                      ? "pointer"
                      : "default",
                  "&:hover": {
                    backgroundColor:
                      isReportOnCallOnClickEnabled && !onCall
                        ? alpha(theme.palette.secondary.light, 0.2)
                        : undefined,
                  },
                }}
                onMouseEnter={() =>
                  isReportOnCallOnClickEnabled || onCall
                    ? setIsActivityHovered(false)
                    : setIsActivityHovered(true)
                }
                onMouseLeave={() =>
                  isReportOnCallOnClickEnabled || onCall
                    ? setIsActivityHovered(true)
                    : setIsActivityHovered(false)
                }
              >
                <Flex
                  sx={{ height: "100%" }}
                  onClick={(e) => {
                    if (!onCall && isReportOnCallOnClickEnabled) {
                      e.stopPropagation();
                      onReportMoreClick(MoreToReportActivityType.OnCall, {
                        dateStart: date,
                        startTime: "07:00",
                      });
                      return;
                    }
                    if (!onCall) return;

                    e.stopPropagation();
                    onRequestClick?.([onCall.activityRequestId]);
                  }}
                >
                  {onCall && (isFirstOnCallRow || isLastOnCallRow) && (
                    <Chip
                      sx={{
                        margin:
                          isFirstOnCallRow && isLastOnCallRow
                            ? "auto 0 auto 0"
                            : isFirstOnCallRow
                              ? "auto 0 0 0"
                              : "0 0 auto 0",
                        height:
                          isFirstOnCallRow && isLastOnCallRow ? "50%" : "75%",
                        width: "100%",
                        backgroundColor: requestBgColor,
                        color: requestTextColor,
                      }}
                      variant="light"
                      label={
                        isFirstOnCallRow && (
                          <Tooltip
                            title={
                              isPendingApproval
                                ? t("userHub.pendingApproval")
                                : onCall.description
                            }
                            placement="top"
                          >
                            <Typography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {onCall.description ?? t("userHub.onCall")}
                            </Typography>
                          </Tooltip>
                        )
                      }
                    />
                  )}
                </Flex>
              </TableCell>
            </Tooltip>
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
