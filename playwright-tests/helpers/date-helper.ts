import dayjs from "dayjs";
import { HolidayEntity } from "apps/api/src/libs/db/entities/holiday.entity";
import { query } from "playwright-tests/global/db-utils";
import { WORKSPACE_ADDRESS } from "playwright-tests/mocks/workspace.mocks";

export abstract class TestsDateHelper {
  static formatDateDDMMYYYY(date: Date): string {
    return dayjs(date).format("DD.MM.YYYY");
  }

  static formatIso8601DayString(date: Date): string {
    return dayjs(date).format("YYYY-MM-DD");
  }

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

  static async getNthLastWorkingDate(
    nDaysBefore: number = 0,
    skipFirst = false
  ): Promise<Date> {
    const currentDate = new Date();
    const date = new Date(currentDate);
    date.setDate(date.getDate() - nDaysBefore);

    const dateStart = new Date(date.getFullYear(), date.getMonth(), 1); // First day of current month

    const holidays = await query<HolidayEntity>(
      `SELECT * FROM "holiday"
       WHERE "countryCode" = $1
       AND "date" BETWEEN $2 AND $3`,
      [WORKSPACE_ADDRESS.countryCode, dateStart, date]
    );

    const holidaySet = new Set(
      holidays.rows.map((h) => new Date(h.date).toDateString())
    );

    let foundFirst = false;

    // Loop backwards until it's a weekday (Mon–Fri)
    while (true) {
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isHoliday = holidaySet.has(date.toDateString());

      if (!isWeekend && !isHoliday) {
        if (!skipFirst || foundFirst) {
          return new Date(date);
        }
        foundFirst = true;
      }

      date.setDate(date.getDate() - 1);
    }
  }

  static isDateSameOrAfterDate(dateAfter: Date, date?: Date): boolean {
    if (!date) return true;
    return dayjs(dateAfter).isAfter(date) || dayjs(dateAfter).isSame(date);
  }

  static getNext7DaysRange(): { dateStart: string; dateEnd: string } {
    const today = new Date();
    const sevenDayInTheFuture = new Date();
    sevenDayInTheFuture.setDate(today.getDate() + 7);

    return {
      dateStart: this.formatDate(today),
      dateEnd: this.formatDate(sevenDayInTheFuture),
    };
  }

  static formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }
}
