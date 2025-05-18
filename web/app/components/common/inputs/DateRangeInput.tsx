import { Button, InputLabel, Typography, useTheme } from "@mui/material";
import { Flex, FlexColumn, FlexProps } from "~/components/common";
import { ReactNode, useEffect, useState } from "react";
import "react-dates/initialize";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import moment, { Moment } from "moment";
import { useSearchParams } from "@remix-run/react";
import { useTablet } from "~/hooks";
import { SearchParam } from "~/types";
import { isValidMoment } from "~/util";
import { t } from "i18next";

interface DateRangeInputProps {
  label?: ReactNode;
  required?: boolean;
  containerProps?: FlexProps;
  errorMessage?: ReactNode;
  defaultStartDate?: Moment;
  defaultEndDate?: Moment;
}

interface DateRange {
  startDate: Moment | null;
  endDate: Moment | null;
}

export const DateRangeInput = ({
  label,
  containerProps,
  errorMessage,
  required,
  defaultStartDate,
  defaultEndDate,
}: DateRangeInputProps) => {
  const theme = useTheme();
  const isTablet = useTablet();

  const [searchParams, setSearchParams] = useSearchParams();
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const [dates, setDates] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const updateDate = () => {
      setDates({
        startDate: isValidMoment(searchParams.get(SearchParam.StartDate))
          ? moment(searchParams.get(SearchParam.StartDate))
          : defaultStartDate
          ? defaultStartDate
          : null,
        endDate: isValidMoment(searchParams.get(SearchParam.EndDate))
          ? moment(searchParams.get(SearchParam.EndDate))
          : (defaultEndDate as Moment | null),
      });
    };

    updateDate();
  }, [defaultStartDate, defaultEndDate, searchParams]);

  const onDateChange = ({
    startDate,
    endDate,
    updateManually = true,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
    updateManually?: boolean;
  }) => {
    updateManually && setDates({ startDate, endDate });
    if (startDate && isValidMoment(endDate)) {
      const params = new URLSearchParams(searchParams);

      params.set("startDate", moment(startDate).format("YYYY-MM-DD"));
      params.set("endDate", moment(endDate).format("YYYY-MM-DD"));
      setSearchParams(params, { replace: true, preventScrollReset: true });
    }
  };

  return (
    <FlexColumn gap="4px" {...containerProps}>
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
      <DateRangePicker
        startDate={dates.startDate}
        startDateId="startDate"
        endDate={dates.endDate}
        endDateId="endDate"
        onDatesChange={onDateChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        displayFormat="DD. MMM, YYYY"
        isOutsideRange={() => false}
        orientation={isTablet ? "vertical" : "horizontal"}
        firstDayOfWeek={1}
        renderCalendarInfo={() => {
          return (
            <div style={{ display: "flex", gap: "8px", padding: "20px" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  onDateChange({
                    startDate: moment().startOf("month"),
                    endDate: moment().endOf("month"),
                    updateManually: false,
                  })
                }
              >
                {t("common.thisMonth")}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  onDateChange({
                    startDate: moment().subtract(1, "month").startOf("month"),
                    endDate: moment().subtract(1, "month").endOf("month"),
                    updateManually: false,
                  })
                }
              >
                {t("common.previousMonth")}
              </Button>
            </div>
          );
        }}
      />
      {errorMessage && (
        <Typography
          sx={{
            color: theme.palette.customColors.red.main,
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </FlexColumn>
  );
};
