import dayjs from "dayjs";

export abstract class TestsDateHelper {
  static getFormattedDate(date: Date = new Date(), format?: string): string {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    switch (format) {
      case "YYYY-MM-DD":
        return `${yyyy}-${mm}-${dd}`;
      case "DDMMYYYY":
        return `${dd}${mm}${yyyy}`;
      case "DD. MMM, YYYY":
        return dayjs(date).format(format);
      default:
        return `${dd}.${mm}.${yyyy}`;
    }
  }

  static getLastWorkingDay(fromDate: Date = new Date()): Date {
    const date = new Date(fromDate);
    const day = date.getDay();

    if (day === 0) {
      date.setDate(date.getDate() - 2);
    } else if (day === 6) {
      date.setDate(date.getDate() - 1);
    } else if (day === 1) {
      date.setDate(date.getDate() - 3);
    } else {
      date.setDate(date.getDate() - 1);
    }

    return date;
  }
}
