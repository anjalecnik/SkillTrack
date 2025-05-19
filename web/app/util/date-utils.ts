import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "moment";
import {
  ActivityType,
  DateTimeWithoutTimezone,
  IActivity,
  IActivityResponse,
} from "~/types";

interface IDateItem {
  dateStart?: string | DateTimeWithoutTimezone;
  dateEnd?: string | DateTimeWithoutTimezone;
  date: string;
}

type DateFormat =
  | "MMMM"
  | "YYYY.MM.DD"
  | "YYYY-MM-DD"
  | "YYYY-MM-DD HH:mm:ss"
  | "MM-DD"
  | "DD.MM.YYYY"
  | "DD. MMMM"
  | "DD. MMM, YYYY"
  | "dddd, DD. MMM, YYYY"
  | "ddd, DD. MMM. YYYY"
  | "ddd, DD. MMM, YYYY"
  | "ddd, DD. MM."
  | "YYYY/MM/DD"
  | "DD/MM/YYYY"
  | "DD.MM.YYYY HH:mm"
  | "HH:mm"
  | "H:mm";

export function isStartTimeBeforeEndTimeWithDate(
  startDate: string,
  endDate: string,
  departureTime: string,
  returnTime: string,
  dateFormat: DateFormat
): boolean {
  const startTime = dayjs(`${startDate} ${departureTime}`, dateFormat);
  const endTime = dayjs(`${endDate} ${returnTime}`, dateFormat);

  return startTime.isBefore(endTime);
}

export function isStartTimeBeforeEndTime(
  fromTimeStart: string,
  toTimeEnd: string,
  dateFormat: DateFormat = "HH:mm"
): boolean {
  const startTime = dayjs(fromTimeStart, dateFormat);
  const endTime = dayjs(toTimeEnd, dateFormat);

  return startTime.isBefore(endTime);
}

export function isEndDateGreaterOrEqualToStartDate(
  startDate: string,
  endDate: string,
  dateFormat: DateFormat
): boolean {
  const startTime = dayjs(startDate, dateFormat).toDate();
  const endTime = dayjs(endDate, dateFormat).toDate();

  return endTime >= startTime;
}

export function isEndDateGreaterToStartDate(
  startDate: string,
  endDate: string,
  dateFormat: DateFormat
): boolean {
  const startTime = dayjs(startDate, dateFormat).toDate();
  const endTime = dayjs(endDate, dateFormat).toDate();

  return endTime > startTime;
}

export function areDatesEqual(
  date1: string,
  date2: string,
  dateFormat: DateFormat
): boolean {
  const startTime = dayjs(date1, dateFormat).toDate();
  const endTime = dayjs(date2, dateFormat).toDate();

  return startTime.getTime() === endTime.getTime();
}

export function formatDateWithStartAndEnd(
  item: IDateItem,
  format: DateFormat
): string {
  const { dateStart, dateEnd, date } = item;
  if (dateStart && dateEnd) {
    if (typeof dateStart === "string" && typeof dateEnd === "string") {
      if (dayjs(dateStart).format(format) === dayjs(dateEnd).format(format)) {
        return dayjs(dateStart).format(format);
      } else {
        return `${dayjs(dateStart).format(format)} - ${dayjs(dateEnd).format(
          format
        )}`;
      }
    } else if (typeof dateStart === "object" && typeof dateEnd === "object") {
      if (dateStart.date === dateEnd.date) {
        return dayjs(dateStart.date).format(format);
      } else {
        return `${dayjs(dateStart.date).format(format)} - ${dayjs(
          dateEnd.date
        ).format(format)}`;
      }
    }
  }
  return dayjs(date).format(format);
}

export function formatDate<T extends string | Date | undefined | Dayjs>(
  date: T,
  inputFormat?: DateFormat,
  outputFormat: DateFormat = "YYYY-MM-DD"
): T extends undefined ? undefined : string {
  if (!dayjs(date, inputFormat).isValid() || !date) {
    return undefined as T extends undefined ? undefined : string;
  }

  return dayjs(date, inputFormat).format(outputFormat) as T extends undefined
    ? undefined
    : string;
}

export function formatDateWithTimeWithoutTimezone(
  item: string | DateTimeWithoutTimezone | undefined,
  dateFormat: DateFormat,
  dateFormatWithTime?: DateFormat
): string | undefined {
  if (!item) {
    return;
  }

  if (typeof item === "string") {
    const format = dateFormatWithTime || dateFormat;
    return dayjs(item).isValid() ? dayjs(item).format(format) : undefined;
  }

  const { date, time } = item;
  const dateWithTime = `${date} ${time}`;

  return dayjs(dateWithTime).isValid()
    ? dayjs(dateWithTime).format(dateFormatWithTime)
    : undefined;
}

export function correctActivityDates(
  activities: IActivity[] | IActivityResponse[]
) {
  return activities.map((activity) => {
    if (
      activity.dateStart &&
      activity.dateEnd &&
      (activity.activityType === ActivityType.BusinessTrip ||
        activity.activityType === ActivityType.OnCall)
    ) {
      return {
        ...activity,
        dateStart:
          typeof activity.dateStart !== "string"
            ? activity.dateStart.date + " " + activity.dateStart.time
            : activity.dateStart,
        dateEnd:
          typeof activity.dateEnd !== "string"
            ? activity.dateEnd.date + " " + activity.dateEnd.time
            : activity.dateEnd,
      };
    }
    return {
      ...activity,
    };
  });
}

export function isWeekend(date: string) {
  const dayOfWeek = new Date(date).getDay();
  return dayOfWeek === 6 || dayOfWeek === 0;
}

export function isValidMoment(value: Moment | string | null) {
  return moment(value).isValid();
}

export function toDayjsInputString(
  value: DateTimeWithoutTimezone | string | undefined
): string | undefined {
  if (!value) return;

  if (typeof value === "string") {
    return dayjs(value).isValid() ? value : undefined;
  }

  const { date, time } = value;
  return time ? `${date}T${time}` : date;
}

export function isDateSameOrAfterDate(dateAfter: Date, date?: Date): boolean {
  if (!date) return true;
  return dayjs(dateAfter).isAfter(date) || dayjs(dateAfter).isSame(date);
}
