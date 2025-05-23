import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { ActivityFormDialogs as Dialogs } from "~/types";
import {
  PlanAbsenceSubmissionType,
  BusinessTripSubmissionType,
  planAbsenceFormSchema,
  businessTripFormDialogSchema,
  requestUpdateSchema,
  deleteSchema,
} from "~/schemas";
import { isEndDateGreaterOrEqualToStartDate } from "~/util";

export const createRequestsValidation = (formData: FormData) => {
  return parseWithZod(formData, {
    schema: z
      .discriminatedUnion("intent", [
        planAbsenceFormSchema,
        businessTripFormDialogSchema,
        requestUpdateSchema,
        deleteSchema,
      ])
      .superRefine((data, ctx) => {
        switch (data.intent) {
          case Dialogs.PlanAbsence: {
            const { dateStart, dateEnd } = data as PlanAbsenceSubmissionType;
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
            break;
          }

          case Dialogs.BusinessTrip: {
            const { dateStart, dateEnd } = data as BusinessTripSubmissionType;
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
            break;
          }

          default:
            break;
        }
      }),
  });
};
