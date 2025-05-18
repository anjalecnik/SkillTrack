import {
  HomeOutlined,
  InfoCircleOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import {
  FormProvider,
  getInputProps,
  getSelectProps,
  SubmissionResult,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Icon,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, useLocation, useSearchParams } from "@remix-run/react";
import dayjs, { Dayjs } from "dayjs";
import { t } from "i18next";
import { useState } from "react";
import { Trans } from "react-i18next";
import {
  Autocomplete,
  DateInput,
  Flex,
  FlexColumn,
  MainCard,
} from "~/components/common";
import {
  DailyActivityForm,
  DailyReportFormFooter,
} from "~/components/features";
import { useIsAdminRoute, useNavigationState, useTablet } from "~/hooks";
import { dailyActivityFormSchema } from "~/schemas";
import {
  ActivityAction,
  ActivityWorkLocation,
  IActivityByIdResponse,
  IActivityHours,
  IProjectUserResponse,
  IWorkspaceUserResponse,
  NavigationState,
  SearchParam,
} from "~/types";
import {
  formatDate,
  fullNameFormatter,
  getWorkingTimeInitialValue,
  isDateSameOrAfterDate,
  IUserWithFullName,
} from "~/util";

interface DailyReportFormProps {
  latestActivity: IActivityByIdResponse | null;
  lastResult?: SubmissionResult<string[]> | null;
  unassignedActivities?: IActivityByIdResponse[] | null;
  selectedProjects?: IActivityHours[];
  handleUserChange?: (userId: number) => void;
  users?: IWorkspaceUserResponse[];
  selectedUser?: IWorkspaceUserResponse;
  allowedReportingDaysInPast?: number;
  userAllowedReportingDaysInPast?: number;
  projects?: IProjectUserResponse[];
}

export function DailyReportForm({
  latestActivity,
  lastResult,
  unassignedActivities,
  selectedProjects,
  handleUserChange,
  users,
  selectedUser,
  allowedReportingDaysInPast,
  userAllowedReportingDaysInPast,
  projects,
}: DailyReportFormProps) {
  const theme = useTheme();
  const isTablet = useTablet();
  const isAdmin = useIsAdminRoute();
  useLocation();
  const { navigationState } = useNavigationState();
  const isLoading = navigationState === NavigationState.Submitting;
  const [searchParams, setSearchParams] = useSearchParams();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: dailyActivityFormSchema,
      });
    },
    shouldRevalidate: "onBlur",
    defaultValue: {
      userId: selectedUser && selectedUser.id,
      workingTime: getWorkingTimeInitialValue(latestActivity),
      lunch: latestActivity?.lunch,
    },
    id: `daily-report-working-hours-${latestActivity?._embedded.workingHours.map(
      (hour) => hour.id
    )}`,
  });

  const isSupervisorOrAdmin =
    searchParams.get(SearchParam.EmployeeId) && userAllowedReportingDaysInPast;

  const minAllowedDate = allowedReportingDaysInPast
    ? dayjs().subtract(allowedReportingDaysInPast, "days").startOf("day")
    : undefined;
  const minUserAllowedDate = userAllowedReportingDaysInPast
    ? dayjs().subtract(userAllowedReportingDaysInPast, "days").startOf("day")
    : undefined;

  const filteredUnassignedActivities = unassignedActivities?.filter(
    (activity) => !dayjs(activity.date).isSame(dayjs(), "day")
  );

  const validUnassignedDate = filteredUnassignedActivities?.find((activity) =>
    isDateSameOrAfterDate(
      new Date(activity.date),
      isSupervisorOrAdmin
        ? minUserAllowedDate?.toDate()
        : minAllowedDate?.toDate()
    )
  );
  const reportableUnassignedActivities = validUnassignedDate
    ? filteredUnassignedActivities?.filter((activity) =>
        isDateSameOrAfterDate(
          new Date(activity.date),
          new Date(validUnassignedDate.date)
        )
      )
    : [];
  const hasUnassigned =
    filteredUnassignedActivities?.length &&
    !searchParams.get(SearchParam.EmployeeId);
  const hasReportable = reportableUnassignedActivities?.length;
  const allReported = hasReportable === filteredUnassignedActivities?.length;
  const showSupervisorMessage = isSupervisorOrAdmin && !allReported;

  const date =
    validUnassignedDate &&
    !searchParams.get(SearchParam.UseDate) &&
    !searchParams.get(SearchParam.Id) &&
    !searchParams.get(SearchParam.EmployeeId)
      ? dayjs(validUnassignedDate.date)
      : dayjs(searchParams.get(SearchParam.Date), "YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(date);

  const action =
    latestActivity &&
    date.isSame(dayjs(latestActivity?.date), "day") &&
    searchParams.get(SearchParam.Action) === ActivityAction.Create
      ? ActivityAction.Update
      : searchParams.get(SearchParam.Action);

  const lunchProps = {
    ...getInputProps(fields.lunch, {
      type: "checkbox",
    }),
  };
  const lastReportedLocation = latestActivity?.workLocation;
  const locationIconStyles = {
    display: "flex",
    alignItems: "center",
    height: "18px",
    marginLeft: "5px",
  };

  const handleDateChange = (date: Dayjs) => {
    if (date.isValid()) {
      setSelectedDate(date);
      searchParams.set(SearchParam.Date, date.format("YYYY-MM-DD"));
      setSearchParams(searchParams, {
        replace: true,
        preventScrollReset: true,
      });
    }
  };

  return (
    <Card sx={{ padding: "20px" }}>
      <FlexColumn gap="20px">
        <MainCard
          title={t("dailyReport.title")}
          sx={{ width: isTablet ? "100%" : "50%" }}
          content={false}
          footer={
            <FormProvider context={form.context}>
              <DailyReportFormFooter
                selectedProjects={selectedProjects}
                formId={form.id}
                searchParams={searchParams}
                date={date}
                latestActivity={latestActivity}
              />
            </FormProvider>
          }
        >
          <Box sx={{ padding: "40px" }}>
            <Form>
              <FormProvider context={form.context}>
                <FlexColumn paddingBottom={"20px"} gap="10px">
                  {isAdmin && users ? (
                    <Autocomplete
                      {...getSelectProps(fields.userId)}
                      name={fields.userId.name}
                      key={selectedUser?.id ?? users[0].id}
                      label={t("dailyReport.employee")}
                      value={selectedUser ?? users[0]}
                      required
                      options={users}
                      getOptionLabel={(option) =>
                        fullNameFormatter(option as IUserWithFullName) ?? ""
                      }
                      containerProps={{ sx: { flex: 1 } }}
                      onChange={(_, userId) => {
                        handleUserChange && userId && handleUserChange(userId);
                      }}
                    />
                  ) : null}
                  <DateInput
                    label={t("workspaceSettings.date")}
                    name={fields.date.name}
                    value={selectedDate}
                    required
                    format="DD. MMM, YYYY"
                    onChange={(date) => date && handleDateChange(date)}
                    markedDays={filteredUnassignedActivities}
                    minDate={minAllowedDate ?? minUserAllowedDate}
                    maxDate={dayjs()}
                    limitToMinDate={!!minAllowedDate}
                  />
                  {Array.isArray(filteredUnassignedActivities) &&
                  Array.isArray(reportableUnassignedActivities) &&
                  (hasUnassigned || showSupervisorMessage) ? (
                    <Box display="flex">
                      <Box display="flex" alignItems="center" mr={1}>
                        <InfoCircleOutlined
                          style={{
                            fontSize: "1rem",
                            color: theme.palette.customColors.red.main,
                          }}
                        />
                      </Box>
                      <Box>
                        {hasUnassigned && hasReportable ? (
                          <Typography variant="body2">
                            <Trans i18nKey="dailyReport.youForgotToReportDate" />
                            {reportableUnassignedActivities.map(
                              (activity, index) => (
                                <button
                                  key={activity.date}
                                  onClick={() =>
                                    handleDateChange(dayjs(activity.date))
                                  }
                                  type="button"
                                  className="button-underline"
                                  style={{
                                    all: "unset",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                  }}
                                >
                                  {formatDate(
                                    activity.date,
                                    undefined,
                                    "ddd, DD. MM."
                                  )}
                                  {index <
                                  reportableUnassignedActivities.length - 1
                                    ? ",\u00A0"
                                    : ""}
                                </button>
                              )
                            )}
                          </Typography>
                        ) : null}

                        {hasUnassigned && !hasReportable && !allReported ? (
                          <Typography
                            variant="body2"
                            sx={{ marginTop: hasReportable ? "8px" : 0 }}
                            style={{
                              color: theme.palette.customColors.red.main,
                            }}
                          >
                            {t("dailyReport.missedReportingSupervisor")}
                          </Typography>
                        ) : null}

                        {showSupervisorMessage && !hasUnassigned ? (
                          <Typography
                            variant="body2"
                            style={{
                              color: theme.palette.customColors.red.main,
                            }}
                          >
                            {t("dailyReport.fillUserMissingActivitySupervisor")}
                          </Typography>
                        ) : null}
                      </Box>
                    </Box>
                  ) : null}
                </FlexColumn>
                <FormControlLabel
                  control={
                    <Checkbox
                      inputProps={lunchProps}
                      key={fields.lunch.key}
                      name={fields.lunch.name}
                      defaultChecked={!!fields.lunch.initialValue}
                    />
                  }
                  label={t("dailyReport.lunchTime")}
                  sx={{
                    ml: "1px",
                    width: "fit-content",
                    alignSelf: "flex-end",
                  }}
                />
                <Typography variant="body1" sx={{ marginTop: "20px" }}>
                  {t("dailyReport.workingTime")}
                </Typography>
                <DailyActivityForm
                  projects={projects ?? []}
                  formId={form.id}
                  isLoading={isLoading}
                />
              </FormProvider>
            </Form>
            {action === ActivityAction.Update && lastReportedLocation && (
              <Flex alignItems={"center"} sx={{ marginTop: "20px" }}>
                <Typography variant="body1">
                  {t("dailyReport.lastReportedLocation")}:
                </Typography>
                {lastReportedLocation && (
                  <Flex alignItems={"center"}>
                    <Tooltip
                      sx={{ height: "100%", width: "unset" }}
                      title={
                        lastReportedLocation == ActivityWorkLocation.Home
                          ? t("dailyReport.fromHome")
                          : t("dailyReport.inOffice")
                      }
                    >
                      <Icon>
                        {lastReportedLocation == ActivityWorkLocation.Home ? (
                          <HomeOutlined style={locationIconStyles} />
                        ) : (
                          <SkinOutlined style={locationIconStyles} />
                        )}
                      </Icon>
                    </Tooltip>
                  </Flex>
                )}
              </Flex>
            )}
          </Box>
        </MainCard>
      </FlexColumn>
    </Card>
  );
}
