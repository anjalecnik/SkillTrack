import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { ActivityFormDialogs as Dialogs } from "~/types";
import {
  PlanAbsenceSubmissionType,
  onCallSubmissionType,
  BusinessTripSubmissionType,
  planAbsenceFormSchema,
  overtimeFormDialogSchema,
  businessTripFormDialogSchema,
  onCallFormDialogSchema,
  expensesFormDialogSchema,
  requestUpdateSchema,
  deleteSchema,
  tripToOfficeFormDialogSchema,
  OvertimeSubmissionType,
} from "~/schemas";
import {
  areDatesEqual,
  isEndDateGreaterOrEqualToStartDate,
  isStartTimeBeforeEndTime,
  isStartTimeBeforeEndTimeWithDate,
} from "~/util";

export const createRequestsValidation = (formData: FormData) => {
  return parseWithZod(formData, {
    schema: z
      .discriminatedUnion("intent", [
        planAbsenceFormSchema,
        overtimeFormDialogSchema,
        businessTripFormDialogSchema,
        tripToOfficeFormDialogSchema,
        onCallFormDialogSchema,
        expensesFormDialogSchema,
        requestUpdateSchema,
        deleteSchema,
      ])
      .superRefine((data, ctx) => {
        switch (data.intent) {
          case Dialogs.PlanAbsence: {
            const { dateStart, dateEnd, timeStart, timeEnd } =
              data as PlanAbsenceSubmissionType;
            if (
              !isEndDateGreaterOrEqualToStartDate(
                dateStart,
                dateEnd,
                "DD.MM.YYYY"
              )
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "error.endDateBeforeStartDate",
                path: ["dateEnd"],
              });
            }
            if (
              timeStart &&
              timeEnd &&
              !isStartTimeBeforeEndTime(timeStart, timeEnd)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "error.endTimeBeforeStartTime",
                path: ["endTime"],
              });
            }
            break;
          }

          case Dialogs.BusinessTrip:
          case Dialogs.TripToOffice: {
            const { dateStart, dateEnd, departureTime, returnTime } =
              data as BusinessTripSubmissionType;
            if (
              !isStartTimeBeforeEndTimeWithDate(
                dateStart,
                dateEnd,
                departureTime,
                returnTime,
                "DD.MM.YYYY HH:mm"
              )
            )
              if (
                areDatesEqual(dateStart, dateEnd, "DD.MM.YYYY") &&
                departureTime &&
                returnTime &&
                !isStartTimeBeforeEndTime(departureTime, returnTime)
              ) {
                {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "error.endTimeBeforeStartTime",
                    path: ["returnTime"],
                  });
                }
              } else {
                {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "error.endDateBeforeStartDate",
                    path: ["dateEnd"],
                  });
                }
              }
            break;
          }

          case Dialogs.OnCall: {
            const { dateStart, dateEnd, startTime, endTime } =
              data as onCallSubmissionType;
            if (
              !isStartTimeBeforeEndTimeWithDate(
                dateStart,
                dateEnd,
                startTime,
                endTime,
                "DD.MM.YYYY HH:mm"
              )
            )
              if (
                areDatesEqual(dateStart, dateEnd, "DD.MM.YYYY") &&
                startTime &&
                endTime &&
                !isStartTimeBeforeEndTime(startTime, endTime)
              ) {
                {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "error.endTimeBeforeStartTime",
                    path: ["endTime"],
                  });
                }
              } else {
                {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "error.endDateBeforeStartDate",
                    path: ["endDate"],
                  });
                }
              }
            break;
          }

          case Dialogs.Overtime: {
            const { startTime, endTime } = data as OvertimeSubmissionType;

            if (!isStartTimeBeforeEndTime(startTime, endTime)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "error.endTimeBeforeStartTime",
                path: ["endTime"],
              });
            }
            break;
          }

          default:
            break;
        }
      }),
  });
};
