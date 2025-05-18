import { Box, InputLabel, Typography, useTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateValidationError,
  DateView,
  PickersDay,
  PickersDayProps,
  PickersLayoutProps,
  PickerValidDate,
  type DatePickerProps,
} from "@mui/x-date-pickers";
import {
  usePickerLayout,
  PickersLayoutRoot,
  pickersLayoutClasses,
  PickersLayoutContentWrapper,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Flex, FlexColumn, FlexProps } from "~/components/common";
import { ReactNode, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FieldName, useField, useInputControl } from "@conform-to/react";
import { t } from "i18next";
import { IActivityByIdResponse } from "~/types";
import { isDateSameOrAfterDate } from "~/util";

export interface DateInputProps extends DatePickerProps<Dayjs> {
  label?: ReactNode;
  required?: boolean;
  containerProps?: FlexProps;
  name: FieldName<string>;
  markedDays?: IActivityByIdResponse[] | null;
  errorMessage?: ReactNode;
  dataTestId?: string;
  limitToMinDate?: boolean;
  onChange?: (date: Dayjs | null) => void;
}

export const DateInput = ({
  label,
  containerProps,
  name,
  required,
  format,
  onChange,
  onError,
  value,
  minDate,
  maxDate,
  dataTestId,
  markedDays,
  limitToMinDate = true,
  ...rest
}: DateInputProps) => {
  const theme = useTheme();
  const [meta] = useField(name);
  const control = useInputControl(meta);
  const [error, setError] = useState<DateValidationError | null>(null);

  const errorText = useMemo(() => {
    switch (error) {
      case "maxDate":
        return t("error.maximalAllowedDateIs", {
          date: maxDate ? maxDate.format(format) : undefined,
        });
      case "minDate":
        return t("error.minimalAllowedDateIs", {
          date: minDate ? minDate.format(format) : undefined,
        });
      case "invalidDate":
        return t("error.invalidDate");
      case null:
        return t(meta.errors?.[0] ?? "");
    }
  }, [error, format, maxDate, minDate, meta]);

  const getActions = (wrapperVariant: string) => {
    const actions = ["cancel"];
    if (!required) {
      actions.push("clear");
    }

    if (wrapperVariant === "mobile") {
      actions.push("accept");
    }

    return actions;
  };

  const DateStatusLegend = () => {
    return (
      <Box sx={{ marginX: "24px" }}>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: theme.palette.customColors.orange.main,
              mr: 1,
            }}
          />
          <Typography variant="body2">
            {t("dailyReport.missingReport")}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: theme.palette.customColors.red.main,
              mr: 1,
            }}
          />
          <Typography variant="body2">
            {t("dailyReport.overdueReport")}
          </Typography>
        </Box>
      </Box>
    );
  };

  function DailyUnassignedDay(
    props: PickersDayProps<PickerValidDate> & { highlightedDays?: number[] }
  ) {
    const { day, outsideCurrentMonth, today, selected, ...other } = props;

    const isMarked = markedDays?.some(({ date }) =>
      dayjs(date).isSame(day, "day")
    );

    const markedColor =
      isMarked &&
      !outsideCurrentMonth &&
      !isDateSameOrAfterDate(day.toDate(), minDate?.toDate())
        ? theme.palette.customColors.red.main
        : isMarked && !outsideCurrentMonth && !selected && !today
          ? theme.palette.customColors.orange.main
          : "inherit";

    return (
      <PickersDay
        {...other}
        key={props.day.toString()}
        outsideCurrentMonth={outsideCurrentMonth}
        today={today}
        day={day}
        sx={{
          color:
            markedColor === theme.palette.customColors.red.main
              ? "white !important"
              : "inherit",
          backgroundImage:
            markedColor !== "inherit"
              ? `radial-gradient(circle, ${markedColor} 12px, transparent 6px)`
              : "none",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          ...(markedColor !== "inherit" && {
            "&:hover, &:focus": {
              backgroundImage: `radial-gradient(circle, ${markedColor} 12px, transparent 6px)`,
            },
          }),
        }}
      />
    );
  }

  function CustomDatePickerLayout(
    props: PickersLayoutProps<Dayjs | null, Dayjs, DateView>
  ) {
    const { toolbar, tabs, content, actionBar } = usePickerLayout(props);
    const currentMonth = props.value;

    const hasMarkedDaysThisMonth = markedDays?.some(({ date }) =>
      dayjs(date).isSame(currentMonth, "month")
    );

    return (
      <PickersLayoutRoot
        className={pickersLayoutClasses.root}
        ownerState={props}
      >
        {toolbar}
        {actionBar}
        <PickersLayoutContentWrapper
          className={pickersLayoutClasses.contentWrapper}
        >
          {tabs}
          {content}
          {hasMarkedDaysThisMonth && <DateStatusLegend />}
        </PickersLayoutContentWrapper>
      </PickersLayoutRoot>
    );
  }

  return (
    <>
      <FlexColumn gap="8px" {...containerProps}>
        {label && (
          <Flex gap="4px">
            {required && (
              <Typography
                sx={{
                  color: theme.palette.customColors.red.main,
                }}
              >
                *
              </Typography>
            )}
            <InputLabel>{label}</InputLabel>
          </Flex>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            shouldDisableDate={(date) => {
              const isBeforeMin =
                limitToMinDate && minDate
                  ? dayjs(date).isBefore(minDate, "day")
                  : false;
              const isAfterMax = maxDate
                ? dayjs(date).isAfter(maxDate, "day")
                : false;
              return isBeforeMin || isAfterMax;
            }}
            {...rest}
            format={format}
            value={dayjs(value).isValid() ? value : null}
            onAccept={(date: Dayjs | null) => {
              control.blur();
              if (onChange) onChange(date);
            }}
            onChange={(date: Dayjs | null) => {
              if (onChange) onChange(date);
              control.change(date?.format(format) || undefined);
            }}
            onError={(newError: DateValidationError, value: Dayjs | null) => {
              setError(newError);
              onError && onError(newError, value);
            }}
            onClose={() => {
              control.blur();
            }}
            closeOnSelect
            slotProps={{
              textField: {
                inputProps: {
                  "data-testid": dataTestId,
                },
              },
              actionBar: ({ wrapperVariant }: { wrapperVariant: string }) => ({
                actions: getActions(wrapperVariant),
              }),
            }}
            slots={{ day: DailyUnassignedDay, layout: CustomDatePickerLayout }}
          />
        </LocalizationProvider>
        {
          <Typography
            sx={{
              color: theme.palette.customColors.red.main,
            }}
          >
            {errorText}
          </Typography>
        }
      </FlexColumn>
    </>
  );
};
