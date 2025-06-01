import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import {
  addressFormSchema,
  employmentFormSchema,
  personalSettingsFormSchema,
  projectAssignFormSchema,
  vacationsAssignFormSchema,
  workPositionFormSchema,
  planAbsenceFormSchema,
  businessTripFormDialogSchema,
  requestUpdateSchema,
  deleteSchema,
  PlanAbsenceSubmissionType,
  BusinessTripSubmissionType,
  employeeStatusFormSchema,
} from "~/schemas";
import { ActivityFormDialogs as Dialogs } from "~/types";
import { isEndDateGreaterOrEqualToStartDate } from "~/util";

export const createUserDetailsAndActivityRequestValidation = (
  formData: FormData
) => {
  return parseWithZod(formData, {
    schema: z
      .discriminatedUnion("intent", [
        personalSettingsFormSchema,
        workPositionFormSchema,
        employmentFormSchema,
        projectAssignFormSchema,
        vacationsAssignFormSchema,
        addressFormSchema,
        planAbsenceFormSchema,
        businessTripFormDialogSchema,
        requestUpdateSchema,
        deleteSchema,
        employeeStatusFormSchema,
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
